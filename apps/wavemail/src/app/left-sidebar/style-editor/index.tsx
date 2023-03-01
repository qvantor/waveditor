import { BehaviorSubject, map } from 'rxjs';
import { match } from 'ts-pattern';
import { Collapse } from 'antd';
import { Element, ElementStore } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { returnValue } from '@waveditors/utils';
import { LayoutParamsEditor } from '../layout-params-editor';
import { ImageParamsEditor } from '../image-params-editor';
import { CollapseStyled } from '../../common/components';
import { PaddingEditor, BackgroundEditor } from './components';

interface Props {
  element: ElementStore;
}

const TypedEditorSwitch = ({ element }: Props) =>
  match(element)
    .with({ bs: { value: { type: 'layout' } } }, (layout) => (
      <LayoutParamsEditor layout={layout} />
    ))
    .with({ bs: { value: { type: 'image' } } }, (image) => (
      <ImageParamsEditor image={image} />
    ))
    .otherwise(returnValue(null));
export const StyleEditor = ({ element }: Props) => {
  const style = useObservable(
    (element.bs as BehaviorSubject<Element>).pipe(map((value) => value.style)),
    {},
    [element]
  );
  return (
    <>
      <TypedEditorSwitch element={element} />
      <CollapseStyled>
        <Collapse.Panel key='padding' header='Padding'>
          <PaddingEditor
            value={style.padding}
            onChange={(value) => {
              element.actions.setStyle({ key: 'padding', value });
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
    </>
  );
};
