/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProviderMutationVariables = Types.Exact<{
  updateProviderId: Types.Scalars['Int']['input'];
  provider: Types.CreateProvider;
}>;

export type UpdateProviderMutation = {
  __typename?: 'Mutation';
  updateProvider: {
    __typename?: 'Provider';
    id: number;
    name: string;
    type: Types.ProviderType;
    config: any;
  };
};

export const UpdateProviderDocument = gql`
  mutation UpdateProvider($updateProviderId: Int!, $provider: CreateProvider!) {
    updateProvider(id: $updateProviderId, provider: $provider) {
      id
      name
      type
      config
    }
  }
`;
export type UpdateProviderMutationFn = Apollo.MutationFunction<
  UpdateProviderMutation,
  UpdateProviderMutationVariables
>;

/**
 * __useUpdateProviderMutation__
 *
 * To run a mutation, you first call `useUpdateProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProviderMutation, { data, loading, error }] = useUpdateProviderMutation({
 *   variables: {
 *      updateProviderId: // value for 'updateProviderId'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useUpdateProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProviderMutation,
    UpdateProviderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProviderMutation,
    UpdateProviderMutationVariables
  >(UpdateProviderDocument, options);
}
export type UpdateProviderMutationHookResult = ReturnType<
  typeof useUpdateProviderMutation
>;
export type UpdateProviderMutationResult =
  Apollo.MutationResult<UpdateProviderMutation>;
export type UpdateProviderMutationOptions = Apollo.BaseMutationOptions<
  UpdateProviderMutation,
  UpdateProviderMutationVariables
>;
