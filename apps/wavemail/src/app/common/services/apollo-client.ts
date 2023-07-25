import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GQL_ERRORS } from '@waveditors/utils';
import { authStore, getToken } from '../../auth';
import { getEnvValue } from './env-variables';

const httpLink = createHttpLink({
  uri: `${getEnvValue('NX_BACKEND_URL')}/graphql`,
});

const authLink = setContext(() => {
  const token = getToken(authStore.getValue());
  if (!token) return {};
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
});
const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) return;
  graphQLErrors.some((gqlError) => {
    if (gqlError.extensions.code === GQL_ERRORS.UNAUTHORIZED) {
      authStore.actions.logout();
      return true;
    }
    return false;
  });
});

export const client = new ApolloClient({
  link: from([
    new RetryLink({
      delay: {
        initial: 500,
      },
      attempts: {
        max: 3,
      },
    }),
    errorLink,
    authLink,
    httpLink,
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Template: {
        keyFields: ['id'],
      },
      TemplateVersion: {
        keyFields: ['id'],
      },
    },
  }),
});
