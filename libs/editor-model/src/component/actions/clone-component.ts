import { generateId } from '@waveditors/utils';
import {
  column,
  columnChildren,
  columnTraversal,
} from '../../elements/layout/layout.lens';
import { EditorSnapshot } from '../../types';

// create idTable hashtable with new -> old ids
const genIdTable = (elements: EditorSnapshot['elements']) =>
  Object.values(elements).reduce<Record<string, string>>((table, item) => {
    const newId = generateId();
    return { ...table, [item.id]: newId };
  }, {});

const applyIdTableToElements = (
  elements: EditorSnapshot['elements'],
  idTable: Record<string, string>
) =>
  Object.values(elements).reduce<EditorSnapshot['elements']>((sum, element) => {
    const newElementId = idTable[element.id];
    const newElement = { ...element, id: newElementId };
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
  idTable: Record<string, string>
) => ({
  ...config,
  rootElementId: idTable[config.rootElementId],
});

// function for update all element id's inside components EditorSnapshot
export const cloneComponent = (component: EditorSnapshot): EditorSnapshot => {
  const idTable = genIdTable(component.elements);
  return {
    ...component,
    elements: applyIdTableToElements(component.elements, idTable),
    config: applyIdTableToConfig(component.config, idTable),
  };
};
