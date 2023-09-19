/* eslint-disable */
export default {
  displayName: 'editor-model',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    // '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
    // https://github.com/nrwl/nx/issues/12046#issuecomment-1493464137
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/editor-model',
};
