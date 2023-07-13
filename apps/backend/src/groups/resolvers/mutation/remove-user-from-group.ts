import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const removeUserFromGroup: MutationResolvers['removeUserFromGroup'] =
  async (parent, args) => {
    await prisma.userOnGroup.delete({
      where: { groupId_userId: args },
    });
    return true;
  };
