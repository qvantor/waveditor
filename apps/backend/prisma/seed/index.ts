import { PrismaClient } from '@prisma/client';
import { ADMIN_EMAILS } from '../../src/common/constants/env-const';
import TAGS from './seeds/tags';
import COMPONENTS from './seeds/components';
import TAG_ON_COMPONENTS from './seeds/tagOnComponent';

const admins = ADMIN_EMAILS.split(',');
const prisma = new PrismaClient();
const createTags = async (userId: number) => {
  await prisma.tag.createMany({
    data: TAGS.map((tag) => ({ ...tag, userId })),
  });
  console.log(`${TAGS.length} tags created`);
};

const createComponents = async (userId: number) => {
  await prisma.component.createMany({
    data: COMPONENTS.map((component) => ({
      ...component,
      userId,
    })),
  });
  console.log(`${COMPONENTS.length} components created`);
  await prisma.tagOnComponent.createMany({ data: TAG_ON_COMPONENTS });
  console.log(`${TAG_ON_COMPONENTS.length} tagOnComponent created`);
};

const main = async () => {
  const admin =
    (await prisma.user.findUnique({ where: { email: admins[0] } })) ??
    (await prisma.user.create({
      data: {
        firstName: '',
        lastName: '',
        email: admins[0],
        role: 'ADMIN',
      },
    }));
  await createTags(admin.id);
  await createComponents(admin.id);
};

main().then(() => {
  console.log('DB seed success!');
});
