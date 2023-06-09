import { Resolvers } from '../../common/types/gql.g';
import { prisma } from '../../app';
import { prismaToGql } from '../../common/services';

export const Template: Resolvers['Template'] = {
  creator: async (parent, args, { services: { user } }) =>
    prismaToGql(await user.getUserById(parent.userId)),
  versions: async (parent, args) =>
    prisma.templateVersion
      .findMany({
        where: { templateId: parent.id },
        orderBy: { createdAt: 'asc' },
        take: args.limit ?? undefined,
      })
      .then((result) => result.map(prismaToGql)),
};
