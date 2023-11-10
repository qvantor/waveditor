import {
  reduceTipTapContent,
  isTipTapVariable,
  TipTapVariable,
} from '@waveditors/utils';
import {
  BehaviorSubject,
  map,
  filter,
  switchMap,
  skip,
  distinctUntilChanged,
} from 'rxjs';
import { JSONContent } from '@tiptap/core';
import { deepEqual } from 'fast-equals';
import { isNonEmpty, filter as arrayFilter } from 'fp-ts/Array';
import { ElementCommon, getElementLinkUrl, Text } from '../../elements';
import { Variable, Variables, VariablesStore } from '../../variables';

const mapParentsContent = (
  content: JSONContent,
  mapper: (item: JSONContent[]) => JSONContent[]
): JSONContent => {
  if (!content.content) return content;
  return {
    ...content,
    content: mapper(content.content).map((value) =>
      mapParentsContent(value, mapper)
    ),
  };
};
const applyVariableToTipTapVariable = (
  variable: Variable,
  tipTapVar: TipTapVariable
): TipTapVariable => {
  if (variable.label === tipTapVar.attrs.label) return tipTapVar;
  return {
    ...tipTapVar,
    attrs: {
      ...tipTapVar.attrs,
      label: variable.label,
    },
  };
};

const applyVariablesToJSONContent = (
  variables: Variables,
  content: JSONContent
) =>
  mapParentsContent(content, (items) =>
    items.reduce<JSONContent[]>((sum, item) => {
      if (!isTipTapVariable(item)) return [...sum, item];
      const variable = variables.find(
        (variable) => variable.id === item.attrs.id
      );

      // no variables mean that var was removed
      if (!variable) return sum;
      return [...sum, applyVariableToTipTapVariable(variable, item)];
    }, [])
  );

const applyVariablesToCommonElement = (
  variables: Variables,
  element: ElementCommon
): ElementCommon => {
  if (!element.link?.url || typeof element.link.url === 'string')
    return element;
  return {
    ...element,
    link: {
      ...element.link,
      url: applyVariablesToJSONContent(variables, element.link.url),
    },
  };
};

const extractUniqueVarIdsFromJSONContent = (content: JSONContent) =>
  Array.from(
    reduceTipTapContent<Set<string>>(
      content,
      (sum, item) => {
        if (!isTipTapVariable(item)) return sum;
        sum.add(item.attrs.id);
        return sum;
      },
      new Set<string>()
    )
  );

const extractVariablesFromCommonElement = (
  element: ElementCommon
): string[] => {
  const url = getElementLinkUrl(element);
  if (!url || typeof url === 'string') return [];
  return extractUniqueVarIdsFromJSONContent(url);
};

const extractVariablesFromText = (text: Text) =>
  extractUniqueVarIdsFromJSONContent(text.params.content);

const extractVariablesByType = (element: ElementCommon) => {
  switch (element.type) {
    case 'text':
      return extractVariablesFromText(element as Text);
    case 'image':
    case 'layout':
      return [];
  }
};

const extractVariablesFromElement = (element: ElementCommon) => [
  ...extractVariablesFromCommonElement(element),
  ...extractVariablesByType(element),
];

export const variableElementRelationEffect =
  (variables: VariablesStore) => () => {
    return {
      subscriptions: ({ bs }: { bs: BehaviorSubject<ElementCommon> }) => [
        bs
          .pipe(
            map(extractVariablesFromElement), // select all used variables references from element
            filter((val) => isNonEmpty(val)),
            switchMap(
              (
                varIds: string[] // subscribe on used variables changes
              ) =>
                variables.bs.pipe(
                  map(arrayFilter((variable) => varIds.includes(variable.id))),
                  distinctUntilChanged(deepEqual),
                  skip(1)
                )
            )
          )
          .subscribe((variables) => {
            console.log(
              bs.getValue().name,
              variables,
              applyVariablesToCommonElement(variables, bs.getValue())
            );
          }),
      ],
    };
  };
