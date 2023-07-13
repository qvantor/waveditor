/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVersionMutationVariables = Types.Exact<{
  templateId: Types.Scalars['Int']['input'];
  json: Types.Scalars['JSON']['input'];
}>;

export type UpdateVersionMutation = {
  __typename?: 'Mutation';
  updateVersion: {
    __typename?: 'TemplateVersion';
    id: number;
    json: any;
    updatedAt: string;
  };
};

export const UpdateVersionDocument = gql`
  mutation UpdateVersion($templateId: Int!, $json: JSON!) {
    updateVersion(templateId: $templateId, json: $json) {
      id
      json
      updatedAt
    }
  }
`;
export type UpdateVersionMutationFn = Apollo.MutationFunction<
  UpdateVersionMutation,
  UpdateVersionMutationVariables
>;

/**
 * __useUpdateVersionMutation__
 *
 * To run a mutation, you first call `useUpdateVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVersionMutation, { data, loading, error }] = useUpdateVersionMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      json: // value for 'json'
 *   },
 * });
 */
export function useUpdateVersionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateVersionMutation,
    UpdateVersionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateVersionMutation,
    UpdateVersionMutationVariables
  >(UpdateVersionDocument, options);
}
export type UpdateVersionMutationHookResult = ReturnType<
  typeof useUpdateVersionMutation
>;
export type UpdateVersionMutationResult =
  Apollo.MutationResult<UpdateVersionMutation>;
export type UpdateVersionMutationOptions = Apollo.BaseMutationOptions<
  UpdateVersionMutation,
  UpdateVersionMutationVariables
>;
