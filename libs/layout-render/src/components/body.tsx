import { useRenderContext, useRootStyle } from '../hooks';
import { ElementDumb } from './dumb-elements';

export const Body = () => {
  const { config } = useRenderContext();
  const style = useRootStyle();
  return (
    <body style={style}>
      <ElementDumb
        id={config.getValue().rootElementId}
        width={config.getValue().viewportWidth}
      />
    </body>
  );
};
