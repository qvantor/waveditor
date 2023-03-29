import React from 'react';
import { Button } from 'antd';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
} from 'react-icons/ai';
import { BubbleMenu, Editor } from '@tiptap/react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';

interface Props {
  editor: Editor;
}

const BubbleMenuInternal = styled(BubbleMenu)`
  display: flex;
  gap: 8px;
  background: ${tokens.color.surface.quaternary};
  border-radius: ${tokens.borderRadius.m};
  border: 1px solid ${tokens.color.border.primary};
  padding: 5px 8px;
`;

const Group = styled.div`
  display: flex;
  gap: 2px;
`;

const BubbleButton = styled(Button)`
  line-height: 30px;

  & > svg {
    font-size: 18px;
  }
`;

export const EditorBubbleMenu = ({ editor }: Props) => {
  return (
    <BubbleMenuInternal editor={editor}>
      <Group>
        <BubbleButton
          size='small'
          type='primary'
          ghost={!editor.isActive('bold')}
          icon={<AiOutlineBold />}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <BubbleButton
          size='small'
          type='primary'
          ghost={!editor.isActive('italic')}
          icon={<AiOutlineItalic />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <BubbleButton
          size='small'
          type='primary'
          ghost={!editor.isActive('strike')}
          icon={<AiOutlineStrikethrough />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
      </Group>
      <Group>
        <BubbleButton
          size='small'
          type='primary'
          ghost={!editor.isActive('bulletList')}
          icon={<AiOutlineUnorderedList />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <BubbleButton
          size='small'
          type='primary'
          ghost={!editor.isActive('orderedList')}
          icon={<AiOutlineOrderedList />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </Group>
    </BubbleMenuInternal>
  );
};
