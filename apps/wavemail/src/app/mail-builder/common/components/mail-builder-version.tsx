import { Spin } from 'antd';
import { useBsSelector } from '@waveditors/rxjs-react';
import { getCurrent, useVersionsContext } from '../../versions';
import { MailBuilderEditor } from './mail-builder-editor';

export const MailBuilderVersion = () => {
  const versions = useVersionsContext();
  const currentVersion = useBsSelector(versions.bs, getCurrent);
  if (!currentVersion) return <Spin />;
  return <MailBuilderEditor snapshot={currentVersion} />;
};
