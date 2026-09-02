# Vue • Forms

Use `app-form-div` and `app-form-label` for composing forms.

    <div class="mg10">
        <app-form-div class="flex-row mi10">
            <app-input-label>Name:</app-input-label>
            <app-input-string v-model="user.name" />
        </app-form-div>
        <app-form-div class="flex-row mi10">
            <app-input-label>Email:</app-input-label>
            <app-input-email v-model="user.email" />
        </app-form-div>
        <app-form-div class="flex-row mi10">
            <app-input-label>Password:</app-input-label>
            <app-input-password v-model="user.password" />
        </app-form-div>
        <div class="form-row-center mi10">
            <app-button-orange v-on:click="emit_end(false)">
                Cancel
            </app-button-orange>
            <app-button-green type="submit">
                Submit
            </app-button-green>
        </div>
    </div>
