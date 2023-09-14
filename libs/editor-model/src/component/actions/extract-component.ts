import { ElementStore, isLayoutStore, getElementById } from '../../elements';
import { EditorSnapshot, BuilderContext } from '../../types';
import { getLayoutChildren } from '../../elements/layout';

const getElements = (
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

// function to collect subtree from BuilderContext into new component tree
export const extractComponent =
  ({ model: { elements, config } }: BuilderContext) =>
  (rootElementId: string): EditorSnapshot => {
    const elementsValue = elements.getValue();
    const configValue = config.getValue();
    const rootElement = getElementById(rootElementId)(
      elementsValue
    ) as ElementStore;
    return {
      elements: getElements(rootElement, elementsValue),
      variables: [],
      config: {
        rootElementId,
        viewportWidth: configValue.viewportWidth,
        fonts: [],
        style: {},
      },
      relations: { elementFont: {} },
    };
  };
