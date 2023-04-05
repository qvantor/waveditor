import { useObservable } from '@waveditors/rxjs-react';
import {
  getTemplateConfigFonts,
  selectorToPipe,
} from '@waveditors/editor-model';
import { PropsWithChildren, useMemo } from 'react';
import { useRenderContext } from '../hooks';
import { Helmet } from './helmet';

export const Head = ({ iFrameDocument }: { iFrameDocument?: Document }) => {
  const { config } = useRenderContext();
  const fonts = useObservable(
    config.pipe(selectorToPipe(getTemplateConfigFonts)),
    getTemplateConfigFonts(config.getValue())
  );
  const Wrapper = useMemo(() => {
    return iFrameDocument
      ? ({ children }: PropsWithChildren) => (
          <Helmet iFrameDocument={iFrameDocument}>{children}</Helmet>
        )
      : ({ children }: PropsWithChildren) => (
          <head>
            <title />
            {children}
          </head>
        );
  }, [iFrameDocument]);
  return (
    <Wrapper>
      {fonts.map((font) => {
        if (!font.name || !font.url) return null;
        return (
          <link
            key={font.id}
            href={font.url}
            rel='stylesheet'
            type='text/css'
          />
        );
      })}
    </Wrapper>
  );
};
