import styled from 'styled-components';
import { getColumns, LayoutStore } from '@waveditors/editor-model';
import {
  selectorToPipe,
  useBsSelector,
  useSubscription,
} from '@waveditors/rxjs-react';
import { filter } from 'rxjs';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IconButton } from '../../../../../common/components';
import { AlignEditor } from '../../common/components';
import { SimpleEditorRow, RowContainer } from '../../../common/components';
import { ColumnsProportions } from './columns-proportions';

interface Props {
  layout: LayoutStore;
}

const ColumnsCount = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ColumnsEditor = ({ layout }: Props) => {
  const columns = useBsSelector(layout.bs, getColumns);
  const [column, setColumn] = useState<number>(0);

  // if selected column is out of columns range, select the last column
  useSubscription(() =>
    layout.bs
      .pipe(
        selectorToPipe(getColumns),
        filter((columns) => columns.length - 1 < column)
      )
      .subscribe(() => setColumn(columns.length - 1))
  );

  return (
    <RowContainer>
      <SimpleEditorRow>
        <div>Count</div>
        <ColumnsCount>
          <IconButton
            icon={<AiOutlineMinus />}
            size='small'
            onClick={() => layout.actions.removeColumn(column)}
            disabled={columns.length <= 1}
          />
          {columns.length}
          <IconButton
            icon={<AiOutlinePlus />}
            size='small'
            onClick={layout.actions.addColumn}
            disabled={columns.length >= 6}
          />
        </ColumnsCount>
      </SimpleEditorRow>
      <ColumnsProportions
        layout={layout}
        onColumnSelect={setColumn}
        column={column}
      />
      <SimpleEditorRow>
        <div>Align</div>
        <AlignEditor
          value={columns[column]?.align}
          onChange={(align) =>
            layout.actions.setColumnAlign({ index: column, align })
          }
        />
      </SimpleEditorRow>
    </RowContainer>
  );
};
