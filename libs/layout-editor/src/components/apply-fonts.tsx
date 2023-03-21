import { Helmet } from 'react-helmet';
import { useObservable } from '@waveditors/rxjs-react';
import {
  getTemplateConfigFonts,
  selectorToPipe,
} from '@waveditors/editor-model';
import { useModelContext } from '../hooks';

export const ApplyFonts = () => {
  const { config } = useModelContext();
  const fonts = useObservable(
    config.pipe(selectorToPipe(getTemplateConfigFonts)),
    []
  );
  return (
    <Helmet>
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
    </Helmet>
  );
};
