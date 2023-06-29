import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const updateTemplateGroups: MutationResolvers['updateTemplateGroups'] =
  async (parent, { templateId, addTo, removeFrom }) => {
    await prisma.groupOnTemplate.createMany({
      data: addTo.map((groupId) => ({ groupId, templateId })),
    });
    await prisma.groupOnTemplate.deleteMany({
      where: {
        templateId,
        groupId: { in: removeFrom },
      },
    });
    return true;
  };
