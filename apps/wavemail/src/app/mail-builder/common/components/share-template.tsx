import { FiShare } from 'react-icons/fi';
import { Modal, Select } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { HeaderButton } from '../../../common/components';
import { useGroupsQuery } from '../../../common/graphql/groups.g';
import { useTemplateId } from '../hooks';
import { useUpdateTemplateGroupsMutation } from '../graphql/update-template-groups.g';

const SelectInternal = styled(Select)`
  width: 100%;
  padding: 20px 0;
`;

export const ShareTemplate = () => {
  const templateId = useTemplateId();
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([]);
  const { data: templateGroups, loading: templateGroupsLoading } =
    useGroupsQuery({
      variables: { templateId },
    });
  const { data: allGroups, loading: allGroupsLoading } = useGroupsQuery();
  const [update, { loading: updateLoading }] =
    useUpdateTemplateGroupsMutation();
  const prevValues = useMemo(
    () => templateGroups?.groups.map((group) => group.id) ?? [],
    [templateGroups]
  );
  useEffect(() => setValue(prevValues), [prevValues]);
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const onOk = useCallback(async () => {
    const removeFrom = prevValues.filter((x) => !value.includes(x));
    const addTo = value.filter((x) => !prevValues.includes(x));
    await update({ variables: { templateId, addTo, removeFrom } });
    setOpen(false);
  }, [prevValues, templateId, update, value]);
  return (
    <>
      <HeaderButton onClick={toggleOpen}>
        <FiShare />
        Share
      </HeaderButton>
      <Modal
        title='Share template with group'
        open={isOpen}
        onOk={onOk}
        onCancel={toggleOpen}
        okText='Apply'
        cancelText='Revert'
        confirmLoading={updateLoading}
      >
        <SelectInternal
          placeholder='Select group'
          mode='multiple'
          options={allGroups?.groups.map((group) => ({
            label: group.name,
            value: group.id,
          }))}
          value={value}
          filterOption={(input, option) => {
            if (!option) return false;
            return option.label.toLowerCase().includes(input.toLowerCase());
          }}
          onChange={(value) => setValue(value as number[])}
          loading={templateGroupsLoading || allGroupsLoading}
        />
      </Modal>
    </>
  );
};
