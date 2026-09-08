# Vue • Components

Component options keep one order:

    props
    inject
    provide
    mixins
    data
    computed
    watch
    methods
    mounted
    created
    beforeDestroy

## Event handlers

An event handler is named after the UI part it is bound to:

    <button v-on:click="click_approve">
        Approve
    </button>

    <button v-on:click="click_some_long_name_here">
        Some long name here
    </button>

For icons, after the icon:

    <button v-on:click="click_icon_archive">
        <svg-icon-archive />
    </button>

    <button v-on:click="click_icon_ai_analyze">
        <svg-icon-ai-analyze />
    </button>

⚠️ After the text or icon is changed, rename the corresponding event handler.
