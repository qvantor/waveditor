import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { theme, tokens } from '@waveditors/theme';
import {
  Element,
  ElementStore,
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
  const name = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementName
  );
  const type = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementType
  );
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
        icon={<AiOutlineDelete />}
        onClick={removeSelected}
      />
    </Root>
  );
};
