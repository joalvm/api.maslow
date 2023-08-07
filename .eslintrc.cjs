module.exports = {
    env: { node: true, browser: true, es2022: true, jest: true },
    extends: [
        'eslint:recommended',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            tsx: true,
        },
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'prettier',
        'simple-import-sort',
        'unused-imports',
        'react-refresh',
    ],
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
        react: {
            version: '18.x',
        },
    },
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/react-in-jsx-scope': 'off',
        'spaced-comment': 'error',
        'no-duplicate-imports': 'error',
        'react/jsx-uses-react': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'react/no-unescaped-entities': ['off'],
        'react-hooks/exhaustive-deps': 'off',
        'react/prop-types': 0,
        'react/display-name': 0,
        'simple-import-sort/imports': 'warn',
        '@typescript-eslint/no-empty-function': 'off',
        'react/no-unknown-property': 'off',
        'react/no-unescaped-entities ': 'off',
        'react/no-array-index-key': 'off',
        'class-methods-use-this': 'off',
        'prettier/prettier': 'off',
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false,
            },
        ],
    },
};
