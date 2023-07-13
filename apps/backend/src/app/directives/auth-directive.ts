import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GQL_ERRORS } from '@waveditors/utils';
import { PRole } from '@prisma/client';
import { Context } from '../context';

const AUTH_NAME = 'auth';
const ROLE_ARGUMENT = 'role';

export const authDirective = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, AUTH_NAME);
      if (!directive) return fieldConfig;

      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = (source, args, context: Context, info) => {
        // check if user with token
        if (!context.user)
          throw new GraphQLError('Unauthorized', {
            extensions: { code: GQL_ERRORS.UNAUTHORIZED },
          });

        // check roles
        const role = directive[0][ROLE_ARGUMENT] as PRole | undefined;
        if (role && role === PRole.ADMIN) {
          if (context.user.role !== PRole.ADMIN)
            throw new GraphQLError('Forbidden', {
              extensions: { code: GQL_ERRORS.FORBIDDEN },
            });
        }
        return resolve(source, args, context, info);
      };

      return fieldConfig;
    },
  });
