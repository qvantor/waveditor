import { useEffect, useRef } from 'react';
import { EditorSnapshot } from '@waveditors/editor-model';
import styled from 'styled-components';
import { renderToString } from '../services';

interface Props {
  snapshot: EditorSnapshot;
  className?: string;
}

const Root = styled.iframe`
  border: none;
  width: 100%;
`;

export const RenderPreview = ({ snapshot, className }: Props) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!frameRef.current || !frameRef.current.contentDocument) return;
    frameRef.current.contentDocument.open();
    frameRef.current.contentDocument.write(renderToString(snapshot));
    frameRef.current.contentDocument.close();
  }, [snapshot]);
  return <Root ref={frameRef} className={className} title='Preview' />;
};
