# Vue • Global methods

Each Vue component will be provided with the following methods:

* `px(value)` for formatting pixel values
* `uid([name])` for making ids unique across components (i.e. when two components call `uid('foo')` they will get two distinct ids) 
* `emit_input(value)` for returning value from input

```
Vue.mixin({
    methods: {
        px: function (value) {
            return value ? `${value}px` : 0;
        },
        // Generated ids are bound to current element. They are
        // necessary for `id` and `label[for]` attributes. Name
        // `uid` was chosen to not conflict with `id` attribute
        // which naturally can be specified for each element.
        // https://github.com/vuejs/vue/issues/5886
        // https://github.com/vuejs/vue/issues/4958
        // `_uid` is a private Vue 2 internal; Vue 3 has no such field.
        uid: function (name) {
            return name ? `c${this._uid}_${name}` : `c${this._uid}`;
        },
        // for inputs
        emit_input: function (value) {
            this.$emit('input', value);
        },
    },
});
```
