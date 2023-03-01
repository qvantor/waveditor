import React from 'react';
import { Button } from 'antd';
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai';
import { BubbleMenu, Editor } from '@tiptap/react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';

interface Props {
  editor: Editor;
}

const BubbleMenuInternal = styled(BubbleMenu)`
  display: flex;
  gap: 5px;
  background: ${tokens.color.surface.quaternary};
  border-radius: ${tokens.borderRadius.m};
  padding: 5px 8px;
`;

export const EditorBubbleMenu = ({ editor }: Props) => {
  return (
    <BubbleMenuInternal editor={editor}>
      <Button
        size='small'
        type='primary'
        ghost={!editor.isActive('bold')}
        icon={<AiOutlineBold />}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <Button
        size='small'
        type='primary'
        ghost={!editor.isActive('italic')}
        icon={<AiOutlineItalic />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      {/*<button onClick={() => editor.chain().focus().toggleBulletList().run()}>*/}
      {/*  Bullet List*/}
      {/*</button>*/}
    </BubbleMenuInternal>
  );
};
