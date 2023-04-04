import { useMemo } from 'react';
import { match } from 'ts-pattern';
import { elementSelector, getElementById } from '@waveditors/editor-model';
import { useRenderContext } from '../../hooks';
import { LayoutDumb } from './layout.dumb';
import { TextDumb } from './text.dumb';
import { ImageDumb } from './image.dumb';
import { ColumnDumb } from './column.dumb';

interface Props {
  id: string;
  width: number;
}

export const ElementDumb = ({ id, width }: Props) => {
  const { elements } = useRenderContext();
  const element = useMemo(
    () => getElementById(id)(elements.value),
    [id, elements]
  );
  return match(element)
    .with(elementSelector('layout'), (layout) => (
      <LayoutDumb
        layout={layout.getValue()}
        width={width}
        renderColumn={({ width, column }) => (
          <ColumnDumb width={width}>
            {column.map((col, id) => (
              <ElementDumb id={col} width={width} key={id} />
            ))}
          </ColumnDumb>
        )}
      />
    ))
    .with(elementSelector('text'), (text) => (
      <TextDumb text={text.getValue()} />
    ))
    .with(elementSelector('image'), (image) => (
      <ImageDumb image={image.getValue()} />
    ))
    .exhaustive();
};
