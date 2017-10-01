module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'webextensions': true,
        'mocha': true,
        'node': true
    },
    'plugins': [
        'json',
        'mocha',
        'promise'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:promise/recommended'
    ],
    'rules': {
        'mocha/handle-done-callback': 2,
        'mocha/max-top-level-suites': 2,
        'mocha/no-exclusive-tests': 2,
        'mocha/no-global-tests': 2,
        'mocha/no-identical-title': 2,
        'mocha/no-mocha-arrows': 2,
        'mocha/no-return-and-callback': 2,
        'mocha/no-skipped-tests': 0,
        'mocha/no-sibling-hooks': 2,
        'mocha/no-top-level-hooks': 2,
        'mocha/valid-suite-description': 2,
        'mocha/valid-test-description': 2,

        'promise/avoid-new': 'off',

        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'curly': 'error',
        'eqeqeq': 'error'
    }
};
