import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

const TemplateInclude = {
  versions: {
    orderBy: { updatedAt: 'desc' },
    take: 1,
  },
} as const;
export const templates: QueryResolvers['templates'] = async (
  parent,
  args,
  { user }
) => {
  const userOwnTemplates = await prisma.template.findMany({
    where: { userId: user.id },
    include: TemplateInclude,
  });
  const userOwnTemplatesId = userOwnTemplates.map((template) => template.id);

  const userGroups = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    include: {
      group: { select: { groupId: true } },
    },
  });
  const userGroupsTemplates = await prisma.template.findMany({
    where: {
      group: { some: { OR: userGroups.group } },
      AND: { id: { notIn: userOwnTemplatesId } },
    },
    include: TemplateInclude,
  });
  return userOwnTemplates
    .concat(userGroupsTemplates)
    .sort(
      (a, b) =>
        b.versions[0].updatedAt.getTime() - a.versions[0].updatedAt.getTime()
    )
    .map(({ versions: _, ...rest }) => rest);
};
