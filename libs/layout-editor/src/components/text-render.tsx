import styled from 'styled-components';
import { TextEditor } from '@waveditors/text-editor';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { TextStore } from '../types';
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

  outline: none;
`;

export const TextRender = ({ element, selected }: Props) => {
  const text = useBehaviorSubject(element);
  return (
    <StyledEditor
      onChange={setContent(element)}
      content={text.params.content}
      editable={selected}
    />
  );
};
