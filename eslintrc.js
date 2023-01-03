module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    project: './tsconfig.eslint.json',
  },
  rules: {
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-var': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
