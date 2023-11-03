import { ConfigFont } from '../../config';
import {
  applyFontsIdTableToRelations,
  applyVariablesTableToElements,
} from '../../component';
import { Position, getLayoutElement } from '../../elements';
import { BuilderContext, EditorSnapshot } from '../../types';
import { Variables } from '../../variables';

const isFontIntersects = (compFont: ConfigFont, currFonts: ConfigFont[]) => {
  if (compFont.url && compFont.name)
    return currFonts.find((currFont) => currFont.name === compFont.name);
  return currFonts.find(
    (currFont) => !currFont.name && currFont.fallback === compFont.fallback
  );
};

// if no font found in template, just add component font to template
// if same name/fallback font exist in template, changing all relations in component on fontId from template
const detectFontToAdd = (compFonts: ConfigFont[], currFonts: ConfigFont[]) =>
  compFonts.reduce<[ConfigFont[], Record<string, string>]>(
    ([fontsToAdd, fontsIdTable], compFont) => {
      const intersection = isFontIntersects(compFont, currFonts);

      return intersection
        ? [fontsToAdd, { ...fontsIdTable, [compFont.id]: intersection.id }]
        : [[...fontsToAdd, compFont], fontsIdTable];
    },
    [[], {}]
  );

// if no intersection between variables names, just add new variables from component
// otherwise skip variable from component, and changing variables id in component
const detectVariablesToAdd = (
  compVariables: Variables,
  currVariables: Variables
) =>
  compVariables.reduce<[Variables, Record<string, string>]>(
    ([toAdd, variablesIdTable], compVar) => {
      const intersection = currVariables.find(
        (currVar) => currVar.label === compVar.label
      );
      return intersection
        ? [
            toAdd,
            {
              ...variablesIdTable,
              [compVar.id]: intersection.id,
            },
          ]
        : [[...toAdd, compVar], variablesIdTable];
    },
    [[], {}]
  );
type Params = {
  position: Position | null;
  element: EditorSnapshot;
};
export const mergeComponent =
  ({
    model: { elements, config, variables, relations },
    module: { undoRedo },
  }: BuilderContext) =>
  ({ position, element }: Params) => {
    const internalPosition = position ?? {
      layout: config.getValue().rootElementId,
      column: 0,
      index: 0,
    };

    // detecting intersections between variables in template and component
    const [varsToAdd, variablesIdTable] = detectVariablesToAdd(
      element.variables,
      variables.getValue()
    );
    // detecting intersections between fonts from component and current template
    const [fontsToAdd, fontsIdTable] = detectFontToAdd(
      element.config.fonts,
      config.getValue().fonts
    );
    const component = {
      ...element,
      elements: applyVariablesTableToElements(
        element.elements,
        variablesIdTable
      ),
      relations: applyFontsIdTableToRelations(element.relations, fontsIdTable),
    };
    const parent = getLayoutElement(
      elements.getValue(),
      internalPosition.layout
    );
    if (!parent)
      return console.error(
        `mergeComponent: ${internalPosition.layout} does not exist`
      );

    undoRedo.startBunch();
    fontsToAdd.forEach(config.actions.addFont);
    varsToAdd.forEach(variables.actions.addVariable);
    Object.entries<string>(component.relations.elementFont).forEach(
      ([element, font]) =>
        relations.actions.addElementFontRelation({ element, font })
    );
    Object.values(component.elements).forEach((element) =>
      elements.actions.addElement(element)
    );
    parent.actions.addChild({
      element: component.config.rootElementId,
      position: internalPosition,
    });
    undoRedo.endBunch();
  };
