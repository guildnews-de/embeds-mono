// @ts-check

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { globalIgnores } from 'eslint/config';

/** @type { import("typescript-eslint").Config } */
const config = tseslint.config([
  globalIgnores(['dist/*']),
  {
    ignores: ['.prettierrc.js', 'eslint.config.mjs'],
  },
  { settings: { react: { version: 'detect' } } },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, pluginReact },
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    extends: [
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      // tseslint.configs.recommendedTypeChecked,
      // tseslint.configs.stylisticTypeChecked,
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);

export default config;
