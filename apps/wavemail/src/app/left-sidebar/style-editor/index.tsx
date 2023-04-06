import { BehaviorSubject, map } from 'rxjs';
import { match } from 'ts-pattern';
import { Collapse } from 'antd';
import {
  Element,
  ElementStore,
  elementSelector,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { LayoutParamsEditor } from '../layout-params-editor';
import { ImageParamsEditor } from '../image-params-editor';
import { TextParamsEditor } from '../text-params-editor';
import { CollapseStyled } from '../../common/components';
import { PaddingEditor, BackgroundEditor } from './components';

interface Props {
  element: ElementStore;
}

const TypedEditorSwitch = ({ element }: Props) =>
  match(element)
    .with(elementSelector('layout'), (layout) => (
      <LayoutParamsEditor layout={layout} />
    ))
    .with(elementSelector('image'), (image) => (
      <ImageParamsEditor image={image} />
    ))
    .with(elementSelector('text'), (text) => <TextParamsEditor text={text} />)
    .exhaustive();
export const StyleEditor = ({ element }: Props) => {
  const style = useObservable(
    (element.bs as BehaviorSubject<Element>).pipe(map((value) => value.style)),
    {}
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
