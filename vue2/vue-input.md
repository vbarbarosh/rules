# Vue • Inputs

In general, anything which takes data from an user is called **input**
and should work as a normal **INPUT** element:

1. it should take data from `value` property
2. it should emit **input** event
3. it should respect **disabled** state
4. it should respect `readonly` attribute
5. it should react to clicks on associated **LABEL** element
6. it should react to mouse hover events from associated **LABEL** element
7. it should inject and use `bn_form_input_id` value
8. it should get focus using *TAB* key

Avoid generic **inputs** (those with a lot of properties like `min`,
`max`, `step`, etc).
