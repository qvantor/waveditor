import { GraphQLError } from 'graphql';
import { GQL_ERRORS } from '@waveditors/utils';
import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const createProvider: MutationResolvers['createProvider'] = async (
  parent,
  { provider: { name, config, type } },
  { user, services: { providers } }
) => {
  const providerClass = providers[type];
  const validation = providerClass.validate(config);
  if (validation.length)
    throw new GraphQLError('Incorrect provider config', {
      extensions: {
        code: GQL_ERRORS.BAD_USER_INPUT,
        validation,
      },
    });
  const provider = await prisma.provider.create({
    data: {
      name,
      config: providerClass.toJSON(config),
      type,
      creator: {
        connect: { id: user.id },
      },
    },
  });
  return prismaToGql(provider);
};
