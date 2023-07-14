import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const addUsersToGroup: MutationResolvers['addUsersToGroup'] = async (
  parent,
  { groupId, users }
) => {
  const data = users.map((userId) => ({ groupId, userId }));
  await prisma.userOnGroup.createMany({ data });
  return true;
};
