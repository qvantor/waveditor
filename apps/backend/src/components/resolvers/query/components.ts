import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const components: QueryResolvers['components'] = async (_, { tags }) => {
  const tagFilter =
    tags?.map((tag) => ({
      tags: { some: { tagId: { equals: tag } } },
    })) ?? [];
  const list = await prisma.component.findMany({
    where: {
      AND: tagFilter,
    },
  });
  return list.map(prismaToGql);
};
