# Vue • Forms

Use `bn-form-div` and `bn-form-label` for composing forms.

    <div class="mg10">
        <bn-form-div class="flex-row mi10">
            <bn-input-label>Name:</bn-input-label>
            <bn-input-string v-modle="user.name" />
        </bn-form-div>
        <bn-form-div class="flex-row mi10">
            <bn-input-label>Email:</bn-input-label>
            <bn-input-email v-modle="user.email" />
        </bn-form-div>
        <bn-form-div class="flex-row mi10">
            <bn-input-label>Password:</bn-input-label>
            <bn-input-password v-modle="user.password" />
        </bn-form-div>
        <div clas="form-row-center mi10">
            <bn-button-orange v-on:click="emit_end(false)">
                Cancel
            </bn-button-orange>
            <bn-button-green type="submit">
                Submit
            </bn-button-green>
        </div>
    </div>
