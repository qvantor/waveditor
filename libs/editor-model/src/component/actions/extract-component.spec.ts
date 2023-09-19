import { createBuilderContext } from '../../builder';
import { BasicCase } from '../../_tests';
import { extractComponent } from './extract-component';

const {
  Template,
  MooliFont,
  InterFont,
  AgeVariable,
  NameVariable,
  SimpleLayoutText,
  SimpleLayoutImage,
  ImageId,
  SimpleTextId,
  TextWithMooliFont,
  TextWithNameVariable,
  TextWithNameVariableAndMooliFont,
  TextWithTwoVariablesAndInterFont,
  SimpleLayoutOfThree,
  LayoutWith2FontsAnd2Variables,
} = BasicCase;

const builder = createBuilderContext(Template);
describe('extract component', () => {
  it('single image', () => {
    const component = extractComponent(builder)(ImageId);

    expect(Object.keys(component.elements).length).toBe(1);
    expect(component.elements[ImageId]).toEqual(Template.elements[ImageId]);
    expect(component.relations.elementFont).toEqual({});
    expect(component.variables.length).toBe(0);
    expect(component.config.fonts.length).toBe(0);
    expect(component.config.rootElementId).toBe(ImageId);
  });
  it('simple text', () => {
    const component = extractComponent(builder)(SimpleTextId);

    expect(Object.keys(component.elements).length).toBe(1);
    expect(component.elements[SimpleTextId]).toEqual(
      Template.elements[SimpleTextId]
    );
    expect(component.relations.elementFont).toEqual({});
    expect(component.variables.length).toBe(0);
    expect(component.config.fonts.length).toBe(0);
    expect(component.config.rootElementId).toBe(SimpleTextId);
  });

  it('text with font', () => {
    const component = extractComponent(builder)(TextWithMooliFont);

    expect(component.config.fonts).toEqual([MooliFont]);
    expect(component.variables.length).toBe(0);
    expect(component.relations.elementFont).toEqual({
      [TextWithMooliFont]: MooliFont.id,
    });
  });
  it('text with single variable', () => {
    const component = extractComponent(builder)(TextWithNameVariable);

    expect(component.config.fonts.length).toBe(0);
    expect(component.variables).toEqual([NameVariable]);
  });
  it('text with font and single variable', () => {
    const component = extractComponent(builder)(
      TextWithNameVariableAndMooliFont
    );

    expect(component.config.fonts).toEqual([MooliFont]);
    expect(component.variables).toEqual([NameVariable]);
  });
  it('text with font and couple variables', () => {
    const component = extractComponent(builder)(
      TextWithTwoVariablesAndInterFont
    );

    expect(component.elements[TextWithTwoVariablesAndInterFont]).toEqual(
      Template.elements[TextWithTwoVariablesAndInterFont]
    );
    expect(component.config.fonts).toEqual([InterFont]);
    expect(component.relations.elementFont).toEqual({
      [TextWithTwoVariablesAndInterFont]: InterFont.id,
    });
    expect(component.variables).toEqual([NameVariable, AgeVariable]);
  });
  it('simple layout of 3 elements', () => {
    const component = extractComponent(builder)(SimpleLayoutOfThree);

    expect(component.elements[SimpleLayoutOfThree]).toEqual(
      Template.elements[SimpleLayoutOfThree]
    );
    expect(component.elements[SimpleLayoutImage.id]).toEqual(SimpleLayoutImage);
    expect(component.elements[SimpleLayoutText.id]).toEqual(SimpleLayoutText);
    expect(Object.keys(component.elements).length).toBe(3);
    expect(component.config.rootElementId).toBe(SimpleLayoutOfThree);
    expect(component.config.fonts.length).toBe(0);
    expect(component.variables.length).toBe(0);
    expect(component.relations.elementFont).toEqual({});
  });
  it('layout with 2 font and 2 variables', () => {
    const component = extractComponent(builder)(LayoutWith2FontsAnd2Variables);
    expect(component.elements[LayoutWith2FontsAnd2Variables]).toEqual(
      Template.elements[LayoutWith2FontsAnd2Variables]
    );
    expect(Object.keys(component.elements).length).toBe(6);
    expect(component.config.fonts).toEqual([MooliFont, InterFont]);
    expect(component.variables).toEqual([NameVariable, AgeVariable]);
    expect(component.relations).toMatchSnapshot();
  });
});
