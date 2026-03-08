import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_ENDPOINT,
  documents: ['app/**/*.{ts,tsx}', 'features/**/*.{ts,tsx}', 'entities/**/*.{ts,tsx}'],
  generates: {
    'shared/api/__generated__/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
