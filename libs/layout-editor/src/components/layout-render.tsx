import { getTemplateDefaultFont } from '@waveditors/editor-model';
import { ModelContext } from '../types';
import { ModelContextValue } from '../constants';
import { templateConfigFontToStyle } from '../services';
import { ElementDumb } from './dumb-elements';

export const LayoutRender = (props: ModelContext) => {
  const config = props.config.getValue();
  return (
    <ModelContextValue.Provider value={props}>
      <div
        style={{
          fontFamily: templateConfigFontToStyle(getTemplateDefaultFont(config)),
          ...config.style,
        }}
      >
        <ElementDumb id={config.rootElementId} width={config.viewportWidth} />
      </div>
    </ModelContextValue.Provider>
  );
};
