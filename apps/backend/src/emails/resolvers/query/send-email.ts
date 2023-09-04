import { renderToString, applyVariables } from '@waveditors/layout-render';
import { EditorSnapshot } from '@waveditors/editor-model';
import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import { QueryResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { formatReport } from '../../../common/services';

// @todo move snap validation into the model lib
const Variable = t.type({
  id: t.string,
  type: t.union([t.literal('string'), t.literal('number')]),
  label: t.string,
  defaultValue: t.union([t.string, t.undefined]),
  required: t.union([t.boolean, t.undefined]),
});

const Snapshot = t.type({
  variables: t.array(Variable),
});

export const sendEmail: QueryResolvers['sendEmail'] = async (
  _,
  { data: { providerId, templateId, to, subject, from, fromName, variables } },
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
  const providerInstance = providers[provider.type];
  if (!providerInstance.check(provider.config))
    throw new GraphQLError(`Provider ${provider.name} config is invalid`, {
      extensions: { code: GQL_ERRORS.BAD_USER_INPUT },
    });

  const [lastVersion] = template.versions;
  const snap = Snapshot.decode(lastVersion.json);
  if (isLeft(snap))
    throw new GraphQLError(
      `Template ${template.id}, version ${lastVersion.id} is invalid`,
      {
        extensions: {
          code: GQL_ERRORS.OPERATION_ERROR,
          validation: formatReport(snap),
        },
      }
    );
  // const content = `<b>Hello world<b/>`;
  const content = renderToString(
    applyVariables(variables)(snap.right as EditorSnapshot)
  );

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
