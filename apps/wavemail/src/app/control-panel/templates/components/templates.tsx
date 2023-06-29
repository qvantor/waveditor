import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { createEmptySnapshot } from '@waveditors/editor-model';
import { useCreateTemplateMutation } from '../graphql/create-template.g';
import { BUILDER } from '../../../common/constants';
import { ContentSubheader, AddButton } from '../../common';
import { TemplatesList } from './templates-list';

export const Templates = () => {
  const navigate = useNavigate();
  const [create, { loading }] = useCreateTemplateMutation();
  const createNewTemplate = useCallback(async () => {
    const { data } = await create({
      variables: { data: { json: createEmptySnapshot() } },
    });
    if (!data) return;
    navigate(generatePath(BUILDER, { id: String(data.createTemplate.id) }));
  }, [create, navigate]);
  return (
    <>
      <ContentSubheader>
        <h2>Templates</h2>
        <AddButton
          type='primary'
          onClick={createNewTemplate}
          disabled={loading}
          icon={<AiOutlinePlus />}
        >
          Add
        </AddButton>
      </ContentSubheader>
      <TemplatesList />
    </>
  );
};
