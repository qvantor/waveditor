/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProvidersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProvidersQuery = {
  __typename?: 'Query';
  providers: Array<{
    __typename?: 'Provider';
    id: number;
    type: Types.ProviderType;
    name: string;
    active?: boolean | null;
    createdAt: string;
    updatedAt: string;
    config: any;
    creator?: {
      __typename?: 'User';
      id: number;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  }>;
};

export const ProvidersDocument = gql`
  query Providers {
    providers {
      id
      type
      name
      active
      createdAt
      updatedAt
      config
      creator {
        id
        firstName
        lastName
      }
    }
  }
`;

/**
 * __useProvidersQuery__
 *
 * To run a query within a React component, call `useProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useProvidersQuery(
  baseOptions?: Apollo.QueryHookOptions<ProvidersQuery, ProvidersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProvidersQuery, ProvidersQueryVariables>(
    ProvidersDocument,
    options
  );
}
export function useProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProvidersQuery,
    ProvidersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProvidersQuery, ProvidersQueryVariables>(
    ProvidersDocument,
    options
  );
}
export type ProvidersQueryHookResult = ReturnType<typeof useProvidersQuery>;
export type ProvidersLazyQueryHookResult = ReturnType<
  typeof useProvidersLazyQuery
>;
export type ProvidersQueryResult = Apollo.QueryResult<
  ProvidersQuery,
  ProvidersQueryVariables
>;
