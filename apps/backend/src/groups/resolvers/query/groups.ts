import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const groups: QueryResolvers['groups'] = async (_, { templateId }) => {
  const where = templateId
    ? { template: { some: { templateId: { equals: templateId } } } }
    : {};
  const groupList = await prisma.group.findMany({
    orderBy: { createdAt: 'desc' },
    where,
  });
  return groupList.map(prismaToGql);
};
