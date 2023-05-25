import { useBuilderContext } from '@waveditors/editor-model';
import { useRootStyle } from '../hooks';
import { ElementDumb } from './dumb-elements';

export const Body = () => {
  const {
    model: { config },
  } = useBuilderContext();
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
