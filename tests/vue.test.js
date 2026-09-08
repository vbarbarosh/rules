const plugin = require('../src');
const test = require('node:test');
const vue_parser = require('vue-eslint-parser');
const {RuleTester} = require('eslint');

RuleTester.describe = test.describe;
RuleTester.it = test.it;

const tester = new RuleTester({languageOptions: {parser: vue_parser, ecmaVersion: 'latest', sourceType: 'module'}});

tester.run('vue-class-order', plugin.rules['vue-class-order'], {
    valid: [
        '<template><div class="flex-row-c gap5 ph10 pv5 w100 br4 fs11 fw5 lh12 nowrap app-shadow #-foo #-active" /></template>',
        '<template><div class="rel flex-row flex-align-center gap10 mt10 ww hh oh cur-pointer uc #-foo" /></template>',
        '<template><div class="fs12 modal-hotkeys--key el-popper" /></template>',
        '<template><div class="db w80 h80 br4 fit-cover cur-pointer app-background #-preset-img" /></template>',
        '<template><div class="fluid p30 xpt app-scrollbars-light #-grid" /></template>',
        '<template><div class="abs t0 l10n w100 z2 xborder-ht white o75 ellipsis" /></template>',
        '<template><div class="w20 h20 flex-static bn-color-gray1" /></template>',
        '<template><div class="xfw w150 flex-noshrink" /></template>',
        '<template><div class="fw5 fs14 lh22 vm nowrap" /></template>',
        '<template><div class="w35 r" /></template>',
        '<template><div class="bn-border xborder-ht" /></template>',
        '<template><div class="xm ml5" /><div class="m5 xml" /></template>',
        '<template><div v-bind:class="[\'flex-row-c\', \'gap5\', \'app-shadow\', active ? \'#-foo\' : \'#-bar\']" /></template>',
        '<template><div v-bind:class="{\'app-shadow\': shadow, \'#-foo\': active}" /></template>',
        {code: '<template><div class="custom-shadow #-foo" /></template>', options: [{app_prefixes: ['custom-']}]},
        {code: '<template><div v-bind:class="classes" /></template>', options: [{check_dynamic: false}]},
    ],
    invalid: [
        {code: '<template><div class="#-foo app-shadow" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="flex-align-center mt10 flex-row" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="ww oh mt10" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="uc cur-pointer" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="lh22 fs14" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="mt10 z2 ph5" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="app-shadow w100" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div class="pv5 ph10" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div v-bind:class="active ? \'#-foo app-shadow\' : \'app-shadow #-bar\'" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div v-bind:class="[\'#-foo\', \'app-shadow\']" /></template>', errors: [{messageId: 'order'}]},
        {code: '<template><div v-bind:class="classes" /></template>', errors: [{messageId: 'dynamic'}]},
        {code: '<template><div v-bind:class="{[name]: enabled}" /></template>', errors: [{messageId: 'dynamic'}]},
    ],
});

tester.run('vue-layout-classes', plugin.rules['vue-layout-classes'], {
    valid: [
        '<template><div class="flex-row-c gap5 app-shadow #-foo" /></template>',
        '<template><div class="grid-foo gap5" /><div class="flex-col gap10" /></template>',
        '<template><div class="hsplit"><div class="fluid" /></div></template>',
        '<template><div class="flex-row"><template v-if="ready"><div class="flex-fluid" /></template></div></template>',
        '<template><div class="mg5" /></template>',
        {code: '<template><div class="my-layout gap5" /></template>', options: [{layout_patterns: ['^my-layout$']}]},
        '<template><div class="flex-row flex-align-center flex-justify-between gap10" /></template>',
        '<template><div class="flex-row-center flex-justify-between gap8 min-w0 nowrap" /></template>',
    ],
    invalid: [
        {code: '<template><div class="gap5" /></template>', errors: [{messageId: 'gap'}]},
        {code: '<template><div class="flex-row-c app-shadow gap5" /></template>', errors: [{messageId: 'gap'}]},
        {code: '<template><div class="flex-row flex-align-center mt10 gap10" /></template>', errors: [{messageId: 'gap'}]},
        {code: '<template><div class="flex-align-center gap10" /></template>', errors: [{messageId: 'gap'}]},
        {code: '<template><div class="flex-col mg5 mi5" /></template>', errors: [{messageId: 'margin'}, {messageId: 'margin'}]},
        {code: '<template><div class="flex-row"><div class="fluid" /></div></template>', errors: [{messageId: 'fluid'}]},
        {code: '<template><div class="vsplit"><div class="flex-fluid" /></div></template>', errors: [{messageId: 'fluid'}]},
        {code: '<template><div v-bind:class="[ready && \'flex-row\', \'gap5\']" /></template>', errors: [{messageId: 'gap'}]},
    ],
});

