import { getTemplateDefaultFont } from '@waveditors/editor-model';
import { renderToStaticMarkup } from 'react-dom/server';
import { ModelContext } from '../types';
import { ModelContextValue } from '../constants';
import { templateConfigFontToStyle } from '../services';
import { ElementDumb } from './dumb-elements';
import { Head } from './apply-fonts';

// @todo extract to external lib

export const renderToString = (context: ModelContext) => {
  const head = renderToStaticMarkup(
    <ModelContextValue.Provider value={context}>
      <html>
        <head>
          <Head />
        </head>
        <LayoutRender {...context} />
      </html>
    </ModelContextValue.Provider>
  );
  console.log(head);
  return '';
};

export const LayoutRender = (props: ModelContext) => {
  const config = props.config.getValue();
  return (
    <ModelContextValue.Provider value={props}>
      <body
        style={{
          fontFamily: templateConfigFontToStyle(getTemplateDefaultFont(config)),
          ...config.style,
        }}
      >
        <ElementDumb id={config.rootElementId} width={config.viewportWidth} />
      </body>
    </ModelContextValue.Provider>
  );
};
