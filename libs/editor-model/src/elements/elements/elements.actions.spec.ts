import { Layout } from '../layout/layout.types';
import { builderContextToSnapshot, createBuilderContext } from '../../builder';
import { BasicCase } from '../../_tests';
import { removeElementById } from './elements.actions';

const { Template, ImageId, SimpleLayoutOfThree } = BasicCase;

const createContext = () => createBuilderContext(Template);
const elementsCount = Object.keys(Template.elements).length;
describe('elements.actions', () => {
  it('removeElementById should remove element', () => {
    const context = createContext();
    expect(builderContextToSnapshot(context).elements[ImageId]).toBeDefined();

    expect(removeElementById(context)(ImageId)).toBe(true);

    expect(builderContextToSnapshot(context).elements[ImageId]).toBeUndefined();
  });

  it('removeElementById should remove layout and all children', () => {
    const context = createContext();
    const { elements: beforeEl } = builderContextToSnapshot(context);
    expect(beforeEl[SimpleLayoutOfThree]).toBeDefined();

    expect(removeElementById(context)(SimpleLayoutOfThree)).toBe(true);

    const { elements } = builderContextToSnapshot(context);

    expect(elements[SimpleLayoutOfThree]).toBeUndefined();
    expect(Object.keys(elements).length).toBe(elementsCount - 3);
    (Template.elements[SimpleLayoutOfThree] as Layout).params.columns
      .map((col) => col.children)
      .flat()
      .forEach((id) => expect(elements[id]).toBeUndefined());
  });
});
