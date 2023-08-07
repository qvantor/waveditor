import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const setActiveProvider: MutationResolvers['setActiveProvider'] = async (
  _,
  { providerId, active = true }
) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.provider.updateMany({
      where: { active: true },
      data: { active: null },
    });
    return await tx.provider.update({
      where: { id: providerId },
      data: { active: active ? true : null },
    });
  });
  return prismaToGql(result);
};
