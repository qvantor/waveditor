import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Context } from '../context';

export const loggerPlugin = (): ApolloServerPlugin => ({
  serverWillStart: async (service) => {
    service.logger.info(`Server starting...`);
  },
  requestDidStart: async (
    requestContext: GraphQLRequestContext<Context>
  ): Promise<GraphQLRequestListener<Context> | void> => {
    requestContext.logger.debug({
      query: requestContext.request.query,
      variables: requestContext.request.variables,
      user: requestContext.contextValue.user?.id,
    });
  },
});
