import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const deleteProvider: MutationResolvers['deleteProvider'] = async (
  parent,
  { providerId }
) => {
  await prisma.provider.delete({ where: { id: providerId } });
  return true;
};
