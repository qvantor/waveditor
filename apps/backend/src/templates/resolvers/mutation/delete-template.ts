import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { checkUserTemplateCriticalPermission } from '../../services';

export const deleteTemplate: MutationResolvers['deleteTemplate'] = async (
  parent,
  { templateId },
  { user }
) => {
  await checkUserTemplateCriticalPermission(user.id, templateId);
  await prisma.template.delete({ where: { id: templateId } });
  return true;
};
