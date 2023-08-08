/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetActiveProviderMutationVariables = Types.Exact<{
  providerId: Types.Scalars['Int']['input'];
}>;

export type SetActiveProviderMutation = {
  __typename?: 'Mutation';
  setActiveProvider: {
    __typename?: 'Provider';
    id: number;
    active?: boolean | null;
  };
};

export const SetActiveProviderDocument = gql`
  mutation SetActiveProvider($providerId: Int!) {
    setActiveProvider(providerId: $providerId) {
      id
      active
    }
  }
`;
export type SetActiveProviderMutationFn = Apollo.MutationFunction<
  SetActiveProviderMutation,
  SetActiveProviderMutationVariables
>;

/**
 * __useSetActiveProviderMutation__
 *
 * To run a mutation, you first call `useSetActiveProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetActiveProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setActiveProviderMutation, { data, loading, error }] = useSetActiveProviderMutation({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useSetActiveProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetActiveProviderMutation,
    SetActiveProviderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetActiveProviderMutation,
    SetActiveProviderMutationVariables
  >(SetActiveProviderDocument, options);
}
export type SetActiveProviderMutationHookResult = ReturnType<
  typeof useSetActiveProviderMutation
>;
export type SetActiveProviderMutationResult =
  Apollo.MutationResult<SetActiveProviderMutation>;
export type SetActiveProviderMutationOptions = Apollo.BaseMutationOptions<
  SetActiveProviderMutation,
  SetActiveProviderMutationVariables
>;
