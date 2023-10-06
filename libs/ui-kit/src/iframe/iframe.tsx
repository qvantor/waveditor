import { CSSProperties, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Root = styled.iframe`
  border: none;
  width: 100%;
`;

interface Props {
  id?: string;
  title: string;
  children: (props: { document: Document }) => JSX.Element;
  className?: string;
  style?: CSSProperties;
}

export const Iframe = ({ children, title, id, className, style }: Props) => {
  const [, setState] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const doc = frame.current?.contentDocument;
    if (doc) {
      // set correct doctype
      if (!doc.doctype) {
        doc.open();
        doc.write('<!DOCTYPE html>');
        doc.close();
      }
      // just update for component rerender
      setState(true);
    }
  }, []);
  return (
    <Root ref={frame} title={title} className={className} id={id} style={style}>
      {frame.current?.contentDocument &&
        createPortal(
          children({ document: frame.current.contentDocument }),
          frame.current.contentDocument.body
        )}
    </Root>
  );
};
