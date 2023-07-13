import { Resolvers } from '../../common/types/gql.g';
import { prismaToGql } from '../../common/services';
import { prisma } from '../../app';

export const Group: Resolvers['Group'] = {
  creator: async (parent, args, { services: { user } }) =>
    prismaToGql(await user.getUserById(parent.userId)),
  users: async (parent) => {
    const users = await prisma.user.findMany({
      where: { group: { some: { group: { id: parent.id } } } },
    });
    return users.map(prismaToGql);
  },
  usersCount: (parent) =>
    prisma.user.count({
      where: { group: { some: { group: { id: parent.id } } } },
    }),
  templatesCount: (parent) =>
    prisma.template.count({
      where: { group: { some: { groupId: parent.id } } },
    }),
};
