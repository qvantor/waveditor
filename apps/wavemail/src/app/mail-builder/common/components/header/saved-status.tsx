import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { BsCloudArrowUp, BsCloudCheck } from 'react-icons/bs';
import {
  builderContextToSnapshot,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { useUnmount } from 'react-use';
import { Tooltip } from 'antd';
import { useSaveSnapshot } from '../../../versions';

const SavedIcon = styled.div`
  height: ${tokens.size.headerHeight};
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.color.text.secondary};
`;

const UptoDateIcon = styled(BsCloudCheck)`
  color: ${tokens.color.text.success};
`;

export const SavedStatus = () => {
  const {
    module: { onChange },
  } = useBuilderContext();
  const isSaved = useBehaviorSubject(onChange.changed);
  const saveSnapshot = useSaveSnapshot();
  const context = useBuilderContext();
  useUnmount(() => {
    if (!isSaved) saveSnapshot(builderContextToSnapshot(context));
  });
  return (
    <Tooltip title={isSaved ? 'Saved' : 'Saving...'}>
      <SavedIcon>{isSaved ? <UptoDateIcon /> : <BsCloudArrowUp />}</SavedIcon>
    </Tooltip>
  );
};
