import { Resolvers } from '../../common/types/gql.g';
import { prisma } from '../../app';

export const Component: Resolvers['Component'] = {
  tags: async (parent) =>
    await prisma.tag.findMany({
      where: { components: { some: { componentId: parent.id } } },
    }),
};
