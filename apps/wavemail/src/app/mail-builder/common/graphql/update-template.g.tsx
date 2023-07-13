/* eslint-disable */
import * as Types from '../../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTemplateMutationVariables = Types.Exact<{
  templateId: Types.Scalars['Int']['input'];
  data: Types.UpdateTemplate;
}>;

export type UpdateTemplateMutation = {
  __typename?: 'Mutation';
  updateTemplate: { __typename?: 'Template'; id: number; name: string };
};

export const UpdateTemplateDocument = gql`
  mutation UpdateTemplate($templateId: Int!, $data: UpdateTemplate!) {
    updateTemplate(templateId: $templateId, data: $data) {
      id
      name
    }
  }
`;
export type UpdateTemplateMutationFn = Apollo.MutationFunction<
  UpdateTemplateMutation,
  UpdateTemplateMutationVariables
>;

/**
 * __useUpdateTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTemplateMutation, { data, loading, error }] = useUpdateTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTemplateMutation,
    UpdateTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTemplateMutation,
    UpdateTemplateMutationVariables
  >(UpdateTemplateDocument, options);
}
export type UpdateTemplateMutationHookResult = ReturnType<
  typeof useUpdateTemplateMutation
>;
export type UpdateTemplateMutationResult =
  Apollo.MutationResult<UpdateTemplateMutation>;
export type UpdateTemplateMutationOptions = Apollo.BaseMutationOptions<
  UpdateTemplateMutation,
  UpdateTemplateMutationVariables
>;
