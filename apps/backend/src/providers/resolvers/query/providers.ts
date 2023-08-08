import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const providers: QueryResolvers['providers'] = async () => {
  const providers = await prisma.provider.findMany({
    orderBy: { updatedAt: 'desc' },
  });
  return providers.map(prismaToGql);
};
