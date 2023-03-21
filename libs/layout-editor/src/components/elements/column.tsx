import { Fragment } from 'react';
import { LinkElementToLayoutEvent } from '../../types';
import { ColumnDumb } from '../dumb-elements';
import { Element } from './element';

interface Props {
  column: string[];
  width: number;
  dndPreview?: LinkElementToLayoutEvent['payload']['position'];
}

const DndPreview = () => (
  <div style={{ height: 4, border: '1px dashed gray', margin: 5 }} />
);

export const Column = ({ column, width, dndPreview }: Props) => {
  return (
    <ColumnDumb width={width}>
      {column.map((id, i) => {
        const dndHere = dndPreview?.index === i;
        return (
          <Fragment key={id}>
            {dndHere && !dndPreview.next && <DndPreview />}
            <Element id={id} width={width} />
            {dndHere && dndPreview.next && <DndPreview />}
          </Fragment>
        );
      })}
      {column.length === 0 && dndPreview && <DndPreview />}
    </ColumnDumb>
  );
};
