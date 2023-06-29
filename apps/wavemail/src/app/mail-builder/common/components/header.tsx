import styled from 'styled-components';
import { tokens, font } from '@waveditors/theme';
import { useCallback } from 'react';

import { useTemplateQuery } from '../graphql/template.g';
import { useUpdateTemplateMutation } from '../graphql/update-template.g';
import { useTemplateId } from '../hooks';
import { Header as CommonHeader, Input } from '../../../common/components';
import { ShareTemplate } from './share-template';

const NameInput = styled(Input)`
  flex: 1;
  background: transparent;
  border: none;
  color: ${tokens.color.text.tertiary};
  text-align: center;
  ${font({ size: 'small', weight: 'bold' })}
`;

export const Header = () => {
  const templateId = useTemplateId();
  const { data } = useTemplateQuery({
    variables: { templateId },
  });
  const [updateTemplate] = useUpdateTemplateMutation();
  const onNameChange = useCallback(
    (name: string | undefined) => {
      if (name) updateTemplate({ variables: { templateId, data: { name } } });
    },
    [updateTemplate, templateId]
  );
  return (
    <CommonHeader>
      <NameInput value={data?.template.name} onChange={onNameChange} />
      <ShareTemplate />
    </CommonHeader>
  );
};
