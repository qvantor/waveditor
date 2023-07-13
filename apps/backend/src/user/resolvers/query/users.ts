import { QueryResolvers } from '../../../common/types/gql.g';
import { prismaToGql } from '../../../common/services';
import { prisma } from '../../../app';

export const users: QueryResolvers['users'] = async (parent, args) => {
  const users = await prisma.user.findMany({
    where: { id: { notIn: args?.filter?.ids ?? [] } },
  });
  return users.map(prismaToGql);
};
