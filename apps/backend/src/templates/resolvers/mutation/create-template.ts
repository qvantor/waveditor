import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const createTemplate: MutationResolvers['createTemplate'] = (
  parent,
  args,
  { user }
) =>
  prisma.template.create({
    data: {
      creator: {
        connect: { id: user.id },
      },
      name: `${user.firstName} ${user.lastName} untitled template`,
      versions: {
        create: [{ json: args.data.json, userId: user.id }],
      },
    },
  });
