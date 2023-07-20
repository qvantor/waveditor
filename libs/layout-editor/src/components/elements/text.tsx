import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore, useBuilderContext } from '@waveditors/editor-model';
import { TextDumb, useElementContext } from '@waveditors/layout-render';
import { useLayoutEditorContext } from '../../hooks';

type Props = {
  element: TextStore;
};

const useFindVariables = () => {
  const {
    model: { variables },
  } = useBuilderContext();
  return (query: string) => {
    return variables
      .getValue()
      .filter((variable) =>
        variable.label.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5);
  };
};

export const Text = ({ element }: Props) => {
  const text = useBehaviorSubject(element.bs);
  const { iFrameDocument } = useLayoutEditorContext();
  const { isSelected } = useElementContext();
  const findVariables = useFindVariables();
  return (
    <TextDumb element={text}>
      <TextEditor
        onChange={element.actions.setContent}
        content={text.params.content}
        editable={isSelected}
        iFrameDocument={iFrameDocument}
        findVariables={findVariables}
      />
    </TextDumb>
  );
};
