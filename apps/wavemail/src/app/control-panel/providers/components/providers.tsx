import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { Table, Tag, Popconfirm } from 'antd';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { AddButton, ContentSubheader } from '../../common';
import { ProvidersQuery, useProvidersQuery } from '../graphql/providers.g';
import { User, IconButton } from '../../../common/components';
import { useSetActiveProviderMutation } from '../graphql/set-active-provider.g';
import { useDeleteProviderMutation } from '../graphql/delete-provider.g';
import { Provider } from './provider';

const { Column } = Table;
const dateRender = (value: string) => dayjs(value).fromNow();

type ProviderType = ProvidersQuery['providers'][number];
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

    tr > td.ant-table-cell-row-hover {
      background: ${tokens.color.surface.quaternary};
    }
  }
`;
export const Providers = () => {
  const { data: providers, refetch, loading } = useProvidersQuery();
  const [selected, setSelected] = useState<number | boolean>(false);
  const [setActive, { loading: saving }] = useSetActiveProviderMutation({
    onCompleted: () => refetch(),
  });
  const [deleteProvider] = useDeleteProviderMutation({
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
          dataSource={providers?.providers}
          loading={loading || saving}
          pagination={false}
        >
          <Column dataIndex='name' title='Name' />
          <Column
            dataIndex='type'
            title='Type'
            render={(name: string) => <Tag>{name}</Tag>}
          />
          <Column
            dataIndex='creator'
            title='Creator'
            render={(creator: ProviderType['creator']) => (
              <User user={creator} />
            )}
          />
          <Column
            dataIndex='updatedAt'
            title='Last updated'
            render={dateRender}
          />
          <Column
            render={(row: ProviderType) => (
              <Popconfirm
                title={`Delete ${row.name} provider?`}
                onConfirm={(e) => {
                  e?.stopPropagation();
                  deleteProvider({ variables: { id: row.id } });
                }}
                onCancel={(e) => e?.stopPropagation()}
              >
                <IconButton
                  icon={<AiOutlineDelete />}
                  type='text'
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(row.id);
                  }}
                  disabled={row.active ?? false}
                />
              </Popconfirm>
            )}
          />
        </Table>
      </TableContainer>
    </>
  );
};
