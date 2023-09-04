import { Lens } from 'monocle-ts';
import { EditorSnapshot } from '@waveditors/editor-model';
import { GraphQLError } from 'graphql/index';
import { GQL_ERRORS } from '@waveditors/utils';

const snapshotVariables = Lens.fromProp<EditorSnapshot>()('variables');

export const applyVariables = (
  variables: Record<string, unknown> | undefined
) =>
  snapshotVariables.modify((v) =>
    v.map((value) => {
      const newValue = (variables ?? {})[value.label] as unknown;
      if (newValue === undefined && value.required === true)
        throw new GraphQLError(`Missing variable: ${value.label}`, {
          extensions: { code: GQL_ERRORS.BAD_USER_INPUT },
        });

      return {
        ...value,
        defaultValue: (newValue as string) ?? value.defaultValue,
      };
    })
  );
