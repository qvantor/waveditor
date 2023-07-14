import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { checkUserTemplateBasePermission } from '../../services';

export const updateTemplate: MutationResolvers['updateTemplate'] = async (
  _,
  { templateId, data },
  { user }
) => {
  await checkUserTemplateBasePermission(user.id, templateId);
  return prisma.template.update({
    where: { id: templateId },
    data: {
      name: data.name ?? undefined,
    },
  });
};
