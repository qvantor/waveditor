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
        orderBy: { createdAt: 'desc' },
        take: args.limit ?? undefined,
        cursor: args.cursor ? { id: args.cursor } : undefined,
        include: { creator: {} },
      })
      .then((result) =>
        result.map((version) => ({
          ...prismaToGql(version),
          creator: prismaToGql(version.creator),
        }))
      ),
};
