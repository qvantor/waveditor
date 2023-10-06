import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';
import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const deleteComponent: MutationResolvers['deleteComponent'] = async (
  _,
  { id },
  { user }
) => {
  const isOwner = await prisma.component.findFirst({
    where: { id, userId: user.id },
  });
  if (!isOwner)
    throw new GraphQLError('Forbidden', {
      extensions: { code: GQL_ERRORS.FORBIDDEN },
    });
  await prisma.component.delete({ where: { id } });
  return true;
};
