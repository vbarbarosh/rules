# Vue • SVG Icons

1. Put each SVG icon into its own `svg-icon-*.vue` file. It should
   contain only `TEMPLATE` element with `SVG` inside.
2. SVG icons should respect `currentColor` CSS property.

```
<template>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M81.25 37.5h3.125c1.725 0 3.125 1.4 3.125 3.125v56.25A3.125 3.125 0 0 1 84.375 100h-68.75a3.125 3.125 0 0 1-3.125-3.125v-56.25c0-1.725 1.4-3.125 3.125-3.125h3.125v-6.25A31.283 31.283 0 0 1 50 0a31.283 31.283 0 0 1 31.25 31.25v6.25zM50 6.25c-13.783 0-25 11.217-25 25v6.25h50v-6.25c0-13.783-11.217-25-25-25zm-31.25 37.5v50h62.5v-50h-62.5zm28.125 37.5V67.792A6.167 6.167 0 0 1 43.75 62.5a6.25 6.25 0 1 1 12.5 0 6.167 6.167 0 0 1-3.125 5.292V81.25h-6.25z" />
    </svg>
</template>
```
