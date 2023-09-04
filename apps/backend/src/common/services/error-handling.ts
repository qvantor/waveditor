import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';
import { Reporter } from 'io-ts/Reporter';
import { fold } from 'fp-ts/Either';
import { Context } from 'io-ts';

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

function stringify(v: unknown): string {
  if (typeof v === 'number' && !isFinite(v)) {
    if (isNaN(v)) {
      return 'NaN';
    }
    return v > 0 ? 'Infinity' : '-Infinity';
  }
  return JSON.stringify(v);
}
const getKey = (context: Context) =>
  context.find((entry) => entry.key !== '') || null;
export const formatReport: Reporter<
  Array<[key: string, error: string]>
>['report'] = fold(
  (errors) =>
    errors.reduce<Array<[string, string]>>((sum, error) => {
      const entry = getKey(error.context);
      if (!entry) return sum;
      return [
        ...sum,
        [
          entry.key,
          error.message ??
            `Invalid value ${stringify(error.value)}, should be ${
              entry.type.name
            }`,
        ],
      ];
    }, []),
  () => []
);
