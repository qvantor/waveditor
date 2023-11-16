import { BasicCase } from '../../../_tests';
import {
  SimpleLayoutText,
  TextWithTwoVariablesAndInterFont,
} from '../../../_tests/template/basic-case';
import { Image, Text } from '../../../elements';
import { extractVariablesFromElement } from './extract-variables-from-element';

const { Template, SimpleLayoutImage } = BasicCase;

const TextWithTwoVariablesAndInterFontElement = Template.elements[
  TextWithTwoVariablesAndInterFont
] as Text;

const ElementWithLink = {
  ...SimpleLayoutImage,
  link: {
    url: TextWithTwoVariablesAndInterFontElement.params.content,
    newTab: false,
  },
} as Image;

describe('extract variables', () => {
  it('should return [] if no variables', () => {
    expect(extractVariablesFromElement(SimpleLayoutText)).toEqual([]);
  });
  it('should extract variables from text content', () => {
    expect(
      extractVariablesFromElement(TextWithTwoVariablesAndInterFontElement)
    ).toEqual(['0.7830225981794139', '0.24456524413525726']);
  });
  it('should extract variables from link', () => {
    expect(extractVariablesFromElement(ElementWithLink)).toEqual([
      '0.7830225981794139',
      '0.24456524413525726',
    ]);
  });
});
