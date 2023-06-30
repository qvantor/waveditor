import styled from 'styled-components';
import { tokens, font } from '@waveditors/theme';
import { useCallback } from 'react';

import { useBsSelector } from '@waveditors/rxjs-react';
import { useTemplateQuery } from '../../graphql/template.g';
import { useUpdateTemplateMutation } from '../../graphql/update-template.g';
import { useTemplateId } from '../../hooks';
import {
  Header as CommonHeader,
  Input,
  UserControls,
} from '../../../../common/components';
import { authStore, getUserFromToken } from '../../../../auth';
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
  const user = useBsSelector(authStore.bs, getUserFromToken);
  const { data } = useTemplateQuery({
    variables: { templateId },
    fetchPolicy: 'cache-only',
  });
  const [updateTemplate, { loading }] = useUpdateTemplateMutation();
  const onNameChange = useCallback(
    (name: string | undefined) => {
      if (name) updateTemplate({ variables: { templateId, data: { name } } });
    },
    [updateTemplate, templateId]
  );
  return (
    <CommonHeader>
      <NameInput
        value={data?.template.name}
        onChange={onNameChange}
        disabled={loading}
      />
      {data?.template.userId === user?.id && <ShareTemplate />}
      <UserControls />
    </CommonHeader>
  );
};
