import type { CodegenConfig } from '@graphql-codegen/cli';

const eslintIgnore = {
  add: {
    content: '/* eslint-disable */',
  },
};

const config: CodegenConfig = {
  schema: './apps/backend/src/**/*.graphql',
  documents: 'apps/wavemail/src/app',
  generates: {
    // Backend
    'apps/backend/src/common/types/gql.g.ts': {
      plugins: [eslintIgnore, 'typescript', 'typescript-resolvers'],
      config: {
        contextType: '../../app#Context',
        useIndexSignature: true,
        mappers: {
          Role: '@prisma/client#PRole',
          ProviderType: '@prisma/client#PProviderType',
        },
      },
    },

    // Frontend
    'apps/wavemail/src/app/common/types/gql.g.ts': {
      plugins: [eslintIgnore, 'typescript'],
    },
    'apps/wavemail/src/app': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.g.tsx',
        baseTypesPath: 'common/types/gql.g.ts',
      },
      plugins: [
        eslintIgnore,
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};
export default config;
