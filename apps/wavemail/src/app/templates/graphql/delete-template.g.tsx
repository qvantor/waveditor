/* eslint-disable */
import * as Types from '../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteTemplateMutationVariables = Types.Exact<{
  templateId: Types.Scalars['Int']['input'];
}>;

export type DeleteTemplateMutation = {
  __typename?: 'Mutation';
  deleteTemplate: boolean;
};

export const DeleteTemplateDocument = gql`
  mutation DeleteTemplate($templateId: Int!) {
    deleteTemplate(templateId: $templateId)
  }
`;
export type DeleteTemplateMutationFn = Apollo.MutationFunction<
  DeleteTemplateMutation,
  DeleteTemplateMutationVariables
>;

/**
 * __useDeleteTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTemplateMutation, { data, loading, error }] = useDeleteTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useDeleteTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTemplateMutation,
    DeleteTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteTemplateMutation,
    DeleteTemplateMutationVariables
  >(DeleteTemplateDocument, options);
}
export type DeleteTemplateMutationHookResult = ReturnType<
  typeof useDeleteTemplateMutation
>;
export type DeleteTemplateMutationResult =
  Apollo.MutationResult<DeleteTemplateMutation>;
export type DeleteTemplateMutationOptions = Apollo.BaseMutationOptions<
  DeleteTemplateMutation,
  DeleteTemplateMutationVariables
>;
