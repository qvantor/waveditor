import { useBuilderContext } from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { Collapse } from 'antd';
import { removePx } from '@waveditors/utils';
import {
  BackgroundEditor,
  SidebarHeader,
  SizeEditor,
} from '../../common/components';
import { CollapseStyled } from '../../../../common/components';

const MIN_SIZE = 200;
const MAX_SIZE = 900;
export const Config = () => {
  const {
    model: { config },
  } = useBuilderContext();
  const { viewportWidth, style } = useBehaviorSubject(config.bs);
  return (
    <>
      <SidebarHeader>Config</SidebarHeader>
      <CollapseStyled name='style-editor'>
        <Collapse.Panel key='Width' header='Width'>
          <SizeEditor
            width={String(viewportWidth)}
            height={style.height}
            onChange={(change) =>
              config.actions.setWidth(
                change.value
                  ? Math.max(
                      Math.min(Number(removePx(change.value)), MAX_SIZE),
                      MIN_SIZE
                    )
                  : 600
              )
            }
            dimensions={['w']}
          />
        </Collapse.Panel>
        <Collapse.Panel key='background' header='Background'>
          <BackgroundEditor
            value={{
              backgroundColor: style.backgroundColor,
              backgroundImage: style.backgroundImage,
              backgroundPosition: style.backgroundPosition,
              backgroundRepeat: style.backgroundRepeat,
              backgroundSize: style.backgroundSize,
              backgroundOrigin: style.backgroundOrigin,
            }}
            onChange={config.actions.setStyle}
          />
        </Collapse.Panel>
      </CollapseStyled>
    </>
  );
};
