import styled from 'styled-components';
import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore } from '@waveditors/editor-model';
import { useStyle } from '../hooks';

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

export const TextRender = ({ element, selected }: Props) => {
  const text = useBehaviorSubject(element.bs);
  const style = useStyle(text);
  return (
    <div style={style}>
      <StyledEditor
        onChange={element.actions.setContent}
        content={text.params.content}
        editable={selected}
      />
    </div>
  );
};
