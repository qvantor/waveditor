import { mapJSONContent } from '@waveditors/utils';
import { ConfigFont } from '../../config';
import { BasicCase } from '../../_tests';
import { TextWithTwoVariablesAndInterFont } from '../../_tests/template/basic-case';
import {
  cloneComponent,
  applyFontsIdTableToRelations,
  applyVariablesTableToElements,
} from './clone-component';

const { Template, InterFont, MooliFont, NameVariable } = BasicCase;
describe('clone component', () => {
  it('should not affect counts', () => {
    const clone = cloneComponent(Template);
    expect(Object.keys(clone).length).toBe(Object.keys(Template).length);
    expect(Object.keys(clone.relations.elementFont).length).toBe(
      Object.keys(Template.relations.elementFont).length
    );
    expect(clone.variables.length).toBe(Template.variables.length);
    expect(clone.config.fonts.length).toBe(Template.config.fonts.length);
  });
  it('should create new elements ids', () => {
    const clone = cloneComponent(Template);
    Object.keys(Template.elements).forEach((id) =>
      expect(clone.elements[id]).toBeUndefined()
    );
  });
  it('should create new fonts ids', () => {
    const clone = cloneComponent(Template);
    expect(clone.config.fonts).toEqual(
      expect.arrayContaining(
        Template.config.fonts.map(({ id, ...font }) =>
          expect.objectContaining(font)
        )
      )
    );
  });
  it('should create new variables ids', () => {
    const clone = cloneComponent(Template);
    expect(clone.variables).toEqual(
      expect.arrayContaining(
        Template.variables.map(({ id, ...font }) =>
          expect.objectContaining(font)
        )
      )
    );
  });
  it('should keep font-element relations', () => {
    const clone = cloneComponent(Template);
    const mooliFonts = ['text3', 'text6', 'text2'];
    const interFont = 'text7';

    const { id: MooliFontNewId } = clone.config.fonts.find(
      (font) => font.name === MooliFont.name
    ) as ConfigFont;
    const { id: InterFontNewId } = clone.config.fonts.find(
      (font) => font.name === InterFont.name
    ) as ConfigFont;

    const interRelations = Object.entries(clone.elements)
      .filter(([_, element]) => element.name === interFont)
      .map(([id]) => id)
      .reduce((sum, id) => ({ ...sum, [id]: InterFontNewId }), {});

    const mooliRelations = Object.entries(clone.elements)
      .filter(([_, element]) => mooliFonts.includes(element.name as string))
      .map(([id]) => id)
      .reduce((sum, id) => ({ ...sum, [id]: MooliFontNewId }), {});

    expect(clone.relations.elementFont).toEqual({
      ...mooliRelations,
      ...interRelations,
    });
  });
  it('should update all variables in elements', () => {
    const clone = cloneComponent(Template);
    const varIds = clone.variables.map((variable) => variable.id);
    Object.values(clone.elements).forEach((element) => {
      if (element.type !== 'text') return;
      mapJSONContent(element.params.content, (item) => {
        if (item.type !== 'variable') return item;
        expect(varIds).toContain(item.attrs?.id);
        return item;
      });
    });
  });
  it('should update all layouts children', () => {
    const clone = cloneComponent(Template);
    Object.values(clone.elements).forEach((element) => {
      if (element.type !== 'layout') return;
      element.params.columns.forEach((col) => {
        col.children.forEach((childId) =>
          expect(clone.elements[childId]).toBeDefined()
        );
      });
    });
  });

  it('applyFontsIdTableToRelations should work with partial table', () => {
    const clonedRelations = applyFontsIdTableToRelations(Template.relations, {
      [MooliFont.id]: 'test',
    });
    expect(clonedRelations).toMatchSnapshot();
  });
  it('applyVariablesTableToElements should work with partial table', () => {
    const clonedElements = applyVariablesTableToElements(Template.elements, {
      [NameVariable.id]: 'test',
    });
    expect(
      clonedElements[TextWithTwoVariablesAndInterFont].params
    ).toMatchSnapshot();
  });
});
