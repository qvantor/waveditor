import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const templates: QueryResolvers['templates'] = (parent, args, context) =>
  prisma.template.findMany({
    where: { userId: context.user.id },
  });
