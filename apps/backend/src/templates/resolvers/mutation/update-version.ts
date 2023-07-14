import {
  MutationResolvers,
  MutationUpdateVersionArgs,
} from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';
import { checkUserTemplateBasePermission } from '../../services';

const versionMaxAgeInSec = 10 * 60;

// create new version if version older than versionMaxAgeInSec
const updateVersionLogic = async (
  data: MutationUpdateVersionArgs & { userId: number }
) => {
  const { templateId, userId, json } = data;
  const version = await prisma.templateVersion.findFirst({
    where: { templateId, userId },
    orderBy: { updatedAt: 'desc' },
  });
  if (!version) return prisma.templateVersion.create({ data });
  const versionAgeInSec =
    (new Date().getTime() - version.updatedAt.getTime()) / 1000;
  if (versionAgeInSec > versionMaxAgeInSec) {
    const count = await prisma.templateVersion.count({ where: { templateId } });
    return prisma.templateVersion.create({
      data: { ...data, name: `Version ${count + 1}` },
    });
  }
  return prisma.templateVersion.update({
    where: { id: version.id },
    data: { json, updatedAt: new Date() },
  });
};

export const updateVersion: MutationResolvers['updateVersion'] = async (
  parent,
  args,
  { user }
) => {
  await checkUserTemplateBasePermission(user.id, args.templateId);
  return prismaToGql(await updateVersionLogic({ ...args, userId: user.id }));
};
