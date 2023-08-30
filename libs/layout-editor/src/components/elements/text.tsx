import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore } from '@waveditors/editor-model';
import { TextDumb, useElementContext } from '@waveditors/layout-render';
import { useLayoutEditorContext } from '../../hooks';

type Props = {
  element: TextStore;
};

export const Text = ({ element }: Props) => {
  const text = useBehaviorSubject(element.bs);
  const { iFrameDocument } = useLayoutEditorContext();
  const { isSelected } = useElementContext();
  return (
    <TextDumb element={text}>
      <TextEditor
        onChange={element.actions.setContent}
        content={text.params.content}
        editable={isSelected}
        iFrameDocument={iFrameDocument}
      />
    </TextDumb>
  );
};
