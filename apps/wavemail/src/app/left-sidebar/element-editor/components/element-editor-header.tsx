import styled, { css } from 'styled-components';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { theme, tokens } from '@waveditors/theme';
import {
  Element,
  ElementStore,
  getElementName,
} from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { BehaviorSubject } from 'rxjs';
import { useCallback, useState } from 'react';
import { IconButton, Input } from '../../../common/components';
import { useRemoveSelected } from '../../../common/actions-hooks';

const EditIcon = styled(AiOutlineEdit)`
  position: absolute;
  right: 42px;
  opacity: 0;
  transition: opacity 0.1s linear;
  color: ${tokens.color.text.secondary};
`;

const Root = styled.div<{ isFocused: boolean }>`
  position: relative;
  padding: 5px 8px;
  border-bottom: 1px solid ${theme.color.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  &:hover ${EditIcon} {
    opacity: ${({ isFocused }) => (isFocused ? `0` : `1`)};
  }
`;

const NameInput = styled(Input)<{ $isFocused: boolean }>`
  background: transparent;
  ${({ $isFocused }) =>
    $isFocused
      ? ``
      : css`
          border: none;
          cursor: pointer;

          &:hover {
            background: ${tokens.color.surface.primary};
          }
        `}
`;

interface Props {
  element: ElementStore;
}

export const ElementEditorHeader = ({ element }: Props) => {
  const [focus, setFocus] = useState(false);
  const removeSelected = useRemoveSelected();
  const name = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementName
  );
  const onChange = useCallback(
    (name?: string) => {
      if (!name) return;
      element.actions.setName(name);
    },
    [element]
  );
  return (
    <Root isFocused={focus}>
      <NameInput
        key='test'
        $isFocused={focus}
        value={name}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        showCount={focus}
        maxLength={32}
      />
      <EditIcon />
      <IconButton
        size='small'
        type='text'
        icon={<AiOutlineDelete />}
        onClick={removeSelected}
      />
    </Root>
  );
};
