import { GraphQLError, GraphQLSchema, defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GQL_ERRORS } from '@waveditors/utils';
import { Context } from '../context';

const AUTH_NAME = 'auth';

export const authDirective = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, AUTH_NAME);
      if (!directive) return fieldConfig;

      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = (source, args, context: Context, info) => {
        if (!context.user)
          throw new GraphQLError('Unauthorized', {
            extensions: { code: GQL_ERRORS.UNAUTHORIZED },
          });
        return resolve(source, args, context, info);
      };

      return fieldConfig;
    },
  });