tester.run('vue-hashtag-syntax', plugin.rules['vue-hashtag-syntax'], {
    valid: [
        '<template><div class="#-foo" popper-class="#-popper" card_class="#-card" /></template>',
        '<template><div v-bind:class="{\'#-foo\': ready}" /></template>',
        '<script>document.querySelector(\'.#-foo\');</script>',
    ],
    invalid: [
        {code: '<template><div class=\'#-foo\' /></template>', errors: [{messageId: 'template'}]},
        {code: '<template><div class = "#-foo" /></template>', errors: [{messageId: 'template'}]},
        {code: '<template><div class-name="#-foo" /></template>', errors: [{messageId: 'template'}]},
        {code: '<script>const cls = \'#-foo\';</script>', errors: [{messageId: 'script'}]},
        {code: '<script>document.querySelector(".#-foo");</script>', errors: [{messageId: 'script'}]},
        {code: '<script>document.querySelector(\'.#-foo .#-bar\');</script>', errors: [{messageId: 'script'}]},
        {code: '<script>const cls = `#-${state}`;</script>', errors: [{messageId: 'script'}]},
    ],
});

tester.run('vue-local-class-style', plugin.rules['vue-local-class-style'], {
    valid: [
        '<template><div class="#-foo" /></template><style>.#-foo { color: red; }</style>',
        '<template><div class="#-foo" /></template><style lang="sass">\n.#-foo\n    @include app-border-b\n</style>',
        '<template><div class="#-foo" /></template><style lang="scss">.#-foo { &:hover { color: red; } }</style>',
        '<template><div class="#-foo-bar" /></template><style lang="sass">\n.#-foo\n    &-bar\n        color: red\n</style>',
        '<template><div class="#-foo" /></template><style>@media (min-width: 1px) { .#-foo, .#-bar { color: red; } }</style>',
        '<template><div class="#-foo" /></template><style>.global { color: red; }</style><style scoped>.#-foo { color: blue; }</style>',
        '<template><div v-bind:class="{\'#-active\': active}" /></template><style>.#-active { opacity: 1; }</style>',
        '<template><div class="gap5 app-shadow" /></template>',
        '<script>document.querySelector(\'.#-foo\');</script><style>.#-foo { color: red; }</style>',
        '<template><div class="#-foo" /></template><style lang="sass">\n.#-foo\n    animation: pulse 1s\n@keyframes pulse\n    0%, 50%\n        opacity: 0\n    100%\n        opacity: 1\n</style>',
        '<template><div class="#-foo" /></template><style>.#-foo { animation: pulse 1s; } @-webkit-keyframes pulse { 0% { opacity: 0; } 100% { opacity: 1; } }</style>',
        '<template><div class="#-foo" /></template><style lang="scss">.#-foo { animation: pulse 1s; } @keyframes pulse { 0% { opacity: 0; } 100% { opacity: 1; } }</style>',
        '<template><div class="gap5" /></template><style lang="sass">\n@for $i from 1 through 3\n    .gap#{$i}\n        gap: #{$i}px\n</style>',
        '<template><div class="gap5" /></template><style src="./style.css" />',
    ],
    invalid: [
        {code: '<template><div class="#-foo" /></template>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style lang="sass">\n@for $i from 1 through 3\n    .gap#{$i}\n        gap: #{$i}px\n</style>', errors: [{messageId: 'parse'}]},
        {code: '<template><div class="#-foo" /></template><style>.#-foo { /* empty */ }</style>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style>/* .#-foo {} */ .bar { content: ".#-foo"; }</style>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style>.bar:not(.#-foo) { color: red; }</style>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style lang="scss">.#-foo { &-bar { color: red; } }</style>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style lang="sass">\n.#-foo\n    $unused: red\n</style>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style src="./style.css" />', errors: [{messageId: 'parse'}]},
        {code: '<template><div class="#-foo" /></template><style lang="less">.#-foo { color: red; }</style>', errors: [{messageId: 'parse'}]},
        {code: '<template><div class="#-foo" /></template><style>.#-foo {', errors: [{messageId: 'parse'}]},
        {code: '<script>document.querySelector(\'.#-foo\');</script>', errors: [{messageId: 'missing'}]},
        {code: '<template><div class="#-foo" /></template><style lang="scss">@mixin unused { .#-foo { color: red; } }</style>', errors: [{messageId: 'missing'}]},
    ],
});

