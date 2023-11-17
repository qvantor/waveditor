import { generateId, mapJSONContent } from '@waveditors/utils';
import { TextContent } from '../../elements';
import {
  column,
  columnChildren,
  columnTraversal,
} from '../../elements/layout/layout.lens';
import { EditorSnapshot } from '../../types';

type IdRemapTable = Record<string, string>;
// create idTable hashtable with new -> old ids
const genArrayWithIdTable = (items: Array<{ id: string }>) =>
  items.reduce<IdRemapTable>(
    (sum, item) => ({ ...sum, [item.id]: generateId() }),
    {}
  );

export const applyVariablesTableToElements = (
  elements: EditorSnapshot['elements'],
  variablesIdTable: IdRemapTable
) =>
  Object.values(elements).reduce<EditorSnapshot['elements']>((sum, element) => {
    // for text update all variables ids
    if (element.type === 'text') {
      return {
        ...sum,
        [element.id]: TextContent.modify((content) =>
          mapJSONContent(content, (item) => {
            if (item.type !== 'variable' || !item.attrs) return item;
            return {
              ...item,
              attrs: {
                ...item.attrs,
                id: variablesIdTable[item.attrs.id] ?? item.attrs.id,
              },
            };
          })
        )(element),
      };
    }
    return { ...sum, [element.id]: element };
  }, {});
const applyIdTableToElements = (
  elements: EditorSnapshot['elements'],
  idTable: IdRemapTable
) =>
  Object.values(elements).reduce<EditorSnapshot['elements']>((sum, element) => {
    const newElementId = idTable[element.id];
    const newElement = { ...element, id: newElementId };
    // for layout update all children ids
    if (newElement.type === 'layout') {
      return {
        ...sum,
        [newElementId]: column
          .composeTraversal(columnTraversal)
          .composeLens(columnChildren)
          .modify((value) => value.map((id) => idTable[id]))(newElement),
      };
    }
    return { ...sum, [newElementId]: newElement };
  }, {});

const applyIdTableToConfig = (
  config: EditorSnapshot['config'],
  idTable: IdRemapTable,
  fontsIdTable: IdRemapTable
) => ({
  ...config,
  fonts: config.fonts.map((font) => ({
    ...font,
    id: fontsIdTable[font.id],
  })),
  rootElementId: idTable[config.rootElementId],
});

const applyIdTableToVariables = (
  variables: EditorSnapshot['variables'],
  variablesIdTable: IdRemapTable
) =>
  variables.map((variable) => ({
    ...variable,
    id: variablesIdTable[variable.id],
  }));

export const applyFontsIdTableToRelations = (
  relation: EditorSnapshot['relations'],
  fontsIdTable: IdRemapTable
) => ({
  elementFont: Object.entries(relation.elementFont).reduce(
    (sum, [element, font]) => ({
      ...sum,
      [element]: fontsIdTable[font] ?? font,
    }),
    {}
  ),
});
const applyIdTableToRelations = (
  relation: EditorSnapshot['relations'],
  idTable: IdRemapTable
): EditorSnapshot['relations'] => ({
  elementFont: Object.entries(relation.elementFont).reduce(
    (sum, [element, font]) => ({
      ...sum,
      [idTable[element]]: font,
    }),
    {}
  ),
});

// function for update all element id's inside components EditorSnapshot
export const cloneComponent = ({
  elements,
  config,
  relations,
  variables,
}: EditorSnapshot): EditorSnapshot => {
  const variablesIdTable = genArrayWithIdTable(variables);
  const idTable = genArrayWithIdTable(Object.values(elements));
  const fontsIdTable = genArrayWithIdTable(config.fonts);
  return {
    elements: applyIdTableToElements(
      applyVariablesTableToElements(elements, variablesIdTable),
      idTable
    ),
    config: applyIdTableToConfig(config, idTable, fontsIdTable),
    variables: applyIdTableToVariables(variables, variablesIdTable),
    relations: applyIdTableToRelations(
      applyFontsIdTableToRelations(relations, fontsIdTable),
      idTable
    ),
  };
};

// duplicate updates elements id's, but keep font and variables id's the same
export const duplicateCloneComponent = ({
  elements,
  config,
  relations,
}: EditorSnapshot): EditorSnapshot => {
  const idTable = genArrayWithIdTable(Object.values(elements));

  return {
    elements: applyIdTableToElements(elements, idTable),
    config: {
      rootElementId: idTable[config.rootElementId],
      style: {},
      fonts: [],
      viewportWidth: 0,
    },
    variables: [],
    relations: applyIdTableToRelations(relations, idTable),
  };
};
