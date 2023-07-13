/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveUserFromGroupMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  groupId: Types.Scalars['Int']['input'];
}>;

export type RemoveUserFromGroupMutation = {
  __typename?: 'Mutation';
  removeUserFromGroup: boolean;
};

export const RemoveUserFromGroupDocument = gql`
  mutation RemoveUserFromGroup($userId: Int!, $groupId: Int!) {
    removeUserFromGroup(userId: $userId, groupId: $groupId)
  }
`;
export type RemoveUserFromGroupMutationFn = Apollo.MutationFunction<
  RemoveUserFromGroupMutation,
  RemoveUserFromGroupMutationVariables
>;

/**
 * __useRemoveUserFromGroupMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromGroupMutation, { data, loading, error }] = useRemoveUserFromGroupMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useRemoveUserFromGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveUserFromGroupMutation,
    RemoveUserFromGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveUserFromGroupMutation,
    RemoveUserFromGroupMutationVariables
  >(RemoveUserFromGroupDocument, options);
}
export type RemoveUserFromGroupMutationHookResult = ReturnType<
  typeof useRemoveUserFromGroupMutation
>;
export type RemoveUserFromGroupMutationResult =
  Apollo.MutationResult<RemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationOptions = Apollo.BaseMutationOptions<
  RemoveUserFromGroupMutation,
  RemoveUserFromGroupMutationVariables
>;
