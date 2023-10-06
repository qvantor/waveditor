import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const createTag: MutationResolvers['createTag'] = async (
  _,
  { name },
  { user }
) => prisma.tag.create({ data: { name, userId: user.id } });
