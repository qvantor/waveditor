import path from 'path';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLJSON } from 'graphql-type-json';
import { pipe } from 'fp-ts/function';
import { Resolvers } from './common/types/gql.g';
import { userResolver } from './user';
import { authResolver } from './auth';
import { templateResolver } from './templates';
import { Context, context, authDirective, logger, loggerPlugin } from './app';

const resolvers: Resolvers = [
  authResolver,
  userResolver,
  templateResolver,
  { JSON: GraphQLJSON },
];

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, '../../../../../graphql'), {
    recursive: true,
  }),
  {
    throwOnConflict: true,
  }
);
const schema = pipe(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  authDirective
);

const server = new ApolloServer<Context>({
  schema,
  logger,
  plugins: [loggerPlugin()],
});

startStandaloneServer(server, {
  listen: { port: 5555 },
  context: async (request) => context(request),
});
