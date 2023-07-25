import { useMemo } from 'react';
import { match } from 'ts-pattern';
import {
  elementSelector,
  getElementById,
  useBuilderContext,
} from '@waveditors/editor-model';
import { ElementContextProvider } from '../../constants';
import { LayoutDumb } from './layout.dumb';
import { TextDumb } from './text.dumb';
import { ImageDumb } from './image.dumb';
import { ColumnDumb } from './column.dumb';
import { NotFoundDumb } from './not-found.dumb';

interface Props {
  id: string;
  width: number;
}

export const ElementDumb = ({ id, width }: Props) => {
  const {
    model: { elements },
  } = useBuilderContext();
  const element = useMemo(
    () => getElementById(id)(elements.getValue()),
    [id, elements]
  );
  return (
    <ElementContextProvider value={{ parentWidth: width, isSelected: false }}>
      {match(element)
        .with(elementSelector('layout'), (layout) => (
          <LayoutDumb
            element={layout.getValue()}
            renderColumn={(props) => (
              <ColumnDumb align={props.column.align} {...props}>
                {props.column.children.map((col, id) => (
                  <ElementDumb id={col} width={props.width} key={id} />
                ))}
              </ColumnDumb>
            )}
          />
        ))
        .with(elementSelector('text'), (text) => (
          <TextDumb element={text.getValue()} />
        ))
        .with(elementSelector('image'), (image) => (
          <ImageDumb element={image.getValue()} />
        ))
        .otherwise(() => (
          <NotFoundDumb id={id} />
        ))}
    </ElementContextProvider>
  );
};
