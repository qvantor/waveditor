import { match } from 'ts-pattern';
import { Collapse } from 'antd';
import {
  ElementStore,
  elementSelector,
  Element,
  getElementLink,
} from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { BehaviorSubject } from 'rxjs';
import { LayoutParamsEditor } from '../layout-params-editor';
import { ImageParamsEditor } from '../image-params-editor';
import { TextParamsEditor } from '../text-params-editor';
import { CollapseStyled } from '../../common/components';
import { StyleEditor } from '../style-editor';
import { LinkEditor } from './components';

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

export const ElementEditor = ({ element }: Props) => {
  const link = useBsSelector(
    element.bs as BehaviorSubject<Element>,
    getElementLink
  );
  return (
    <>
      <TypedEditorSwitch element={element} />
      <StyleEditor element={element} />
      <CollapseStyled>
        <Collapse.Panel key='link' header='Link'>
          <LinkEditor value={link} onChange={element.actions.setLink} />
        </Collapse.Panel>
      </CollapseStyled>
    </>
  );
};
