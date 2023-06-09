/* eslint-disable */
import * as Types from '../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TemplatesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TemplatesQuery = {
  __typename?: 'Query';
  templates: Array<{
    __typename?: 'Template';
    id: number;
    name: string;
    creator?: {
      __typename?: 'User';
      firstName?: string | null;
      lastName?: string | null;
    } | null;
    versions?: Array<{
      __typename?: 'TemplateVersion';
      name?: string | null;
      json: any;
      createdAt: string;
    }> | null;
  }>;
};

export const TemplatesDocument = gql`
  query Templates {
    templates {
      id
      name
      creator {
        firstName
        lastName
      }
      versions(limit: 1) {
        name
        json
        createdAt
      }
    }
  }
`;

/**
 * __useTemplatesQuery__
 *
 * To run a query within a React component, call `useTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTemplatesQuery(
  baseOptions?: Apollo.QueryHookOptions<TemplatesQuery, TemplatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TemplatesQuery, TemplatesQueryVariables>(
    TemplatesDocument,
    options
  );
}
export function useTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TemplatesQuery,
    TemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TemplatesQuery, TemplatesQueryVariables>(
    TemplatesDocument,
    options
  );
}
export type TemplatesQueryHookResult = ReturnType<typeof useTemplatesQuery>;
export type TemplatesLazyQueryHookResult = ReturnType<
  typeof useTemplatesLazyQuery
>;
export type TemplatesQueryResult = Apollo.QueryResult<
  TemplatesQuery,
  TemplatesQueryVariables
>;
