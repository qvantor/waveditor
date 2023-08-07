import { renderToString } from '@waveditors/layout-render';
import { EditorSnapshot } from '@waveditors/editor-model';
import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';

export const sendEmail: QueryResolvers['sendEmail'] = async (
  _,
  { data: { providerId, templateId, to, subject, from } },
  { services: { providers } }
) => {
  const provider = providerId
    ? await prisma.provider.findUnique({ where: { id: providerId } })
    : await prisma.provider.findFirst({ where: { active: true } });
  const template = await prisma.template.findUnique({
    where: { id: templateId },
    include: {
      versions: {
        take: 1,
        orderBy: { updatedAt: 'desc' },
      },
    },
  });
  if (!provider || !template) return false;
  const [lastVersion] = template.versions;
  const content = renderToString(lastVersion.json as unknown as EditorSnapshot);
  const providerInstance = providers[provider.type];
  if (!providerInstance.check(provider.config)) return false;

  return await providerInstance.sendEmail(
    { to, content, subject, from: from ?? undefined },
    provider.config
  );
};
