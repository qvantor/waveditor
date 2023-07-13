/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TemplateVersionsQueryVariables = Types.Exact<{
  templateId: Types.Scalars['Int']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type TemplateVersionsQuery = {
  __typename?: 'Query';
  template: {
    __typename?: 'Template';
    id: number;
    name: string;
    versions?: Array<{
      __typename?: 'TemplateVersion';
      id: number;
      name?: string | null;
      json: any;
      updatedAt: string;
      creator?: {
        __typename?: 'User';
        id: number;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    }> | null;
  };
};

export const TemplateVersionsDocument = gql`
  query TemplateVersions($templateId: Int!, $limit: Int, $cursor: Int) {
    template(id: $templateId) {
      id
      name
      versions(limit: $limit, cursor: $cursor) {
        id
        name
        json
        updatedAt
        creator {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

/**
 * __useTemplateVersionsQuery__
 *
 * To run a query within a React component, call `useTemplateVersionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplateVersionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplateVersionsQuery({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useTemplateVersionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    TemplateVersionsQuery,
    TemplateVersionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TemplateVersionsQuery, TemplateVersionsQueryVariables>(
    TemplateVersionsDocument,
    options
  );
}
export function useTemplateVersionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TemplateVersionsQuery,
    TemplateVersionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TemplateVersionsQuery,
    TemplateVersionsQueryVariables
  >(TemplateVersionsDocument, options);
}
export type TemplateVersionsQueryHookResult = ReturnType<
  typeof useTemplateVersionsQuery
>;
export type TemplateVersionsLazyQueryHookResult = ReturnType<
  typeof useTemplateVersionsLazyQuery
>;
export type TemplateVersionsQueryResult = Apollo.QueryResult<
  TemplateVersionsQuery,
  TemplateVersionsQueryVariables
>;
