import { GraphQLError } from 'graphql';
import { GQL_ERRORS } from '@waveditors/utils';
import { MutationResolvers } from '../../../common/types/gql.g';
import { prisma } from '../../../app';
import { prismaToGql } from '../../../common/services';

export const updateProvider: MutationResolvers['updateProvider'] = async (
  parent,
  { id, provider: { name, config, type } },
  { services: { providers } }
) => {
  const validation = providers[type].validate(config);
  if (validation.length)
    throw new GraphQLError('Incorrect provider config', {
      extensions: {
        code: GQL_ERRORS.BAD_USER_INPUT,
        validation,
      },
    });

  const provider = await prisma.provider.update({
    where: { id },
    data: {
      name,
      config,
      type,
      updatedAt: new Date(),
    },
  });
  return prismaToGql(provider);
};
