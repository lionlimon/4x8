/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-param-reassign": 0,
    "no-await-in-loop": "off",
    "no-underscore-dangle": "off",
    "vue/no-setup-props-destructure": "off",
    "max-classes-per-file": "off",
    "for-direction": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "class-methods-use-this": "off",
    "no-return-assign": "off",
    "curly": "error",
    "vue/require-explicit-emits": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "import/prefer-default-export": "off",
  },
  settings: {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./"
      },

      "alias": {
        "map": [
          ["@", "./src"]
        ],

        "extensions": [".js",".ts", ".vue", ".scss"]
      }
    }
  }
}
