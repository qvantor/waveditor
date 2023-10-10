import { writeFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import 'dotenv';

const prisma = new PrismaClient({});

const genSeed = async (dbRequest: Promise<unknown[]>, name: string) => {
  const seed = await dbRequest;
  writeFileSync(
    `${__dirname}/seeds/${name}.ts`,
    `export default ` + JSON.stringify(seed)
  );
  console.log(`seed with ${seed.length} ${name} generated in file ${name}.ts`);
};
const main = async () => {
  await genSeed(
    prisma.tag.findMany({ select: { id: true, name: true } }),
    'tags'
  );
  await genSeed(prisma.component.findMany(), 'components');
  await genSeed(
    prisma.tagOnComponent.findMany({
      select: { tagId: true, componentId: true },
    }),
    'tagOnComponent'
  );
};

main();
