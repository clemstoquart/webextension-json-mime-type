module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'webextensions': true,
        'node': true
    },
    'plugins': [
        'json',
        'promise'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:promise/recommended'
    ],
    'rules': {
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
