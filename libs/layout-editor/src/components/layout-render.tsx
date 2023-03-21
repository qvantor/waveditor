import { ModelContext } from '../types';
import { ModelContextValue } from '../constants';
import { ElementDumb } from './dumb-elements';

export const LayoutRender = (props: ModelContext) => {
  const config = props.config.getValue();
  return (
    <ModelContextValue.Provider value={props}>
      <ElementDumb id={config.rootElementId} width={config.viewportWidth} />
    </ModelContextValue.Provider>
  );
};
