import styled from 'styled-components';
import { AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';
import { theme, tokens } from '@waveditors/theme';
import {
  Element,
  ElementStore,
  extractComponent,
  getElementName,
  getElementType,
  removeSelectedElement,
  useAction,
} from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { BehaviorSubject } from 'rxjs';
import { Input } from '@waveditors/ui-kit';
import { IconButton } from '../../../../../common/components';
import { maxLength, required, validate } from '../../../../../common/services';

const NameInput = styled(Input)`
  input {
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${tokens.color.surface.primary};
    }

    &:focus {
      border: inherit;
      color: inherit;
    }
  }
`;

const Root = styled.div`
  position: relative;
  padding: 5px 8px;
  border-bottom: 1px solid ${theme.color.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

interface Props {
  element: ElementStore;
}

export const ElementEditorHeader = ({ element }: Props) => {
  const removeSelected = useAction(removeSelectedElement);
  const extractComp = useAction(extractComponent);
  const name = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementName
  );
  const type = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementType
  );
  const getComponent = () => {
    // @ts-ignore
    window.__component = extractComp(element.getValue().id);
  };
  return (
    <Root>
      <NameInput
        value={name ?? type}
        onChange={element.actions.setName}
        validate={validate(required, maxLength(16))}
      />
      <IconButton
        size='small'
        type='text'
        icon={<AiOutlineSave />}
        onClick={getComponent}
      />
      <IconButton
        size='small'
        type='text'
        icon={<AiOutlineDelete />}
        onClick={removeSelected}
      />
    </Root>
  );
};
