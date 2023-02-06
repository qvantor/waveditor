import { useEffect } from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import { EditorBubbleMenu } from './editor-bubble-menu';

export interface Props {
  onChange: (value: string) => void;
  content: string;
  className?: string;
  editable?: boolean;
}

export function TextEditor({
  onChange,
  content,
  className,
  editable = false,
}: Props) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      ListItem,
      BulletList,
      OrderedList,
      Bold,
      Italic,
      Strike,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editable,
    editorProps: {
      attributes: className ? { class: className } : undefined,
    },
  });
  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);
  if (!editor) return null;

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <FloatingMenu editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered list
        </button>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </>
  );
}

export default TextEditor;
