import { filter, fromEvent, merge } from 'rxjs';
import { useSubscription } from '@waveditors/rxjs-react';
import {
  useMailBuilderContext,
  useEditorKeyboardEvents,
} from '../../common/hooks';
import { useRemoveSelected } from '../../common/actions-hooks';

const HotkeyActions = {
  undo: 'KeyZ',
  redo: 'KeyX',
  remove: 'Backspace',
};

export const Hotkeys = () => {
  const {
    modules: { undoRedo },
  } = useMailBuilderContext();
  const removeSelected = useRemoveSelected();
  const editorKeyboardEvents = useEditorKeyboardEvents();

  useSubscription(() => {
    const keyboardEvents = fromEvent<KeyboardEvent>(document, 'keydown');

    return (
      editorKeyboardEvents
        ? merge(editorKeyboardEvents, keyboardEvents)
        : keyboardEvents
    )
      .pipe(
        filter(
          (e) =>
            Object.values(HotkeyActions).includes(e.code) &&
            (e.metaKey || e.ctrlKey)
        )
      )
      .subscribe((e) => {
        e.preventDefault();
        switch (e.code) {
          case HotkeyActions.undo:
            return undoRedo.undo.next();
          case HotkeyActions.redo:
            return undoRedo.redo.next();
          case HotkeyActions.remove:
            return removeSelected();
        }
      });
  }, [undoRedo, editorKeyboardEvents]);
  return null;
};
