# Vue • Global methods

Each Vue component will be provided with the following methods:

* `px(value)` for formatting pixel values
* `uid([name])` for making ids unique across components (i.e. when two components call `uid('foo')` they will get two distinct ids) 
* `emit_end(retval)` for returning value from modal
* `emit_input(value)` for returning value from input

```
Vue.mixin({
    methods: {
        px: function (v) {
            return v ? `${v}px` : 0;
        },
        // Generated ids are bound to current element. They are
        // necessary for `id` and `label[for]` attributes. Name
        // `uid` was chosen to not conflict with `id` attribute
        // which naturally can be specified for each element.
        // https://github.com/vuejs/vue/issues/5886
        // https://github.com/vuejs/vue/issues/4958
        uid: function (name) {
            return name ? `c${this._uid}_${name}` : `c${this._uid}`;
        },
        // for modals
        emit_end: function (retval) {
            this.$emit('end', retval);
        },
        // for inputs
        emit_input: function (v) {
            this.$emit('input', v);
        },
    },
});
```
