import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore } from '@waveditors/editor-model';
import { TextDumb, TextDumbProps } from '@waveditors/layout-render';
import { useLayoutEditorContext } from '../../hooks';

type Props = {
  selected: boolean;
  element: TextStore;
} & Pick<TextDumbProps, 'attributes'>;

export const Text = ({ element, selected, attributes }: Props) => {
  const text = useBehaviorSubject(element.bs);
  const { iFrameDocument } = useLayoutEditorContext();
  return (
    <TextDumb element={text} attributes={attributes}>
      <TextEditor
        onChange={element.actions.setContent}
        content={text.params.content}
        editable={selected}
        iFrameDocument={iFrameDocument}
      />
    </TextDumb>
  );
};