tester.run('vue-style-conventions', plugin.rules['vue-style-conventions'], {
    valid: [
        '<style lang="sass">\n.#-foo\n    @include app-transition(color)\n    color: red\n    &:hover\n        color: blue\n</style>',
        '<style lang="scss">@import "base"; .#-foo { @include app-transition-fast(color); color: red; }</style>',
        '<style lang="scss">@mixin app-transition($props...) { transition: $props; }</style>',
        '<style lang="scss">.#-foo:hover, .#-foo.active { @include app-transition(color); }</style>',
        '<style lang="sass">\n$size: 10px\n@include smx(\'xp\')\n@include smx(\'xm\')\n</style>',
        '<style lang="sass">\n.#-foo\n    $size: 10px\n    @include app-border-b\n    width: $size\n</style>',
        '<style lang="scss">@mixin app-card { color: red; @include app-border-b; }</style>',
        {code: '<style lang="scss">@mixin bn-transition($props...) { transition: $props; }</style>', options: [{app_prefixes: ['bn-']}]},
        {code: '<style lang="scss">.#-foo { @include bn-transition-fast(color); color: red; }</style>', options: [{app_prefixes: ['bn-', 'app-']}]},
    ],
    invalid: [
        {code: '<style lang="sass">\n.#-foo\n    color: red\n    @include app-transition(color)\n</style>', errors: [{messageId: 'include'}]},
        {code: '<style lang="scss">.#-foo { color: red; @include app-border-b; }</style>', errors: [{messageId: 'include'}]},
        {code: '<style>.foo { transition: all 1s; }</style>', errors: [{messageId: 'transition', data: {mixin: 'app-transition'}}]},
        {code: '<style>.foo { transition: all 1s; }</style>', options: [{app_prefixes: ['bn-']}], errors: [{messageId: 'transition', data: {mixin: 'bn-transition'}}]},
        {code: '<style lang="scss">@mixin app-transition($props...) { transition: $props; }</style>', options: [{app_prefixes: ['bn-']}], errors: [{messageId: 'transition', data: {mixin: 'bn-transition'}}]},
        {code: '<style lang="scss">.#-foo { @include bn-transition(all); }</style>', options: [{app_prefixes: ['bn-']}], errors: [{messageId: 'all'}]},
        {code: '<style lang="scss">.#-foo { @include app-transition(all); }</style>', errors: [{messageId: 'all'}]},
        {code: '<style lang="scss">.foo { color: red; } @import "base";</style>', errors: [{messageId: 'import'}]},
    ],
});
