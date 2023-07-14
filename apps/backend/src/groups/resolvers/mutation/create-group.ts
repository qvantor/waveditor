import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const createGroup: MutationResolvers['createGroup'] = async (
  parent,
  args,
  { user }
) => {
  const count = await prisma.group.count();
  const name = args.name ?? `Group ${count + 1}`;
  const group = await prisma.group.create({
    data: {
      creator: {
        connect: { id: user.id },
      },
      user: { create: { userId: user.id } },
      name,
    },
  });
  return prismaToGql(group);
};
