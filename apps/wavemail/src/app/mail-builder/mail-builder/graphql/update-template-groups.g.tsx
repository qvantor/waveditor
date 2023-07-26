/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTemplateGroupsMutationVariables = Types.Exact<{
  templateId: Types.Scalars['Int']['input'];
  addTo: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  removeFrom:
    | Array<Types.Scalars['Int']['input']>
    | Types.Scalars['Int']['input'];
}>;

export type UpdateTemplateGroupsMutation = {
  __typename?: 'Mutation';
  updateTemplateGroups: boolean;
};

export const UpdateTemplateGroupsDocument = gql`
  mutation UpdateTemplateGroups(
    $templateId: Int!
    $addTo: [Int!]!
    $removeFrom: [Int!]!
  ) {
    updateTemplateGroups(
      templateId: $templateId
      addTo: $addTo
      removeFrom: $removeFrom
    )
  }
`;
export type UpdateTemplateGroupsMutationFn = Apollo.MutationFunction<
  UpdateTemplateGroupsMutation,
  UpdateTemplateGroupsMutationVariables
>;

/**
 * __useUpdateTemplateGroupsMutation__
 *
 * To run a mutation, you first call `useUpdateTemplateGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTemplateGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTemplateGroupsMutation, { data, loading, error }] = useUpdateTemplateGroupsMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      addTo: // value for 'addTo'
 *      removeFrom: // value for 'removeFrom'
 *   },
 * });
 */
export function useUpdateTemplateGroupsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTemplateGroupsMutation,
    UpdateTemplateGroupsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTemplateGroupsMutation,
    UpdateTemplateGroupsMutationVariables
  >(UpdateTemplateGroupsDocument, options);
}
export type UpdateTemplateGroupsMutationHookResult = ReturnType<
  typeof useUpdateTemplateGroupsMutation
>;
export type UpdateTemplateGroupsMutationResult =
  Apollo.MutationResult<UpdateTemplateGroupsMutation>;
export type UpdateTemplateGroupsMutationOptions = Apollo.BaseMutationOptions<
  UpdateTemplateGroupsMutation,
  UpdateTemplateGroupsMutationVariables
>;
