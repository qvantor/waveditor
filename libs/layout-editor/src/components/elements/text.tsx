import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore } from '@waveditors/editor-model';
import {
  TextDumb,
  TextDumbProps,
  useRenderContext,
} from '@waveditors/layout-render';
import { useLayoutEditorContext } from '../../hooks';

type Props = {
  selected: boolean;
  element: TextStore;
} & Pick<TextDumbProps, 'attributes'>;

const useFindVariables = () => {
  const { variables } = useRenderContext();
  return (query: string) => {
    return variables
      .getValue()
      .filter((variable) =>
        variable.label.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5);
  };
};

export const Text = ({ element, selected, attributes }: Props) => {
  const text = useBehaviorSubject(element.bs);
  const { iFrameDocument } = useLayoutEditorContext();
  const findVariables = useFindVariables();
  return (
    <TextDumb element={text} attributes={attributes}>
      <TextEditor
        onChange={element.actions.setContent}
        content={text.params.content}
        editable={selected}
        iFrameDocument={iFrameDocument}
        findVariables={findVariables}
      />
    </TextDumb>
  );
};
