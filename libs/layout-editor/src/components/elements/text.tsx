import styled from 'styled-components';
import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore } from '@waveditors/editor-model';
import { TextDumb } from '../dumb-elements';

interface Props {
  selected: boolean;
  element: TextStore;
}

const StyledEditor = styled(TextEditor)`
  p {
    margin: 0;
    padding: 0;
  }
`;

export const Text = ({ element, selected }: Props) => {
  const text = useBehaviorSubject(element.bs);
  return (
    <TextDumb text={text}>
      <StyledEditor
        onChange={element.actions.setContent}
        content={text.params.content}
        editable={selected}
      />
    </TextDumb>
  );
};
