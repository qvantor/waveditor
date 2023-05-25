import { match } from 'ts-pattern';
import { map } from 'rxjs';
import { useBsSelector, useObservable } from '@waveditors/rxjs-react';
import {
  elementSelector,
  getElementById,
  useBuilderContext,
} from '@waveditors/editor-model';
import { NotFoundDumb } from '@waveditors/layout-render';
import { ELEMENT_DATATYPE } from '../../constants';
import { Layout } from './layout';
import { Text } from './text';
import { Image } from './image';

interface Props {
  id: string;
  width: number;
}

export const Element = ({ id, width }: Props) => {
  const {
    model: { elements },
    interaction: { selected },
  } = useBuilderContext();

  const isSelected = useBsSelector(selected.bs, (value) => value === id);
  const element = useObservable(
    elements.bs.pipe(map(getElementById(id))),
    getElementById(id)(elements.getValue()),
    [id, elements]
  );
  const attributes = { id, datatype: ELEMENT_DATATYPE };
  return match(element)
    .with(elementSelector('layout'), (element) => (
      <Layout element={element} width={width} attributes={attributes} />
    ))
    .with(elementSelector('text'), (element) => (
      <Text selected={isSelected} element={element} attributes={attributes} />
    ))
    .with(elementSelector('image'), (element) => (
      <Image element={element} attributes={attributes} />
    ))
    .otherwise(() => <NotFoundDumb id={id} />);
};
