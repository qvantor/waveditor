import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const groups: QueryResolvers['groups'] = async () => {
  const groupList = await prisma.group.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return groupList.map(prismaToGql);
};
