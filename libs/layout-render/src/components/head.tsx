import { useBsSelector } from '@waveditors/rxjs-react';
import { getConfigFonts, useBuilderContext } from '@waveditors/editor-model';
import { PropsWithChildren, useMemo } from 'react';
import { Helmet } from './helmet';

export const Head = ({ iFrameDocument }: { iFrameDocument?: Document }) => {
  const {
    model: { config },
  } = useBuilderContext();

  const fonts = useBsSelector(config.bs, getConfigFonts);
  const Wrapper = useMemo(() => {
    return iFrameDocument
      ? ({ children }: PropsWithChildren) => (
          <Helmet iFrameDocument={iFrameDocument}>
            {children}
            <link
              href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap'
              rel='stylesheet'
            />
          </Helmet>
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
