import { renderToStaticMarkup } from 'react-dom/server';
import {
  BuilderProvider,
  createBuilderContext,
  EditorSnapshot,
} from '@waveditors/editor-model';
import { Body, Head } from '../components';

export const renderToString = (data: EditorSnapshot) => {
  const context = createBuilderContext(data);
  return renderToStaticMarkup(
    <BuilderProvider value={context}>
      <html>
        <Head />
        <Body />
      </html>
    </BuilderProvider>
  );
};
