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

## Splitting an app into components

A piece the screen shows in more than one place is a component of its own,
used in each place. A badge is the common case: a small pill that says a
state, as In progress, No reply yet, Filing, New, Done, Draft or Pinned.

Never the same markup and classes copied into every place that shows it:

    <span class="flex-row-cl gap5 ph10 br999 fs12 nowrap #-reply #-reply-working">
        <span class="#-pulse" />
        In progress {{ detail }}
    </span>

One component, used everywhere:

    <badge-in-progress v-bind:detail="detail" />

A component is named kind first, `<kind>-<what it says>`, as icons are
`svg-icon-*`. Sorted by name, a kind sits together:

    badge-filing
    badge-in-progress
    badge-no-reply

What changes from place to place goes in as a prop: a count (`3 new`), a
time (`for 4 h`), a plan's progress (`3/6`). A variant is a suffix,
`badge-in-progress-sm`, never a second copy written by hand.

The look a kind shares comes from one Sass mixin; each component sets only
its own colours:

    .#-root
        @include app-badge
        background: var(--accent-soft)
        color: var(--accent)

⚠️ With the badge copied into eight places, a change of its mark reached some
of them and missed the others. One component per badge is one change, seen
everywhere.
