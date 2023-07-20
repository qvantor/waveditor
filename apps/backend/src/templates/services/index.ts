import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';
import { Prisma } from '@prisma/client';
import { prisma } from '../../app';

export { TemplatesService } from './templates-service';

const isUserTemplateOwner = async (userId: number, templateId: number) => {
  // try {
  const template = await prisma.template.findUniqueOrThrow({
    where: { id: templateId },
  });
  return { template, owner: template.userId === userId };
  // } catch (e) {
  //   console.log(e instanceof Prisma.PrismaClientInitializationError);
  //   return { template: {}, owner: true } as any;
  // }
};

const NoTemplateAccessError = new GraphQLError('No access to template', {
  extensions: { code: GQL_ERRORS.FORBIDDEN },
});

// critical permission - to share and delete template, only owner has
export const checkUserTemplateCriticalPermission = async (
  userId: number,
  templateId: number
) => {
  const { template, owner } = await isUserTemplateOwner(userId, templateId);
  if (!owner) throw NoTemplateAccessError;
  return template;
};

// edit permission - to rename, update versions, owner and group members has
export const checkUserTemplateBasePermission = async (
  userId: number,
  templateId: number
) => {
  const { template, owner } = await isUserTemplateOwner(userId, templateId);
  // its owner proceed
  if (owner) return template;
  const userTemplate = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      group: {
        where: {
          group: {
            template: { some: { templateId } },
          },
        },
      },
    },
  });
  // check if any group share permission to this template
  if (userTemplate.group.length === 0) throw NoTemplateAccessError;
  return template;
};
