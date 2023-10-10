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
import { groupResolver } from './groups';
import { providerResolver } from './providers';
import { emailsResolver } from './emails';
import { componentResolver } from './components';
import {
  Context,
  context,
  authDirective,
  logger,
  loggerPlugin,
  formatError,
} from './app';

const resolvers: Resolvers = [
  authResolver,
  userResolver,
  templateResolver,
  groupResolver,
  providerResolver,
  emailsResolver,
  componentResolver,
  { JSON: GraphQLJSON },
];
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, '../../../src'), {
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
  formatError,
  plugins: [loggerPlugin()],
});

startStandaloneServer(server, {
  listen: { port: 5555 },
  context: async (request) => context(request),
});
