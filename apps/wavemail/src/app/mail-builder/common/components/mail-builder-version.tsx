import { Spin } from 'antd';
import { useBsSelector } from '@waveditors/rxjs-react';
import styled from 'styled-components';
import { getCurrent, useVersionsContext } from '../../versions';
import { Header } from '../../../common/components';
import { MailBuilderEditor } from './mail-builder-editor';
import { MailBuilderRoot, SidebarRoot, Content } from './mail-builder.styled';

const SpinInternal = styled(Spin)`
  padding: 20px;
  width: 100%;
`;

export const MailBuilderVersion = () => {
  const versions = useVersionsContext();
  const currentVersion = useBsSelector(versions.bs, getCurrent);
  if (!currentVersion)
    return (
      <MailBuilderRoot>
        <Header />
        <Content>
          <SidebarRoot />
          <SpinInternal />
        </Content>
      </MailBuilderRoot>
    );
  return <MailBuilderEditor snapshot={currentVersion} />;
};
