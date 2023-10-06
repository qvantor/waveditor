import styled from 'styled-components';
import { useMemo } from 'react';
import { Select } from '@waveditors/ui-kit';
import { useTagsQuery } from '../../elements/element-editor/graphql/tags.g';

const TagSelectorRoot = styled.div`
  padding: 0 10px 10px 10px;
`;

export const TagsSelector = ({
  value,
  onChange,
}: {
  value: number[];
  onChange: (value: number[]) => void;
}) => {
  const { data } = useTagsQuery();
  const tagOptions = useMemo(
    () => (data?.tags ?? []).map((tag) => ({ value: tag.id, label: tag.name })),
    [data]
  );
  return (
    <TagSelectorRoot>
      <Select
        mode='multiple'
        options={tagOptions}
        value={value}
        onChange={(val) => onChange(val as number[])}
        filterOption={(value, option) =>
          String(option?.label).toLowerCase().includes(value.toLowerCase())
        }
      />
    </TagSelectorRoot>
  );
};
