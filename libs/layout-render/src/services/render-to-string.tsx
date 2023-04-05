import { renderToStaticMarkup } from 'react-dom/server';
import { Body, Head } from '../components';
import { RenderContext } from '../types';
import { RenderContextValue } from '../constants';

export const renderToString = (model: RenderContext) =>
  renderToStaticMarkup(
    <RenderContextValue.Provider value={model}>
      <html>
        <Head />
        <Body />
      </html>
    </RenderContextValue.Provider>
  );
