import styled, { css } from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useEffect, MouseEvent, useCallback } from 'react';
import { useBsSelector } from '@waveditors/rxjs-react';
import { GrRevert } from 'react-icons/gr';
import { Tooltip } from 'antd';
import { useTemplateId } from '../../common/hooks';
import {
  TemplateVersionsQuery,
  useTemplateVersionsQuery,
} from '../graphql/template-versions.g';
import { IconButton, User } from '../../../common/components';
import { useVersionsContext } from '../hooks';
import { getPreview } from '../store';

dayjs.extend(relativeTime);

type QueriedVersion = NonNullable<
  TemplateVersionsQuery['template']['versions']
>[number];

const Header = styled.div`
  padding: 0 8px;
  height: 34px;
  border-bottom: 1px solid ${tokens.color.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${font({ weight: 'bold', size: 'small' })}
  color: ${tokens.color.text.secondary}
`;

const VersionActions = styled.div`
  display: none;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${tokens.color.surface.secondary};
  width: 40px;
  right: 0;
  top: 0;
  height: 100%;
`;

const Version = styled.div<{ selected: boolean }>`
  position: relative;
  padding: 4px 8px;
  border-bottom: 1px solid ${tokens.color.border.primary};
  cursor: pointer;

  ${font({ size: 'smallest' })}
  &:hover {
    background: ${tokens.color.surface.primary};
  }

  ${({ selected }) =>
    selected &&
    css`
      background: ${tokens.color.surface.accentQuarter};

      &:hover ${VersionActions} {
        display: flex;
      }
    `}
`;
const VersionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;
const VersionHeader = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: ${tokens.color.text.secondary};
  }
`;
const Creator = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;

  span {
    color: ${tokens.color.text.secondary};
  }
`;
type Props = {
  onClose: () => void;
};

export const VersionsSidebar = ({ onClose }: Props) => {
  const templateId = useTemplateId();
  const { data } = useTemplateVersionsQuery({
    variables: { templateId },
    fetchPolicy: 'cache-and-network',
  });
  const versions = useVersionsContext();
  const preview = useBsSelector(versions.bs, getPreview);
  const revertTo = useCallback(
    (version: QueriedVersion) => (e: MouseEvent) => {
      e.stopPropagation();
      versions.actions.setCurrent(version.json);
      onClose();
    },
    [versions, onClose]
  );
  useEffect(
    () => () => {
      versions.actions.cleanPreview();
    },
    [versions]
  );
  return (
    <div>
      <Header>Versions</Header>
      {data?.template.versions?.map((version) => {
        const name = version.name ?? `Version ${version.id}`;
        return (
          <Version
            key={version.id}
            selected={preview?.id === version.id}
            onClick={() =>
              versions.actions.setPreview({
                id: version.id,
                name,
                snapshot: version.json,
              })
            }
          >
            <VersionContainer>
              <VersionHeader>
                <div>{name}</div>
                <span>{dayjs(version.updatedAt).fromNow()}</span>
              </VersionHeader>
              <Creator>
                <span>Created by:</span> <User user={version.creator} />
              </Creator>
            </VersionContainer>
            <VersionActions>
              <Tooltip title={`Revert to ${name}`}>
                <IconButton
                  icon={<GrRevert />}
                  size='small'
                  ghost
                  onClick={revertTo(version)}
                />
              </Tooltip>
            </VersionActions>
          </Version>
        );
      })}
    </div>
  );
};
