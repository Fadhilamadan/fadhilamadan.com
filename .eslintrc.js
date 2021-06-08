module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    // simple import rules
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',

    // react rules
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/jsx-sort-props': ['warn', { reservedFirst: ['key'] }],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    // other rules
    'no-void': 'off',
    'require-await': 'off',
    'max-lines-per-function': 'off',
  },
};
