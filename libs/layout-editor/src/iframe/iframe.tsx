import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { StyleSheetManager } from 'styled-components';
import { tokens } from '@waveditors/theme';
import { IframeContextValue } from './iframe-context';

const Root = styled.iframe`
  border: none;
  width: 100%;
  height: calc(
    100vh - ${tokens.size.headerHeight} - ${tokens.size.footerHeight}
  );
`;

interface Props {
  title: string;
}

export const Iframe = ({ children, title }: PropsWithChildren<Props>) => {
  const [, setState] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (frame.current) {
      setState(true);
    }
  }, []);
  return (
    <Root ref={frame} title={title}>
      {frame.current?.contentDocument &&
        createPortal(
          <IframeContextValue.Provider value={frame.current.contentDocument}>
            <StyleSheetManager target={frame.current.contentDocument.head}>
              {children}
            </StyleSheetManager>
          </IframeContextValue.Provider>,
          frame.current.contentDocument.body
        )}
    </Root>
  );
};
