import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const tags: QueryResolvers['tags'] = async () =>
  await prisma.tag.findMany({
    orderBy: {
      components: { _count: 'desc' },
    },
  });
