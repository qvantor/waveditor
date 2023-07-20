import { match } from 'ts-pattern';
import { map } from 'rxjs';
import { useBsSelector, useObservable } from '@waveditors/rxjs-react';
import {
  elementSelector,
  getElementById,
  useBuilderContext,
} from '@waveditors/editor-model';
import {
  ElementContextProvider,
  NotFoundDumb,
} from '@waveditors/layout-render';
import { useMemo } from 'react';
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
  const elementContext = useMemo(
    () => ({
      isSelected,
      parentWidth: width,
      attributes: { id, datatype: ELEMENT_DATATYPE },
    }),
    [width, id, isSelected]
  );
  return (
    <ElementContextProvider value={elementContext}>
      {match(element)
        .with(elementSelector('layout'), (element) => (
          <Layout element={element} />
        ))
        .with(elementSelector('text'), (element) => <Text element={element} />)
        .with(elementSelector('image'), (element) => (
          <Image element={element} />
        ))
        .otherwise(() => (
          <NotFoundDumb id={id} />
        ))}
    </ElementContextProvider>
  );
};
