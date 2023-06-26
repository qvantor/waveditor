import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const updateTemplate: MutationResolvers['updateTemplate'] = (
  _,
  { templateId, data }
) =>
  prisma.template.update({
    where: { id: templateId },
    data: {
      name: data.name ?? undefined,
    },
  });
