import { GQL_ERRORS } from '@waveditors/utils';
import { GraphQLError } from 'graphql/index';
import { ApolloError } from '@apollo/client';

export type GQL_ERROR = keyof typeof GQL_ERRORS;
export type Handler = {
  error: Array<GQL_ERROR> | '*';
  handle: (error: GraphQLError) => void;
};

export const handleError = (handlers: Handler[]) => (error: ApolloError) =>
  error.graphQLErrors.find((error) => {
    const handler = handlers.find((handler) => {
      if (handler.error === '*') return true;
      return handler.error.includes(error.extensions?.code as GQL_ERROR);
    });
    if (handler) handler.handle(error);
    return Boolean(handler);
  });
