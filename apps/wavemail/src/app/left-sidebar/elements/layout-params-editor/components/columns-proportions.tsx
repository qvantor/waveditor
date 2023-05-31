import { Column, getColumns, LayoutStore } from '@waveditors/editor-model';
import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  createStore,
  useBehaviorSubject,
  useBsSelector,
  useStore,
} from '@waveditors/rxjs-react';
import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { round } from '@waveditors/utils';

const Root = styled.div`
  display: flex;
  gap: 4px;
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

interface Props {
  layout: LayoutStore;
  onColumnSelect: (index: number) => void;
  column: number;
}

const MIN_COLUMN_SIZE = 10;

const proportionsStoreConstructor = () =>
  createStore<number[]>().addActions({
    set: (value: number[]) => value,
  });

const columnsToProportions = (columns: Column[]) =>
  columns.map((col) => col.proportion);

const changeProportions = (
  proportions: number[],
  index: number,
  diff: number
): number[] => {
  let rightProportion = proportions[index] - diff;
  let leftProportion = proportions[index - 1] + diff;

  if (rightProportion < MIN_COLUMN_SIZE) {
    leftProportion += rightProportion - MIN_COLUMN_SIZE;
    rightProportion = MIN_COLUMN_SIZE;
  } else if (leftProportion < MIN_COLUMN_SIZE) {
    rightProportion += leftProportion - MIN_COLUMN_SIZE;
    leftProportion = MIN_COLUMN_SIZE;
  }
  return proportions.map((col, i) => {
    if (i === index) return round(rightProportion);
    if (i === index - 1) return round(leftProportion);
    return col;
  });
};

export const ColumnsProportions = ({
  layout,
  onColumnSelect,
  column,
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const columns = useBsSelector(layout.bs, getColumns);
  const proportionsStore = useStore(
    proportionsStoreConstructor(),
    columnsToProportions(columns),
    [layout]
  );
  const proportions = useBehaviorSubject(proportionsStore.bs);

  const syncInternalToExternal = useCallback(() => {
    layout.actions.setColumnsProportions(proportionsStore.getValue());
  }, [layout, proportionsStore]);
  useEffect(() => {
    proportionsStore.actions.set(columnsToProportions(columns));
  }, [columns]);

  // @todo generalise mouse drag in hook
  const onHandleMouseDown = (index: number) => (e: ReactMouseEvent) => {
    e.stopPropagation();
    const initialPosition = e.screenX;
    if (!rootRef.current) return console.error('rootRef is not defined');
    const { width } = rootRef.current.getBoundingClientRect();
    const onMouseMove = (e: MouseEvent) => {
      const percentDiff = ((e.screenX - initialPosition) / width) * 100;
      proportionsStore.actions.set(
        changeProportions(proportions, index, percentDiff)
      );
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      syncInternalToExternal();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Root ref={rootRef}>
      {proportions.map((proportion, index) => (
        <ColumnPreview
          onClick={() => onColumnSelect(index)}
          style={{ width: proportion + '%' }}
          selected={column === index}
          key={index}
        >
          {index !== 0 && <Handle onMouseDown={onHandleMouseDown(index)} />}
          {Math.round(proportion)}
        </ColumnPreview>
      ))}
    </Root>
  );
};
