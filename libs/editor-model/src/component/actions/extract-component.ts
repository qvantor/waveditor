import { mapJSONContent } from '@waveditors/utils';
import { ElementStore, isLayoutStore, getElementById } from '../../elements';
import { EditorSnapshot, BuilderContext } from '../../types';
import { getLayoutChildren } from '../../elements/layout';

const extractElements = (
  rootElement: ElementStore,
  elements: Record<string, ElementStore>
): EditorSnapshot['elements'] => {
  const root = rootElement.getValue();
  const elementsRoot = { [root.id]: root };
  if (!isLayoutStore(rootElement)) return elementsRoot;
  return getLayoutChildren(elements)(rootElement.getValue()).reduce(
    (sum, element) => {
      const elementValue = element.getValue();
      return { ...sum, [elementValue.id]: elementValue };
    },
    elementsRoot
  );
};

const extractUsedVariableIds = (elements: EditorSnapshot['elements']) =>
  Object.keys(
    Object.values(elements).reduce<Record<string, 1>>((sum, element) => {
      // now only text elements could use variables
      if (element.type === 'text') {
        const variables: Record<string, 1> = {};
        mapJSONContent(element.params.content, (element) => {
          if (element.type === 'variable') {
            const varId = element.attrs?.id as string;
            variables[varId] = 1;
          }
          return element;
        });
        return { ...sum, ...variables };
      }
      return sum;
    }, {})
  );

const extractUsedFontIds = (
  elements: EditorSnapshot['elements'],
  relations: EditorSnapshot['relations']
) =>
  Object.values(elements).reduce<string[]>((sum, element) => {
    const relation = relations.elementFont[element.id];
    if (relation && !sum.includes(relation)) return [...sum, relation];
    return sum;
  }, []);

const extractUsedRelations = (
  elements: EditorSnapshot['elements'],
  relations: EditorSnapshot['relations']
): EditorSnapshot['relations'] => ({
  elementFont: Object.keys(relations.elementFont).reduce((sum, elementId) => {
    if (!elements[elementId]) return sum;
    return { ...sum, [elementId]: relations.elementFont[elementId] };
  }, {}),
});

// extract subtree from BuilderContext into new component tree by rootElementId
export const extractComponent =
  ({
    model: {
      elements: elementsStore,
      config,
      variables: variablesStore,
      relations: relationsStore,
    },
  }: BuilderContext) =>
  (rootElementId: string): EditorSnapshot => {
    const elementsValue = elementsStore.getValue();
    const configValue = config.getValue();
    const variablesValue = variablesStore.getValue();
    const relationsValue = relationsStore.getValue();

    const rootElement = getElementById(rootElementId)(
      elementsValue
    ) as ElementStore;

    const elements = extractElements(rootElement, elementsValue);

    const usedVariableIds = extractUsedVariableIds(elements);
    const variables = variablesValue.filter((variable) =>
      usedVariableIds.includes(variable.id)
    );

    const usedFontIds = extractUsedFontIds(elements, relationsValue);
    const fonts = configValue.fonts.filter((font) =>
      usedFontIds.includes(font.id)
    );

    const relations = extractUsedRelations(elements, relationsValue);

    return {
      elements,
      variables,
      relations,
      config: {
        rootElementId,
        viewportWidth: configValue.viewportWidth,
        fonts,
        style: {},
      },
    };
  };
