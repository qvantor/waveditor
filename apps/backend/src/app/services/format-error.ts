import { GraphQLError, GraphQLFormattedError } from 'graphql/index';
import { Prisma } from '@prisma/client';
import { GQL_ERRORS } from '@waveditors/utils';
import { EnvConst } from '../../common/constants';
import { logger } from './logger';

type PrismaError =
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientValidationError;

const isPrismaError = (error: unknown): error is PrismaError =>
  error instanceof Prisma.PrismaClientInitializationError ||
  error instanceof Prisma.PrismaClientKnownRequestError ||
  error instanceof Prisma.PrismaClientUnknownRequestError ||
  error instanceof Prisma.PrismaClientRustPanicError ||
  error instanceof Prisma.PrismaClientValidationError;

const formatPrismaError = (error: PrismaError): GraphQLFormattedError => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025')
      return {
        message: error.message,
        extensions: { code: GQL_ERRORS.NOT_FOUND },
      };
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      message: error.message,
      extensions: { code: GQL_ERRORS.OPERATION_ERROR },
    };
  }
  return {
    message: 'Internal server error',
    extensions: { code: GQL_ERRORS.INTERNAL_SERVER_ERROR },
  };
};

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: unknown
): GraphQLFormattedError => {
  logger.debug(error);
  if (EnvConst.IS_DEV) return formattedError;
  if (isPrismaError(error)) return formatPrismaError(error);

  if (error instanceof GraphQLError) {
    if (isPrismaError(error.originalError))
      return formatPrismaError(error.originalError);
  }
  return formattedError;
};
