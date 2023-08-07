import { renderToString } from '@waveditors/layout-render';
import { EditorSnapshot } from '@waveditors/editor-model';
import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';
import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { Provider } from '../../../common/services';

export const sendEmail: QueryResolvers['sendEmail'] = async (
  _,
  { data: { providerId, templateId, to, subject, from, fromName } },
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
  if (!provider)
    throw new GraphQLError('No email sending provider found', {
      extensions: { code: GQL_ERRORS.BAD_USER_INPUT },
    });
  if (!template)
    throw new GraphQLError(`No template with id ${templateId} found`, {
      extensions: { code: GQL_ERRORS.BAD_USER_INPUT },
    });
  const providerInstance = providers[provider.type] as Provider<unknown>;
  if (!providerInstance.check(provider.config))
    throw new GraphQLError(`Provider ${provider.name} config is invalid`, {
      extensions: { code: GQL_ERRORS.BAD_USER_INPUT },
    });

  const [lastVersion] = template.versions;
  // const content = `<b>Hello world<b/>`;
  const content = renderToString(lastVersion.json as unknown as EditorSnapshot);

  return await providerInstance.sendEmail(
    {
      to,
      content,
      subject,
      from: from ?? undefined,
      fromName: fromName ?? undefined,
    },
    provider.config
  );
};
