# Vue • Formatting

Use `v-on` and `v-bind` instead of shorthands `@` and `:`

    <img v-bind:src="banner.thumbnail_url" v-bind:alt="banner.title" />

Stick to the following order of props

    ref v-if v-for v-on v-bind [...] class type placeholder title

Avoid using `v-if` and `v-for` on the same component.

    <template v-if="items">
        <div v-for="item in items" v-bind:key="item.uid">
            {{ item.title }}
        </div>
    </template>

A simple directive value stays bare; a compound one is wrapped in
parentheses. Every directive — `v-if`, `v-else-if`, `v-show`, `v-on`, `v-bind`:

    <template v-if="is_ready">
        It is ready
    </template>

    <template v-if="(is_loading_fonts || is_loading_images)">
        Loading fonts or images...
    </template>

    <div v-bind:class="(compact ? 'narrow' : 'wide')" />

Simple is a single identifier, member access, method call, template literal, or
unary negation — `v-if="ready"`, `v-if="!ready"`, `v-bind:items="selection.items"`.
Compound is anything carrying a binary operator or a ternary.
