# Vue • Forms

Use `app-form-div` and `app-label` for composing forms. The rows sit in a
`<form>`, so that the submit button and the Enter key both reach `submit`.

    <form v-on:submit.prevent="submit" class="mg10">
        <app-form-div class="flex-row gap10">
            <app-label>Name:</app-label>
            <app-input-string v-model="user.name" />
        </app-form-div>
        <app-form-div class="flex-row gap10">
            <app-label>Email:</app-label>
            <app-input-email v-model="user.email" />
        </app-form-div>
        <app-form-div class="flex-row gap10">
            <app-label>Password:</app-label>
            <app-input-password v-model="user.password" />
        </app-form-div>
        <div class="flex-row-c gap10">
            <app-button-orange v-on:click="modal.return(false)">
                Cancel
            </app-button-orange>
            <app-button-green type="submit">
                Submit
            </app-button-green>
        </div>
    </form>
