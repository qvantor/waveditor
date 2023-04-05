import { useEffect, useMemo, useState } from 'react';
import { EDITOR_ID } from '@waveditors/layout-editor';
import { fromEvent } from 'rxjs';

export const useEditorDocument = () => {
  const [state, setState] = useState<Document | null>(null);
  useEffect(() => {
    const iframe = document.getElementById(EDITOR_ID);
    if (
      !iframe ||
      !(iframe instanceof HTMLIFrameElement) ||
      !iframe.contentDocument
    )
      return;
    setState(iframe.contentDocument);
  }, []);
  return state;
};

export const useEditorKeyboardEvents = () => {
  const document = useEditorDocument();

  return useMemo(
    () => (document ? fromEvent<KeyboardEvent>(document, 'keydown') : null),
    [document]
  );
};
