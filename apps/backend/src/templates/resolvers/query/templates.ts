import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const templates: QueryResolvers['templates'] = (parent, args, context) =>
  prisma.template
    .findMany({
      where: { userId: context.user.id },
      include: {
        versions: {
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
      },
    })
    .then((result) =>
      result
        .sort(
          (a, b) =>
            b.versions[0].updatedAt.getTime() -
            a.versions[0].updatedAt.getTime()
        )
        .map(({ versions: _, ...rest }) => rest)
    );
