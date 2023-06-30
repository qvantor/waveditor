/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TemplateQueryVariables = Types.Exact<{
  templateId: Types.Scalars['Int']['input'];
}>;

export type TemplateQuery = {
  __typename?: 'Query';
  template: {
    __typename?: 'Template';
    id: number;
    name: string;
    userId: number;
    versions?: Array<{
      __typename?: 'TemplateVersion';
      id: number;
      json: any;
    }> | null;
  };
};

export const TemplateDocument = gql`
  query Template($templateId: Int!) {
    template(id: $templateId) {
      id
      name
      userId
      versions(limit: 1) {
        id
        json
      }
    }
  }
`;

/**
 * __useTemplateQuery__
 *
 * To run a query within a React component, call `useTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplateQuery({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useTemplateQuery(
  baseOptions: Apollo.QueryHookOptions<TemplateQuery, TemplateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TemplateQuery, TemplateQueryVariables>(
    TemplateDocument,
    options
  );
}
export function useTemplateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TemplateQuery,
    TemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TemplateQuery, TemplateQueryVariables>(
    TemplateDocument,
    options
  );
}
export type TemplateQueryHookResult = ReturnType<typeof useTemplateQuery>;
export type TemplateLazyQueryHookResult = ReturnType<
  typeof useTemplateLazyQuery
>;
export type TemplateQueryResult = Apollo.QueryResult<
  TemplateQuery,
  TemplateQueryVariables
>;
