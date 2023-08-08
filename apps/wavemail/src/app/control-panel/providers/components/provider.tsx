import { Drawer, Select, Input as AntInput, Button, notification } from 'antd';
import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { GQL_ERRORS } from '@waveditors/utils';
import { font, tokens } from '@waveditors/theme';
import { Input } from '../../../common/components';
import { CreateProvider, ProviderType } from '../../../common/types/gql.g';
import { maxLength, required, validate } from '../../../common/services';
import { useProvidersQuery } from '../graphql/providers.g';
import { useUpdateProviderMutation } from '../graphql/update-provider.g';
import { useCreateProviderMutation } from '../graphql/create-provider.g';

interface Props {
  id: number | null;
  onClose: () => void;
}

const TypesOptions = Object.values(ProviderType).map((value) => ({
  value,
  label: value,
}));

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: space-between;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ValidationError = styled.div`
  color: ${tokens.color.text.danger};

  ${font({ size: 'smallest' })}
`;

const extractValidationErrors = (error: ApolloError) => {
  const validationError = error.graphQLErrors.find(
    (error) =>
      error.extensions.code === GQL_ERRORS.BAD_USER_INPUT &&
      error.extensions.validation
  );
  return (
    (validationError?.extensions.validation as Array<[string, string]>) ?? [
      ['', error.message],
    ]
  );
};
const validateProvider = (
  state: CreateProvider
): [CreateProvider, null] | [null, string] => {
  try {
    return [
      {
        ...state,
        config: JSON.parse(state.config),
      },
      null,
    ];
  } catch (e) {
    return [null, 'Config is invalid json'];
  }
};
export const Provider = ({ id, onClose }: Props) => {
  const { data: providers } = useProvidersQuery();
  const [createProvider, { loading: creating, error: cError }] =
    useCreateProviderMutation();
  const [updateProvider, { loading: updating, error: uError }] =
    useUpdateProviderMutation();
  const error = cError ?? uError;
  const initial = useMemo(() => {
    const provider = providers?.providers.find(
      (provider) => provider.id === id
    );
    return {
      name:
        provider?.name ?? `Provider ${(providers?.providers.length ?? 0) + 1}`,
      type: provider?.type ?? TypesOptions[0].value,
      config: JSON.stringify(provider?.config) ?? '',
    };
  }, [providers, id]);
  const [state, setState] = useState(initial);
  const onValueUpdate = useCallback(
    (key: 'name' | 'type' | 'config') => (value?: string) =>
      setState((prev) => ({ ...prev, [key]: value })),
    []
  );
  const onSubmit = useCallback(async () => {
    const [provider, error] = validateProvider(state);
    if (!provider)
      return notification.error({
        placement: 'topRight',
        type: 'error',
        message: error,
      });
    if (id)
      await updateProvider({
        variables: { updateProviderId: id, provider },
      });
    else await createProvider({ variables: { provider } });
    onClose();
  }, [state, id, updateProvider, createProvider, onClose]);
  return (
    <Drawer open title={state.name} onClose={onClose} closable={false}>
      <DrawerContent>
        <Form>
          <Input
            placeholder='Name'
            validate={validate(required, maxLength(16))}
            value={state.name}
            onChange={onValueUpdate('name')}
          />
          <Select
            style={{ width: '100%' }}
            options={TypesOptions}
            onSelect={(option) => onValueUpdate('type')(option)}
            placeholder='Type'
            size='small'
            value={state.type}
          />
          <AntInput.TextArea
            style={{ height: 220 }}
            placeholder='Config (JSON)'
            value={state.config}
            onChange={(e) => onValueUpdate('config')(e.target.value)}
          />
          {error &&
            extractValidationErrors(error).map(([key, value]) => (
              <ValidationError key={key}>
                <b>{key}:</b> {value}
              </ValidationError>
            ))}
        </Form>
        <Button
          type='primary'
          onClick={onSubmit}
          disabled={creating || updating}
        >
          {id ? 'Update' : 'Create'}
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
