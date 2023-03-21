import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Root = styled.iframe`
  border: none;
  width: 100%;
`;

interface Props {
  title: string;
  children: (props: { document: Document }) => JSX.Element;
  className?: string;
}

export const Iframe = ({ children, title, className }: Props) => {
  const [, setState] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    // just update for component rerender
    if (frame.current) {
      setState(true);
    }
  }, []);
  return (
    <Root ref={frame} title={title} className={className}>
      {frame.current?.contentDocument &&
        createPortal(
          children({ document: frame.current.contentDocument }),
          frame.current.contentDocument.body
        )}
    </Root>
  );
};
