import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { BubbleMenu as TBubbleMenu } from '@tiptap/react';
import styled from 'styled-components';
import { theme } from '@waveditors/theme';
import { useTextEditorContext } from '../../hooks';
import { Link } from './link';
import { Group, BubbleButton } from './bubble-menu.styled';

const BubbleMenuInternal = styled(TBubbleMenu)`
  display: flex;
  gap: 8px;
  font-family: ${theme.font.family};
`;

export const BubbleMenu = () => {
  const { editor, events } = useTextEditorContext();
  return (
    <BubbleMenuInternal
      tippyOptions={{
        onHide: () => events.next({ type: 'onBubbleMenuHide' }),
      }}
      editor={editor}
    >
      <Group>
        <BubbleButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <AiOutlineBold />
        </BubbleButton>
        <BubbleButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <AiOutlineItalic />
        </BubbleButton>
        <BubbleButton
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <AiOutlineStrikethrough />
        </BubbleButton>
        <BubbleButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <AiOutlineUnderline />
        </BubbleButton>
      </Group>
      <Group>
        <BubbleButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <AiOutlineUnorderedList />
        </BubbleButton>
        <BubbleButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <AiOutlineOrderedList />
        </BubbleButton>
      </Group>
      <Link />
    </BubbleMenuInternal>
  );
};
