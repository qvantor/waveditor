import styled, { css } from 'styled-components';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { LayoutStore, getColumns, Column } from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { font, tokens } from '@waveditors/theme';
import { MouseEvent as ReactMouseEvent, useState } from 'react';

interface Props {
  layout: LayoutStore;
}

const Root = styled.div``;

const ColumnCommon = styled.div`
  justify-content: center;
  align-items: center;
  color: ${tokens.color.text.tertiary};
  border-radius: ${tokens.borderRadius.m};
  cursor: pointer;
`;

const ColumnProportions = styled.div`
  display: flex;
  gap: 4px;
  margin: 0 -8px;
`;

const ColumnPreview = styled.div<{ selected: boolean }>`
  background: ${({ selected }) =>
    selected
      ? tokens.color.surface.accentSecondary
      : tokens.color.surface.primary};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${font({ type: 'paragraph', size: 'smallest', weight: 'bold' })};
  cursor: pointer;
  transition: background-color 0.1s linear;

  &:hover {
    background: ${({ selected }) =>
      selected
        ? tokens.color.surface.accentSecondary
        : tokens.color.surface.primaryHover};
  }
`;

const Handle = styled(RxDragHandleDots2)`
  color: ${tokens.color.text.secondary};
  width: 10px;
  position: absolute;
  left: -8px;
  background: ${tokens.color.surface.secondary};
  cursor: col-resize;
  border: 1px solid ${tokens.color.border.secondary};
`;

const columnWithProportions = (columns: Column[]): Required<Column>[] =>
  columns.map((column) => ({
    ...column,
    proportion: column.proportion ?? 100 / columns.length,
  }));

const MIN_COLUMN_SIZE = 10;
const columnsChangeProportions = (
  columns: Required<Column>[],
  index: number,
  diff: number
): Required<Column>[] => {
  const leftCol = columns[index - 1];
  const rightCol = columns[index];
  const internalDiff = Math.round(diff);
  let rightProportion = rightCol.proportion - internalDiff;
  let leftProportion = leftCol.proportion + internalDiff;
  if (rightProportion < MIN_COLUMN_SIZE) {
    leftProportion += rightProportion - MIN_COLUMN_SIZE;
    rightProportion = MIN_COLUMN_SIZE;
  } else if (leftProportion < MIN_COLUMN_SIZE) {
    rightProportion += leftProportion - MIN_COLUMN_SIZE;
    leftProportion = MIN_COLUMN_SIZE;
  }
  return columns.map((col, i) => {
    if (col === rightCol) return { ...col, proportion: rightProportion };
    if (col === leftCol) return { ...col, proportion: leftProportion };
    return col;
  });
};

export const ColumnsEditor = ({ layout }: Props) => {
  // const columns = columnWithProportions(useBsSelector(layout.bs, getColumns));
  const [columns, setColumns] = useState(
    columnWithProportions(getColumns(layout.bs.value))
  );
  const [column, setColumn] = useState<number>(0);
  const removeDisabled = columns.length <= 1;

  const onHandleMouseDown = (index: number) => (e: ReactMouseEvent) => {
    const initialPosition = e.screenX;
    const onMouseMove = (e: MouseEvent) => {
      const diff = ((e.screenX - initialPosition) / 273) * 100;
      setColumns(columnsChangeProportions(columns, index, diff));
      // initialPosition = e.screenX;
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Root>
      {/*{columns.map((content, index) => (*/}
      {/*  <Column*/}
      {/*    key={index}*/}
      {/*    disabled={removeDisabled}*/}
      {/*    onClick={() => !removeDisabled && layout.actions.removeColumn(index)}*/}
      {/*  >*/}
      {/*    {!removeDisabled && <DeleteIcon />}*/}
      {/*    <ColumnText>{content.children.length}</ColumnText>*/}
      {/*  </Column>*/}
      {/*))}*/}
      {/*{columns.length < 6 && (*/}
      {/*  <GhostColumn onClick={layout.actions.addColumn}>*/}
      {/*    <AiOutlinePlus />*/}
      {/*  </GhostColumn>*/}
      {/*)}*/}
      <ColumnProportions>
        {columns.map((col, index) => (
          <ColumnPreview
            onClick={() => setColumn(index)}
            style={{ width: col.proportion + '%' }}
            selected={column === index}
            key={index}
          >
            {index !== 0 && <Handle onMouseDown={onHandleMouseDown(index)} />}
            {col.proportion}
          </ColumnPreview>
        ))}
      </ColumnProportions>
      {columns.length < 6 && (
        <button onClick={layout.actions.addColumn}>add</button>
      )}
    </Root>
  );
};
