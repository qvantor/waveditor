import { Collapse } from 'antd';
import { useBsSelector } from '@waveditors/rxjs-react';
import { BehaviorSubject } from 'rxjs';
import {
  Element,
  ElementStore,
  getElementStyle,
  typeToDimensions,
} from '@waveditors/editor-model';
import { useMemo } from 'react';
import { CollapseStyled } from '../../../../common/components';
import { BackgroundEditor, SizeEditor } from '../../common/components';
import { BorderRadiusEditor, PaddingEditor } from './components';

interface Props {
  element: ElementStore;
}

export const StyleEditor = ({ element }: Props) => {
  const style = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementStyle
  );
  const dimensions = useMemo(
    () => typeToDimensions(element.getValue().type),
    [element]
  );
  return (
    <CollapseStyled name='style-editor'>
      <Collapse.Panel key='padding' header='Padding'>
        <PaddingEditor
          value={style.padding}
          onChange={(value) => {
            element.actions.setStyle({ key: 'padding', value });
          }}
        />
      </Collapse.Panel>
      {dimensions.length !== 0 && (
        <Collapse.Panel key='size' header='Size'>
          <SizeEditor
            width={style.width}
            height={style.height}
            onChange={element.actions.setStyle}
            dimensions={dimensions}
          />
        </Collapse.Panel>
      )}
      <Collapse.Panel key='cornerRadius' header='Corner radius'>
        <BorderRadiusEditor
          value={style.borderRadius}
          onChange={(value) => {
            element.actions.setStyle({ key: 'borderRadius', value });
          }}
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
          onChange={element.actions.setStyle}
        />
      </Collapse.Panel>
    </CollapseStyled>
  );
};
