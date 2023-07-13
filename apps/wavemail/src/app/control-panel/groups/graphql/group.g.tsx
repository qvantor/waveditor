/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupQueryVariables = Types.Exact<{
  groupId: Types.Scalars['Int']['input'];
}>;

export type GroupQuery = {
  __typename?: 'Query';
  group: {
    __typename?: 'Group';
    id: number;
    createdAt: string;
    name: string;
    users?: Array<{
      __typename?: 'User';
      id: number;
      firstName?: string | null;
      lastName?: string | null;
    }> | null;
  };
};

export const GroupDocument = gql`
  query Group($groupId: Int!) {
    group(id: $groupId) {
      id
      createdAt
      name
      users {
        id
        firstName
        lastName
      }
    }
  }
`;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupQuery(
  baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupQuery, GroupQueryVariables>(
    GroupDocument,
    options
  );
}
export function useGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(
    GroupDocument,
    options
  );
}
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<
  GroupQuery,
  GroupQueryVariables
>;
