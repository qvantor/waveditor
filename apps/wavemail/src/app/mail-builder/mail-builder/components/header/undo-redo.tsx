import { useBuilderContext } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { BiUndo, BiRedo } from 'react-icons/bi';
import styled from 'styled-components';
import { HeaderButton } from '../../../../common/components';

const Root = styled.div`
  display: flex;
  margin-left: 10px;
`;

export const UndoRedo = () => {
  const {
    module: { undoRedo },
  } = useBuilderContext();
  const undoCounter = useObservable(undoRedo.undoCounter, 0, [undoRedo]);
  const redoCounter = useObservable(undoRedo.redoCounter, 0, [undoRedo]);
  return (
    <Root>
      <HeaderButton
        size='small'
        onClick={() => undoRedo.undo.next()}
        disabled={undoCounter === 0}
      >
        <BiUndo />
      </HeaderButton>
      <HeaderButton
        onClick={() => undoRedo.redo.next()}
        size='small'
        disabled={redoCounter === 0}
      >
        <BiRedo />
      </HeaderButton>
    </Root>
  );
};
