/* eslint-disable */
import * as Types from '../../common/types/gql.g';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTemplateMutationVariables = Types.Exact<{
  data: Types.CreateTemplate;
}>;

export type CreateTemplateMutation = {
  __typename?: 'Mutation';
  createTemplate: { __typename?: 'Template'; id: number };
};

export const CreateTemplateDocument = gql`
  mutation CreateTemplate($data: CreateTemplate!) {
    createTemplate(data: $data) {
      id
    }
  }
`;
export type CreateTemplateMutationFn = Apollo.MutationFunction<
  CreateTemplateMutation,
  CreateTemplateMutationVariables
>;

/**
 * __useCreateTemplateMutation__
 *
 * To run a mutation, you first call `useCreateTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTemplateMutation, { data, loading, error }] = useCreateTemplateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTemplateMutation,
    CreateTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTemplateMutation,
    CreateTemplateMutationVariables
  >(CreateTemplateDocument, options);
}
export type CreateTemplateMutationHookResult = ReturnType<
  typeof useCreateTemplateMutation
>;
export type CreateTemplateMutationResult =
  Apollo.MutationResult<CreateTemplateMutation>;
export type CreateTemplateMutationOptions = Apollo.BaseMutationOptions<
  CreateTemplateMutation,
  CreateTemplateMutationVariables
>;
