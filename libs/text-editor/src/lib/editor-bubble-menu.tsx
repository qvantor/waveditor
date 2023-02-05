import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import styled from 'styled-components';

interface Props {
  editor: Editor;
}

const BubbleMenuInternal = styled(BubbleMenu)`
  border: 1px solid red;
  padding: 20px;
  background: yellow;
`;

export const EditorBubbleMenu = ({ editor }: Props) => {
  return (
    <BubbleMenuInternal editor={editor} className='bubble-menu'>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Bullet List
      </button>
    </BubbleMenuInternal>
  );
};
