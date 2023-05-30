import React from 'react';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineUnderline,
} from 'react-icons/ai';
import { BubbleMenu, Editor } from '@tiptap/react';
import styled, { css } from 'styled-components';
import { theme } from '@waveditors/theme';

interface Props {
  editor: Editor;
}

const BubbleMenuInternal = styled(BubbleMenu)`
  display: flex;
  gap: 8px;
`;

const Group = styled.div`
  display: flex;
  gap: 2px;
  background: ${theme.color.surface.primary};
  border-radius: ${theme.borderRadius.l};
  padding: 3px 5px;
`;

const BubbleButton = styled.button<{ active: boolean }>`
  height: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.m};
  cursor: pointer;

  ${({ active }) =>
    !active &&
    css`
      color: ${theme.color.text.accent};
    `}
  & > svg {
    font-size: 16px;
  }

  &:hover {
    background: ${theme.color.surface.primaryHover};
  }
`;

export const EditorBubbleMenu = ({ editor }: Props) => {
  return (
    <BubbleMenuInternal editor={editor}>
      <Group>
        <BubbleButton
          active={!editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <AiOutlineBold />
        </BubbleButton>
        <BubbleButton
          active={!editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <AiOutlineItalic />
        </BubbleButton>
        <BubbleButton
          active={!editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <AiOutlineStrikethrough />
        </BubbleButton>
        <BubbleButton
          active={!editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <AiOutlineUnderline />
        </BubbleButton>
      </Group>
      <Group>
        <BubbleButton
          active={!editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <AiOutlineUnorderedList />
        </BubbleButton>
        <BubbleButton
          active={!editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <AiOutlineOrderedList />
        </BubbleButton>
      </Group>
    </BubbleMenuInternal>
  );
};
