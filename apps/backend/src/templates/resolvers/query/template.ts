import { GraphQLError } from 'graphql';
import { GQL_ERRORS } from '@waveditors/utils';
import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const template: QueryResolvers['template'] = async (
  parent,
  args,
  context
) => {
  const template = await prisma.template.findFirst({
    where: { id: args.id, creator: { id: context.user.id } },
  });
  if (!template)
    throw new GraphQLError('Template not found', {
      extensions: { code: GQL_ERRORS.NOT_FOUND },
    });
  return template;
};
