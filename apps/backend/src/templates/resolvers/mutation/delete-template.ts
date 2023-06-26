import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToApolloError, to } from '../../../common/services';

export const deleteTemplate: MutationResolvers['deleteTemplate'] = async (
  parent,
  { templateId }
) => {
  const [, err] = await to(
    prisma.template.delete({ where: { id: templateId } })
  );
  if (err) throw prismaToApolloError(err);
  return true;
};
