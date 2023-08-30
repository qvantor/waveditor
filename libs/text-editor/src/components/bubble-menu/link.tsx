import { useCallback, useEffect, useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import styled from 'styled-components';
import { theme } from '@waveditors/theme';
import { Input } from '@waveditors/ui-kit';
import { useSubscription } from '@waveditors/rxjs-react';
import { useTextEditorContext } from '../../hooks';
import { Group, BubbleButton } from './bubble-menu.styled';

const PopupRoot = styled.div`
  position: absolute;
  top: 36px;
  padding: 10px;
  background: ${theme.color.surface.secondary};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: ${theme.borderRadius.l};

  input {
    border: 1px solid ${theme.color.border.primary};
    border-radius: ${theme.borderRadius.m};
    padding: 0 7px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    transition: all 0.3s linear;
    width: 200px;

    &:hover,
    &:focus {
      border-color: ${theme.color.surface.accent};
    }
  }
`;

export const Link = () => {
  const { editor, events } = useTextEditorContext();
  const [state, setState] = useState({ open: false, value: '' });
  const toggleMenu = () => {
    editor.commands.focus(); // for close menu after outside click
    setState((prev) => ({ ...prev, open: !prev.open }));
  };

  const onUpdate = useCallback(
    (value?: string) => {
      if (!value) return editor.commands.unsetLink();
      editor.commands.setUnderline();
      editor.commands.setLink({ href: value, target: '_blank' });
    },
    [editor]
  );
  useEffect(() => {
    const onSelectionUpdate = () =>
      setState((prev) => ({
        ...prev,
        value: editor.getAttributes('link').href ?? '',
      }));
    editor.on('selectionUpdate', onSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', onSelectionUpdate);
    };
  }, [editor]);

  useSubscription(() => {
    return events.subscribe(({ type }) => {
      switch (type) {
        case 'onBubbleMenuHide':
          setState((prev) => ({ ...prev, open: false }));
      }
    });
  }, [events]);

  return (
    <Group onClick={(e) => e.stopPropagation()}>
      {state.open && (
        <PopupRoot>
          <Input
            placeholder='Link url'
            value={state.value}
            onChange={onUpdate}
            onBlur={() => editor.commands.focus()}
          />
        </PopupRoot>
      )}
      <BubbleButton active={state.value !== ''} onClick={toggleMenu}>
        <AiOutlineLink />
      </BubbleButton>
    </Group>
  );
};
