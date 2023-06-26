import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';

export const to = async <T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (e) {
    return [null, e as Error];
  }
};
export const prismaToApolloError = (e: Error) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return new GraphQLError('Operation error', {
      extensions: { code: GQL_ERRORS.OPERATION_ERROR, ...e.meta },
    });
  }
  return new GraphQLError('INTERNAL_SERVER_ERROR', {
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
  });
};
