import styled from 'styled-components';
import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { styleMapper, TextStore } from '@waveditors/editor-model';
import { setContent } from '../services';

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

// @todo move setContent to TextStore
export const TextRender = ({ element, selected }: Props) => {
  const text = useBehaviorSubject(element.bs);
  return (
    <div style={styleMapper(text.style)}>
      <StyledEditor
        onChange={setContent(element.bs)}
        content={text.params.content}
        editable={selected}
      />
    </div>
  );
};
