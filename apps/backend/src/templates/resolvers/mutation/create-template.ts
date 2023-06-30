import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const createTemplate: MutationResolvers['createTemplate'] = async (
  parent,
  args,
  { user }
) => {
  const count = await prisma.template.count({ where: { userId: user.id } });
  return prisma.template.create({
    data: {
      creator: {
        connect: { id: user.id },
      },
      name: `${user.firstName} ${user.lastName} template ${count + 1}`,
      versions: {
        create: [{ json: args.data.json, userId: user.id, name: 'Version 1' }],
      },
    },
  });
};
