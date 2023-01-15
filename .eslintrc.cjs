// SPDX-FileCopyrightText: 2022 Johannes Loher
// SPDX-FileCopyrightText: 2022 David Archibald
//
// SPDX-License-Identifier: MIT

module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    extraFileExtensions: ['.cjs', '.mjs'],
    sourceType: 'module',
  },

  env: {
    browser: true,
  },

  extends: ['eslint:recommended', '@typhonjs-fvtt/eslint-config-foundry.js/0.8.0', 'plugin:prettier/recommended'],

  plugins: [],

  rules: {
    // Specify any specific ESLint rules.
  },

  overrides: [
    {
      files: ['./*.js', './*.cjs', './*.mjs'],
      env: {
        node: true,
      },
    },
  ],
};
