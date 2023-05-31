import { Fragment } from 'react';
import { ColumnDumb } from '@waveditors/layout-render';
import { LinkElementToLayoutEvent } from '@waveditors/editor-model';
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
        const dndBefore = dndPreview?.index === 0 && dndPreview?.index === i;
        const dndAfter = dndPreview?.index === i + 1;
        return (
          <Fragment key={id}>
            {dndBefore && <DndPreview />}
            <Element id={id} width={width} />
            {dndAfter && <DndPreview />}
          </Fragment>
        );
      })}
      {column.length === 0 && dndPreview && <DndPreview />}
    </ColumnDumb>
  );
};
