import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { font, tokens } from '@waveditors/theme';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { pipe } from 'fp-ts/function';
import {
  generateUniqVariableName,
  createVariable,
} from '@waveditors/editor-model';
import { IconButton } from '../../common/components';
import { useMailBuilderContext } from '../../common/hooks';
import { VariablesList } from './components';

const Header = styled.div`
  padding: 5px 0 5px 8px;
  border-bottom: 1px solid ${tokens.color.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderName = styled.div`
  ${font({ weight: 'bold', size: 'small' })}
  color: ${tokens.color.text.secondary}
`;

export const Variables = () => {
  const {
    stores: { variables },
  } = useMailBuilderContext();
  const variablesList = useBehaviorSubject(variables.bs);
  const { addVariable } = variables.actions;
  const onAddClick = () =>
    pipe(variablesList, generateUniqVariableName, createVariable, addVariable);
  return (
    <>
      <Header>
        <HeaderName>Variables</HeaderName>
        <IconButton
          onClick={onAddClick}
          type='link'
          size='small'
          icon={<AiOutlinePlus />}
        >
          Add
        </IconButton>
      </Header>
      <VariablesList />
    </>
  );
};
