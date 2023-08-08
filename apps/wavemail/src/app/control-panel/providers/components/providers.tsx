import { AiOutlinePlus } from 'react-icons/ai';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { AddButton, ContentSubheader } from '../../common';
import { ProvidersQuery, useProvidersQuery } from '../graphql/providers.g';
import { User } from '../../../common/components';
import { useSetActiveProviderMutation } from '../graphql/set-active-provider.g';
import { Provider } from './provider';

const dateRender = (value: string) => dayjs(value).fromNow();

type Provider = ProvidersQuery['providers'][number];

const columns: ColumnsType<ProvidersQuery['providers'][number]> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (name) => <Tag>{name}</Tag>,
  },
  {
    title: 'Creator',
    dataIndex: 'creator',
    render: (value: Provider['creator']) => <User user={value} />,
  },
  {
    title: 'Last updated',
    dataIndex: 'updatedAt',
    render: dateRender,
  },
];
const TableContainer = styled.div`
  .ant-table {
    .ant-table-thead {
      .ant-table-cell {
        background: ${tokens.color.surface.secondary};
      }
    }

    .ant-table-row {
      &:hover {
        .ant-table-cell {
          background: ${tokens.color.surface.quaternary};
        }
      }
    }
  }
`;
export const Providers = () => {
  const { data: providers, refetch, loading } = useProvidersQuery();
  const [selected, setSelected] = useState<number | boolean>(false);
  const [setActive, { loading: saving }] = useSetActiveProviderMutation({
    onCompleted: () => refetch(),
  });
  const selectedRowKeys = useMemo(
    () =>
      providers?.providers
        .filter((provider) => provider.active)
        .map((value) => value.id) ?? [],
    [providers]
  );
  const onClose = useCallback(() => {
    setSelected(false);
  }, [setSelected]);
  return (
    <>
      {selected && (
        <Provider
          onClose={onClose}
          id={typeof selected === 'number' ? selected : null}
        />
      )}
      <ContentSubheader>
        <h2>Providers</h2>
        <AddButton
          type='primary'
          icon={<AiOutlinePlus />}
          onClick={() => setSelected(true)}
        >
          Add
        </AddButton>
      </ContentSubheader>
      <TableContainer>
        <Table
          onRow={(row) => ({
            onClick: () => setSelected(row.id),
          })}
          rowSelection={{
            type: 'radio',
            columnTitle: 'Active',
            columnWidth: 100,
            selectedRowKeys,
            onSelect: (value) =>
              setActive({ variables: { providerId: value.id } }),
          }}
          rowKey='id'
          columns={columns}
          dataSource={providers?.providers}
          loading={loading || saving}
          pagination={false}
        />
      </TableContainer>
    </>
  );
};
