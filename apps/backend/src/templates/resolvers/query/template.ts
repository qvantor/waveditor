import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const template: QueryResolvers['template'] = (parent, args) =>
  prisma.template.findUniqueOrThrow({
    where: { id: args.id },
  });
