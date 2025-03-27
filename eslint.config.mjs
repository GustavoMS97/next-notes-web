// eslint.config.mjs
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginImport from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {}
})

const config = [
  ...compat.extends(
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals'
  ),

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json'
      }
    },
    plugins: {
      import: eslintPluginImport,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          paths: ['src']
        },
        alias: {
          map: [['@src', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        }
      }
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/semi': 'off',
      'import/newline-after-import': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@/quotes': ['error', 'single', { allowTemplateLiterals: true }],
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-shadow': ['error'],
      'max-len': ['error', { code: 140 }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/src/*', '.*', '../*', './*'],
              message: 'Use @src/ instead of relative imports'
            }
          ]
        }
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowAny: true,
          allowNullish: true
        }
      ],
      'import/no-relative-parent-imports': 'off',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
        }
      ],
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false
        }
      ],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always'
        }
      ]
    }
  }
]

export default config
