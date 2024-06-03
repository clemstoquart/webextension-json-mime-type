import eslint from '@eslint/js';
import globals from 'globals';

export default [
    eslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.webextensions,
                ...globals.jest,
                ...globals.node,
            }
        }
    },
    {
        files: ['**/*.js'],
        rules: {
            indent: [
                'error',
                4
            ],
            'linebreak-style': [
                'error',
                'unix'
            ],
            quotes: [
                'error',
                'single'
            ],
            semi: [
                'error',
                'always'
            ],
            'no-console': 0,
            'curly': 'error',
            'eqeqeq': 'error',
        }
    },
    {
        ignores: ['package-lock.json', '.idea/*', 'web-ext-artifacts/*']
    }
];
