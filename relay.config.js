module.exports = {
  artifactDirectory: 'src/queries/__generated__',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  extensions: ['ts', 'tsx'],
  language: 'typescript',
  schema: './src/schema/__generated__/schema.graphql',
  src: './src',
};
