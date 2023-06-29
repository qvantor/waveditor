import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const setGroupName: MutationResolvers['setGroupName'] = async (
  parent,
  { name, groupId }
) =>
  prismaToGql(
    await prisma.group.update({
      where: { id: groupId },
      data: { name },
    })
  );
