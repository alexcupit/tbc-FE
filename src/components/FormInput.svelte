<script>
	export let props;
	export let value;
	export let onChange;
	export let emailAlreadyExists;
	export let login;
	export let firebaseError;
	let { label, placeholder, type, required, error, pattern } = props;
	let focused = false;
	let showError = false;
	const validateInput = (e) => {
		focused = false;
		e.target.validity.patternMismatch ? (showError = true) : (showError = false);
	};
	const handleInputType = (e) => {
		e.target.type = type;
	};
</script>

<label class=" justify-center mb-5 form-control">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	<input
		class="input input-bordered"
		{placeholder}
		on:input={handleInputType}
		on:change={onChange}
		bind:value
		{required}
		on:blur={validateInput}
		on:focus={(e) => {
			focused = true;
			label === 'password' ? (showError = true) : '';
			console.log('focused', focused);
		}}
		{pattern}
		{focused}
	/>
	{#if showError & !login}
		<span class="error text-left">{error}</span>
	{/if}
	{#if showError & login & (label === 'email')}
		<span class="error text-left">{error}</span>
	{/if}
	<!-- server side validation -->
	{#if (firebaseError === 'user-not-found') & (label === 'email')}
		<span class="error text-left">email not found, please sign up</span>
	{:else if (firebaseError === 'wrong-password') & (label === 'password')}
		<span class="error text-left">password incorrect</span>
	{:else if (firebaseError === 'email-already-in-use') & (label === 'email')}
		<span class="error text-left">Email already exists</span>
	{/if}
</label>

<!-- client side validation -->
<style>
	/* #error {
        display: none;
    } */
	/* input[focused='true'] {
		background-color: rgb(163, 158, 158);
	} */

	/* .input-group {
		margin-bottom: 10%;
	} */

	.error {
		color: #ff6c84;
	}
</style>
