import { renderToStaticMarkup } from 'react-dom/server';
import { BuilderProvider, BuilderContext } from '@waveditors/editor-model';
import { Body, Head } from '../components';

export const renderToString = (context: BuilderContext) =>
  renderToStaticMarkup(
    <BuilderProvider value={context}>
      <html>
        <Head />
        <Body />
      </html>
    </BuilderProvider>
  );
