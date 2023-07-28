import { AiOutlinePlus } from 'react-icons/ai';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { pipe } from 'fp-ts/function';
import {
  createVariable,
  generateUniqVariableLabel,
  useBuilderContext,
} from '@waveditors/editor-model';
import { IconButton } from '../../../common/components';
import { SidebarHeader } from '../common/components';
import { VariablesList } from './components';

export const Variables = () => {
  const {
    model: { variables },
  } = useBuilderContext();
  const variablesList = useBehaviorSubject(variables.bs);
  const { addVariable } = variables.actions;
  const onAddClick = () =>
    pipe(variablesList, generateUniqVariableLabel, createVariable, addVariable);
  return (
    <>
      <SidebarHeader>
        <div>Variables</div>
        <IconButton
          onClick={onAddClick}
          type='link'
          size='small'
          icon={<AiOutlinePlus />}
        >
          Add
        </IconButton>
      </SidebarHeader>
      <VariablesList />
    </>
  );
};
