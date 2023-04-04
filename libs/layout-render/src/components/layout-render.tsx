import { getTemplateDefaultFont } from '@waveditors/editor-model';
import { renderToStaticMarkup } from 'react-dom/server';
import { RenderContextValue } from '../constants';
import { templateConfigFontToStyle } from '../services';
import { RenderContext } from '../types';
// import { ElementDumb } from './dumb-elements';
import { Head } from './apply-fonts';

export const renderToString = (context: RenderContext) => {
  const head = renderToStaticMarkup(
    <RenderContextValue.Provider value={context}>
      <html>
        <head>
          <Head />
        </head>
        <LayoutRender {...context} />
      </html>
    </RenderContextValue.Provider>
  );
  console.log(head);
  return '';
};

export const LayoutRender = (props: RenderContext) => {
  const config = props.config.getValue();
  return (
    <RenderContextValue.Provider value={props}>
      <body
        style={{
          fontFamily: templateConfigFontToStyle(getTemplateDefaultFont(config)),
          ...config.style,
        }}
      >
        {/*<ElementDumb id={config.rootElementId} width={config.viewportWidth} />*/}
      </body>
    </RenderContextValue.Provider>
  );
};
