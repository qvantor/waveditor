import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const deleteTemplate: MutationResolvers['deleteTemplate'] = async (
  parent,
  { templateId }
) => {
  await prisma.template.delete({ where: { id: templateId } });
  return true;
};
