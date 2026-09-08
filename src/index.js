const block_layout = require('./rules/block_layout');
const error_name = require('./rules/error_name');
const imports_sorted = require('./rules/imports_sorted');
const operator_spacing = require('./rules/operator_spacing');
const return_out = require('./rules/return_out');
const style_processor = require('./style_processor');
const tiny_arrows = require('./rules/tiny_arrows');
const vue_class_order = require('./rules/vue_class_order');
const vue_hashtag_syntax = require('./rules/vue_hashtag_syntax');
const vue_layout_classes = require('./rules/vue_layout_classes');
const vue_local_class_style = require('./rules/vue_local_class_style');
const vue_style_conventions = require('./rules/vue_style_conventions');

module.exports = {
    meta: {name: '@vbarbarosh/rules', version: '0.1.0'},
    processors: {styles: style_processor},
    rules: {
        'block-layout': block_layout,
        'error-name': error_name,
        'imports-sorted': imports_sorted,
        'operator-spacing': operator_spacing,
        'return-out': return_out,
        'tiny-arrows': tiny_arrows,
        'vue-class-order': vue_class_order,
        'vue-hashtag-syntax': vue_hashtag_syntax,
        'vue-layout-classes': vue_layout_classes,
        'vue-local-class-style': vue_local_class_style,
        'vue-style-conventions': vue_style_conventions,
    },
};
