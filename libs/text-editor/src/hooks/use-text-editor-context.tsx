import { createContext, useContext } from 'react';
import { Editor } from '@tiptap/react';
import { Subject } from 'rxjs';

export type TextEditorEvents = { type: 'onBubbleMenuHide' };
type TextEditorContext = {
  editor: Editor;
  events: Subject<TextEditorEvents>;
};

const TextEditorContextValue = createContext<TextEditorContext | null>(null);
export const TextEditorContextProvider = TextEditorContextValue.Provider;

export const useTextEditorContext = () => {
  const context = useContext(TextEditorContextValue);
  if (!context)
    throw new Error(
      'useTextEditorContext used outside of TextEditorContextProvider'
    );
  return context;
};
