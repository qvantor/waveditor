import { useCallback } from 'react';
import { ElementLink } from '@waveditors/editor-model';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { InputVariables } from '@waveditors/text-editor';
import { JSONContent } from '@tiptap/core';

interface Props {
  value: ElementLink | null;
  onChange: (value: ElementLink | null) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EmptyUrl = {
  type: 'oneLiner',
  content: [
    {
      type: 'paragraph',
    },
  ],
};
const mapValue = (value?: string | JSONContent): JSONContent | undefined => {
  if (!value) return;
  if (typeof value === 'string') {
    return {
      type: 'oneLiner',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: value }],
        },
      ],
    };
  }
  return value;
};
export const LinkEditor = ({ value, onChange }: Props) => {
  const onChangeInternal = useCallback(
    <K extends keyof ElementLink>(key: K) =>
      (val: ElementLink[K] | undefined) =>
        onChange({
          newTab: value?.newTab ?? false,
          url: value?.url ?? EmptyUrl,
          [key]: val,
        }),
    [value, onChange]
  );
  return (
    <Root>
      <InputVariables
        onChange={onChangeInternal('url')}
        content={mapValue(value?.url) ?? EmptyUrl}
        editable
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
