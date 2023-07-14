import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const group: QueryResolvers['group'] = async (_, { id }) => {
  const group = await prisma.group.findUniqueOrThrow({
    where: { id },
  });
  return prismaToGql(group);
};
