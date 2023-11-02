/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'no-param-reassign': ['error', { props: false }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'vue/no-setup-props-destructure': 'off',
    'max-classes-per-file': 'off',
    'for-direction': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'no-return-assign': 'off',
    curly: 'error',
    'vue/require-explicit-emits': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/prefer-default-export': 'off',
  },

  overrides: [
    {
      files: ['src/pages/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
