<script>
    export let props
    export let value
    export let onChange
    export let emailAlreadyExists
    export let login
    export let firebaseError
    let {label, placeholder, type, required, error, pattern} = props
    let focused = false
    let showError = false
    const validateInput = (e) => {
        focused = false
        e.target.validity.patternMismatch ? showError = true : showError = false
    }
    const handleInputType = (e) => {
    e.target.type = type;
    }
</script>

<label>{label}</label>
<input class="input"
    {placeholder}
    on:input={handleInputType}
    on:change={onChange}
    bind:value={value}
    required={required}
    on:blur={validateInput}
    on:focus={(e) => {
        focused = true
        label === "password" ? showError = true: ""
        console.log("focused", focused)
    }}
    {pattern}
    {focused}
/>
<!-- client side validation -->
{#if showError & !login}
    <span id="error">{error}</span>
{/if }
{#if showError & login & label === "email"}
    <span id="error">{error}</span>
{/if }
<!-- server side validation -->
{#if firebaseError === "user-not-found" & label === "email"}
    <span>email incorrect</span>
{:else if firebaseError === "wrong-password" & label === "password"}
    <span>password incorrect</span>
{:else if firebaseError === "email-already-in-use" & label === "email"}
    <span>Email already exists</span>
{/if}


<style>
    /* #error {
        display: none;
    } */
    input[focused="true"]  {
        background-color: rgb(163, 158, 158);
    }
</style>