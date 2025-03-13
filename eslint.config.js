// eslint.config.js
import eslint from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import nextPlugin from '@next/eslint-plugin-next';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default [
    eslint.configs.recommended,
    {
        // TypeScript configuration
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': {
                rules: {
                    // Your TypeScript rules
                    '@typescript-eslint/no-unused-vars': 'off',
                    '@typescript-eslint/explicit-module-boundary-types': 'off',
                    '@typescript-eslint/no-var-requires': 'off',
                    '@typescript-eslint/ban-ts-comment': 'off',
                }
            }
        }
    },
    {
        // React/Next.js configuration
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            'jsx-a11y': jsxA11yPlugin,
            react: {
                rules: {
                    'react/react-in-jsx-scope': 'off',
                    'react/prop-types': 'off',
                    'react/no-unescaped-entities': 'off'
                }
            }
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    },
    {
        // Next.js specific rules
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        ...nextPlugin.configs.recommended,
        ...nextPlugin.configs['core-web-vitals']
    },
    {
        // Import plugin rules
        plugins: {
            import: importPlugin
        },
        rules: {
            // Add any import plugin rules here
        }
    },
    prettierPlugin,
    {
        rules: {
            // Shared rules
            'jsx-a11y/anchor-is-valid': [
                'error',
                {
                    components: ['Link'],
                    specialLink: ['hrefLeft', 'hrefRight'],
                    aspects: ['invalidHref', 'preferButton'],
                },
            ],
        }
    },
    {
        ignores: [
            "logs.json",
            "node_modules/",
            "dist/",
            // Add other ignore patterns from your .eslintignore
        ]
    }
];