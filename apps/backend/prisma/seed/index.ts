import { PrismaClient } from '@prisma/client';
import { ADMIN_EMAILS } from '../../src/common/constants/env-const';
import TAGS from './seeds/tags';
import COMPONENTS from './seeds/components';
import TAG_ON_COMPONENTS from './seeds/tagOnComponent';

const admins = ADMIN_EMAILS.split(',');
const prisma = new PrismaClient();
const createTags = async (userId: number) => {
  const idTable: Record<number, number> = {};
  for (const { id, name } of TAGS) {
    const tag = await prisma.tag.create({ data: { name, userId } });
    idTable[id] = tag.id;
  }
  console.log(`${TAGS.length} tags created`);
  return idTable;
};

const createComponents = async (
  userId: number,
  tagIdTable: Record<number, number>
) => {
  const idTable: Record<number, number> = {};
  for (const { id, ...component } of COMPONENTS) {
    const comp = await prisma.component.create({
      data: { ...component, userId },
    });
    idTable[id] = comp.id;
  }
  console.log(`${COMPONENTS.length} components created`);
  for (const relation of TAG_ON_COMPONENTS) {
    await prisma.tagOnComponent.create({
      data: {
        tagId: tagIdTable[relation.tagId],
        componentId: idTable[relation.componentId],
      },
    });
  }
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
  const tagsId = await createTags(admin.id);
  await createComponents(admin.id, tagsId);
};

main().then(() => {
  console.log('DB seed success!');
});
