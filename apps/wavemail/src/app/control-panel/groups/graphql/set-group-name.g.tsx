/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetGroupNameMutationVariables = Types.Exact<{
  groupId: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
}>;

export type SetGroupNameMutation = {
  __typename?: 'Mutation';
  setGroupName: { __typename?: 'Group'; id: number; name: string };
};

export const SetGroupNameDocument = gql`
  mutation SetGroupName($groupId: Int!, $name: String!) {
    setGroupName(groupId: $groupId, name: $name) {
      id
      name
    }
  }
`;
export type SetGroupNameMutationFn = Apollo.MutationFunction<
  SetGroupNameMutation,
  SetGroupNameMutationVariables
>;

/**
 * __useSetGroupNameMutation__
 *
 * To run a mutation, you first call `useSetGroupNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetGroupNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setGroupNameMutation, { data, loading, error }] = useSetGroupNameMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSetGroupNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetGroupNameMutation,
    SetGroupNameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetGroupNameMutation,
    SetGroupNameMutationVariables
  >(SetGroupNameDocument, options);
}
export type SetGroupNameMutationHookResult = ReturnType<
  typeof useSetGroupNameMutation
>;
export type SetGroupNameMutationResult =
  Apollo.MutationResult<SetGroupNameMutation>;
export type SetGroupNameMutationOptions = Apollo.BaseMutationOptions<
  SetGroupNameMutation,
  SetGroupNameMutationVariables
>;
