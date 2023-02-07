import { Fragment } from 'react';
import { LinkElementToLayoutEvent } from '../types';
import { ElementRender } from './element-render';

const DndPreview = () => (
  <div style={{ height: 4, border: '1px dashed gray', margin: 5 }} />
);

export const RenderColumn = ({
  column,
  width,
  dndPreview,
}: {
  column: string[];
  width: number;
  dndPreview?: LinkElementToLayoutEvent['payload']['position'];
}) => {
  return (
    <div style={{ width }}>
      {column.map((id, i) => {
        const dndHere = dndPreview?.index === i;
        return (
          <Fragment key={id}>
            {dndHere && !dndPreview.next && <DndPreview />}
            <ElementRender id={id} width={width} />
            {dndHere && dndPreview.next && <DndPreview />}
          </Fragment>
        );
      })}
      {column.length === 0 && dndPreview && <DndPreview />}
    </div>
  );
};
