import { AiOutlineDelete } from 'react-icons/ai';
import { Collapse, Segmented } from 'antd';
import {
  isVariableLabelExist,
  useBuilderContext,
  Variable,
  VariablesTypes,
} from '@waveditors/editor-model';
import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { useCallback } from 'react';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import {
  maxLength,
  nameValidation,
  optional,
  required,
  validate,
} from '../../../../common/services';
import { RowContainer, SimpleEditorRow } from '../../common/components';
import {
  CollapseStyled,
  IconButton,
  Input,
} from '../../../../common/components';

const VarHeaderName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin: -5px;
  flex-shrink: 0;

  span {
    color: ${tokens.color.text.secondary};
  }
`;

const HeaderDeleteIcon = styled(IconButton)`
  &.ant-btn.ant-btn-sm.ant-btn-icon-only {
    width: 0;
  }
`;

const VariableHeader = styled.div`
  justify-content: space-between;
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 5px;

  ${font({ size: 'smallest' })}
`;

const PanelInternal = styled(Collapse.Panel)`
  .ant-collapse-header {
    background-color: ${tokens.color.surface.secondary};
  }

  &:hover ${HeaderDeleteIcon}.ant-btn.ant-btn-sm.ant-btn-icon-only {
    width: 24px;
  }
`;

export const VariablesList = () => {
  const {
    model: { variables },
  } = useBuilderContext();
  const variablesList = useBehaviorSubject(variables.bs);
  const { setVariable, removeVariable } = variables.actions;
  const setVariableInternal =
    <K extends keyof Variable>(index: number, key: K) =>
    (value?: Variable[K]) => {
      if (value) setVariable({ index, variable: { [key]: value } });
    };
  const removeVarById = useCallback(
    (id: string) => variablesList.filter((variable) => variable.id !== id),
    [variablesList]
  );
  const uniqName = useCallback(
    (id: string) =>
      optional((value: string) => {
        if (isVariableLabelExist(removeVarById(id))(value))
          return `Variable with a name ${value} already exists`;
      }),
    [removeVarById]
  );
  return (
    <CollapseStyled name='variables'>
      {variablesList.map((variable, index) => (
        <PanelInternal
          key={variable.id}
          header={
            <VariableHeader>
              <VarHeaderName>{variable.label}</VarHeaderName>
              <HeaderRight>
                <span>{variable.type}</span>
                <HeaderDeleteIcon
                  size='small'
                  type='text'
                  icon={<AiOutlineDelete />}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVariable(variable.id);
                  }}
                />
              </HeaderRight>
            </VariableHeader>
          }
        >
          <RowContainer>
            <SimpleEditorRow>
              <div>Label</div>
              <Input
                value={variable.label}
                onChange={setVariableInternal(index, 'label')}
                validate={validate(
                  required,
                  maxLength(16),
                  nameValidation,
                  uniqName(variable.id)
                )}
              />
            </SimpleEditorRow>
            <SimpleEditorRow>
              <div>Type</div>
              <Segmented
                value={variable.type}
                size='small'
                options={['string', 'number'] as VariablesTypes[]}
                onChange={(value) =>
                  setVariableInternal(index, 'type')(value as VariablesTypes)
                }
                block
              />
            </SimpleEditorRow>
            <SimpleEditorRow>
              <div>Default</div>
              <Input
                value={variable.defaultValue}
                onChange={setVariableInternal(index, 'defaultValue')}
              />
            </SimpleEditorRow>
          </RowContainer>
        </PanelInternal>
      ))}
    </CollapseStyled>
  );
};
