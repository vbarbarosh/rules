const plugin = require('./index');
const stylistic = require('@stylistic/eslint-plugin');
const vue = require('eslint-plugin-vue');
const vue_parser = require('vue-eslint-parser');

function rules_config(options = {})
{
    const app_prefixes = options.app_prefixes || ['app-', 'vb-', 'np-'];
    return [
        {ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/vendor/**']},
        {
            files: ['**/*.{js,cjs,mjs,vue}'],
            plugins: {rules: plugin, '@stylistic': stylistic},
            languageOptions: {ecmaVersion: 'latest', sourceType: 'module'},
            rules: {
                'rules/imports-sorted': 'error',
                'rules/block-layout': 'error',
                'rules/tiny-arrows': 'error',
                'rules/error-name': 'error',
                'rules/return-out': 'error',
                'rules/operator-spacing': 'error',
                'curly': ['error', 'all'],
                'no-restricted-syntax': ['error',
                    {selector: 'DoWhileStatement', message: 'Use while or for instead of do...while.'},
                    {selector: ':matches(ClassDeclaration, ClassExpression):not([superClass])', message: 'Use plain data structures and named functions; a class exists only to extend one.'},
                    {selector: 'CallExpression[callee.type="MemberExpression"][callee.property.name="forEach"]', message: 'Use for...of instead of forEach.'},
                ],
                'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
                '@stylistic/indent': ['error', 4, {SwitchCase: 0}],
                '@stylistic/no-tabs': 'error',
                '@stylistic/space-before-function-paren': ['error', {anonymous: 'always', named: 'never', asyncArrow: 'always'}],
            },
        },
        {files: ['**/*.cjs'], languageOptions: {sourceType: 'commonjs'}},
        {
            files: ['**/*.vue'],
            plugins: {rules: plugin, vue},
            languageOptions: {parser: vue_parser, sourceType: 'module'},
            rules: {
                '@stylistic/indent': 'off',
                'vue/script-indent': ['error', 4, {baseIndent: 1, switchCase: 0}],
                'vue/v-bind-style': ['error', 'longform'],
                'vue/v-on-style': ['error', 'longform'],
                'vue/no-use-v-if-with-v-for': 'error',
                'rules/vue-class-order': ['error', {app_prefixes, check_dynamic: options.check_dynamic !== false}],
                'rules/vue-layout-classes': options.layout_patterns ? ['error', {layout_patterns: options.layout_patterns}] : 'error',
                'rules/vue-hashtag-syntax': 'error',
                'rules/vue-local-class-style': 'error',
                'rules/vue-style-conventions': ['error', {app_prefixes}],
            },
        },
        {
            files: ['**/*.{css,scss,sass}'],
            plugins: {rules: plugin},
            languageOptions: {parser: vue_parser},
            processor: 'rules/styles',
            rules: {'rules/vue-local-class-style': 'error', 'rules/vue-style-conventions': ['error', {app_prefixes}]},
        },
    ];
}

module.exports = rules_config;
