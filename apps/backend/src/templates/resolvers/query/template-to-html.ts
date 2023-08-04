import { renderToString } from '@waveditors/layout-render';
import { EditorSnapshot } from '@waveditors/editor-model';
import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const templateToHtml: QueryResolvers['templateToHtml'] = async (
  parent,
  { templateId }
) => {
  const template = await prisma.template.findUniqueOrThrow({
    where: { id: templateId },
    include: { versions: { take: 1, orderBy: { updatedAt: 'desc' } } },
  });
  const [lastVersion] = template.versions;
  return renderToString(lastVersion.json as unknown as EditorSnapshot);
};
