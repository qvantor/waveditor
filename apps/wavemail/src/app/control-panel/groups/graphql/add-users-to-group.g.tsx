/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddUsersToGroupMutationVariables = Types.Exact<{
  users: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  groupId: Types.Scalars['Int']['input'];
}>;

export type AddUsersToGroupMutation = {
  __typename?: 'Mutation';
  addUsersToGroup: boolean;
};

export const AddUsersToGroupDocument = gql`
  mutation AddUsersToGroup($users: [Int!]!, $groupId: Int!) {
    addUsersToGroup(users: $users, groupId: $groupId)
  }
`;
export type AddUsersToGroupMutationFn = Apollo.MutationFunction<
  AddUsersToGroupMutation,
  AddUsersToGroupMutationVariables
>;

/**
 * __useAddUsersToGroupMutation__
 *
 * To run a mutation, you first call `useAddUsersToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersToGroupMutation, { data, loading, error }] = useAddUsersToGroupMutation({
 *   variables: {
 *      users: // value for 'users'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useAddUsersToGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUsersToGroupMutation,
    AddUsersToGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddUsersToGroupMutation,
    AddUsersToGroupMutationVariables
  >(AddUsersToGroupDocument, options);
}
export type AddUsersToGroupMutationHookResult = ReturnType<
  typeof useAddUsersToGroupMutation
>;
export type AddUsersToGroupMutationResult =
  Apollo.MutationResult<AddUsersToGroupMutation>;
export type AddUsersToGroupMutationOptions = Apollo.BaseMutationOptions<
  AddUsersToGroupMutation,
  AddUsersToGroupMutationVariables
>;
