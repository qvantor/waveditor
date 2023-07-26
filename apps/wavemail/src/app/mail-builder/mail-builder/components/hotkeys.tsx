import { filter, fromEvent, merge, map } from 'rxjs';
import { useSubscription } from '@waveditors/rxjs-react';
import {
  CanvasKeyDownEvent,
  removeSelectedElement,
  useAction,
  useBuilderContext,
} from '@waveditors/editor-model';
import { message } from 'antd';

const HotkeyActions = {
  undo: 'KeyZ',
  redo: 'KeyY',
  save: 'KeyS',
  load: 'KeyL',
  remove: 'Backspace',
};

export const Hotkeys = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    module: { undoRedo },
    editor: { events },
  } = useBuilderContext();
  const removeSelected = useAction(removeSelectedElement);

  useSubscription(() => {
    const keyboardEvents = fromEvent<KeyboardEvent>(document, 'keydown');
    const canvasKeyboardEvents = events.pipe(
      filter(
        (event): event is CanvasKeyDownEvent => event.type === 'CanvasKeyDown'
      ),
      map((e) => e.payload)
    );

    return merge(canvasKeyboardEvents, keyboardEvents)
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
          case HotkeyActions.save: {
            messageApi.info('Saved successfully');
            return console.log('save here');
          }
          case HotkeyActions.remove:
            return removeSelected();
        }
      });
  }, [undoRedo, events]);
  return contextHolder;
};
