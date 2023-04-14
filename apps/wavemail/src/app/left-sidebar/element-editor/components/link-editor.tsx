import { useCallback } from 'react';
import { ElementLink } from '@waveditors/editor-model';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { Input } from '../../../common/components';

interface Props {
  value: ElementLink | null;
  onChange: (value: ElementLink | null) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LinkEditor = ({ value, onChange }: Props) => {
  const onChangeInternal = useCallback(
    <K extends keyof ElementLink>(key: K) =>
      (val: ElementLink[K] | undefined) =>
        onChange({
          newTab: value?.newTab ?? false,
          url: value?.url ?? '',
          [key]: val,
        }),
    [value, onChange]
  );
  return (
    <Root>
      <Input
        value={value?.url}
        placeholder='Link url'
        onChange={onChangeInternal('url')}
      />
      <Checkbox
        checked={value?.newTab}
        onChange={(e) => onChangeInternal('newTab')(e.target.checked)}
      >
        Open in a new tab
      </Checkbox>
    </Root>
  );
};
