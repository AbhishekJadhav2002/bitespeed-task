import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginSecurity from 'eslint-plugin-security'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { configs } from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

/** @type {import('eslint').Linter.Config} */
const eslintConfig = [
  ...configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginSecurity.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended'
  ),
  ...compat.plugins('unused-imports', 'perfectionist', 'import', 'security', 'jsx-a11y'),
  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname
    },
    rules: {
      // Perfectionist rules (sorting)
      'perfectionist/sort-named-imports': ['error', { type: 'alphabetical' }],
      'perfectionist/sort-named-exports': ['error', { type: 'alphabetical' }],
      'perfectionist/sort-exports': ['error', { type: 'alphabetical' }],
      'perfectionist/sort-interfaces': ['warn', { type: 'line-length' }],
      'perfectionist/sort-objects': ['warn', { type: 'line-length' }],
      'perfectionist/sort-object-types': ['error', { type: 'alphabetical' }],
      'perfectionist/sort-union-types': ['error', { type: 'alphabetical' }],

      // Security rules (enhanced from your config)
      'security/detect-object-injection': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-no-csrf-before-method-override': 'error',

      // Import rules
      'import/first': 'warn',
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-unresolved': 'off',
      'unused-imports/no-unused-imports': 'warn',

      // Unicorn rules
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-static-only-class': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-module': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // React rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'react/display-name': 'off',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',

      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error'
    },
    settings: {
      perfectionist: {
        partitionByComment: true,
        type: 'alphabetical'
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    ignorePatterns: ['*.config.mjs', '**/*.d.ts', 'node_modules', 'public', '.next', 'out', 'build']
  })
]

export default eslintConfig
