import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { noop } from 'rxjs';
import { TextEditor } from '@waveditors/text-editor';
import { Text } from '@waveditors/editor-model';
import { useStyle } from '../../hooks';

export const StyledEditor = styled(TextEditor)`
  p {
    margin: 0;
    padding: 0;
  }
`;

interface Props {
  text: Text;
}

export const TextDumb = ({ text, children }: PropsWithChildren<Props>) => {
  const style = useStyle(text);
  return (
    <div style={style}>
      {children ? (
        children
      ) : (
        <StyledEditor
          onChange={noop}
          content={text.params.content}
          editable={false}
        />
      )}
    </div>
  );
};
