import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const deleteGroup: MutationResolvers['deleteGroup'] = async (
  parent,
  { groupId }
) => {
  await prisma.group.delete({ where: { id: groupId } });
  return true;
};
