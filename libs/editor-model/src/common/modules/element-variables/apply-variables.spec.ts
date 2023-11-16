import { BasicCase } from '../../../_tests';
import { applyVariablesToElement } from './apply-variables-to-element';

const { Template, TextWithNameVariable, NameVariable } = BasicCase;

const TextWithNameVariableNode = Template.elements[TextWithNameVariable];

describe('apply variables', () => {
  it('should do nothing, if variables the same', () => {
    expect(
      applyVariablesToElement([NameVariable], TextWithNameVariableNode)
    ).toBeNull();
  });
  it('should change the var name in text content, if name is changed', () => {
    expect(
      applyVariablesToElement(
        [{ ...NameVariable, label: 'Hello world' }],
        TextWithNameVariableNode
      )
    ).toMatchSnapshot();
  });
  it('should remove variable, if variable gone', () => {
    expect(
      applyVariablesToElement([], TextWithNameVariableNode)
    ).toMatchSnapshot();
  });
});
