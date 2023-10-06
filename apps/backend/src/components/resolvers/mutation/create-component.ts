import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const createComponent: MutationResolvers['createComponent'] = async (
  parent,
  { data: { tags, ...componentData } },
  { user }
) => {
  const component = await prisma.component.create({
    data: {
      ...componentData,
      userId: user.id,
    },
  });
  await prisma.tagOnComponent.createMany({
    data: tags.map((tagId) => ({ componentId: component.id, tagId })),
  });
  return prismaToGql(component);
};
