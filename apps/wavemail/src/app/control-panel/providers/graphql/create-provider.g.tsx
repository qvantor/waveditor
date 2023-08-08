/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProviderMutationVariables = Types.Exact<{
  provider: Types.CreateProvider;
}>;

export type CreateProviderMutation = {
  __typename?: 'Mutation';
  createProvider: {
    __typename?: 'Provider';
    id: number;
    type: Types.ProviderType;
    name: string;
    config: any;
  };
};

export const CreateProviderDocument = gql`
  mutation CreateProvider($provider: CreateProvider!) {
    createProvider(provider: $provider) {
      id
      type
      name
      config
    }
  }
`;
export type CreateProviderMutationFn = Apollo.MutationFunction<
  CreateProviderMutation,
  CreateProviderMutationVariables
>;

/**
 * __useCreateProviderMutation__
 *
 * To run a mutation, you first call `useCreateProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProviderMutation, { data, loading, error }] = useCreateProviderMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useCreateProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProviderMutation,
    CreateProviderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProviderMutation,
    CreateProviderMutationVariables
  >(CreateProviderDocument, options);
}
export type CreateProviderMutationHookResult = ReturnType<
  typeof useCreateProviderMutation
>;
export type CreateProviderMutationResult =
  Apollo.MutationResult<CreateProviderMutation>;
export type CreateProviderMutationOptions = Apollo.BaseMutationOptions<
  CreateProviderMutation,
  CreateProviderMutationVariables
>;
