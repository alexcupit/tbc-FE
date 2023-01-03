<script lang="ts">
	import { goto } from "$app/navigation";
    import userStore from "../../stores/userStore"
	import FormInput from "../../components/FormInput.svelte"
	import app from "../../firebase/config"
	import {mongoDbcreateUser} from "../../api"
	import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
	const auth = getAuth()
	let values = {
		username: "",
		email: "",
		password: ""
	}
	let inputs = [{
		label : "username", 
		placeholder: "username",
		type: "text",
		error: "3-16 characters",
		pattern: "[a-zA-Z0-9]{3,16}",
		required: true
		},
		{
		label : "email", 
		placeholder: "email",
		type: "text",
		error: "invalid email",
		pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
		required: true
		},
		{
		label : "password", 
		placeholder: "password",
		type: "password",
		error: "8 or more characters",
		required: true,
		pattern: "[a-zA-Z0-9]{8,}"
		}
	]
	let avatarStyles = ["adventurer", "adventurer-neutral", "bottts", "micah", "big-smile"]
	let  user: object;
	let signUp = false
	const login = true
	let disableButton = false
	let firebaseError = ""
	userStore.subscribe(async (data) => {
		user = data
		if(user.isLoggedIn) await goto("/")
	})
	const randomStyle = (arr) => {
		return arr[Math.floor(Math.random()*arr.length)]
	}
	const onChange = (e) => {
		values = {...values, [e.target.placeholder]: e.target.value}
		console.dir(e.target)
	}
	const submitHandleSingUp = async (e) => {
		console.log("submitted sign up form values", values)
		const photoURL = `https://avatars.dicebear.com/api/${randomStyle(avatarStyles)}/${values.username}.svg?size=200`
		await createUserWithEmailAndPassword(auth, values.email, values.password).then( async (userCredential) => {
			const userFirebase = userCredential.user
			await updateProfile(userFirebase, {
				displayName: values.username, photoURL})
			console.log("created account in firebase", userFirebase)
			const mongoDbUserBody = {username: userFirebase.displayName, userId: userFirebase.uid}
			const createdUser = await mongoDbcreateUser(mongoDbUserBody)
			console.log("created mongodb user", createdUser)
			userStore.update((user) => {
				user.isLoggedIn = true
				user.username = createdUser.username
				user.userId = createdUser.userId
				user.photoURL = photoURL
				return user
			})
			console.log(createdUser)
			goto("/")
			}).catch((err) => {
				firebaseError = err.code.split("/")[1]
		})
	}
	const submitHandleLogin = async (e) => {
		disableButton = true
		console.log("submitted login form values", values)
		await signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
			const userFirebase = userCredential.user
			userStore.update((user) => {
				user.isLoggedIn = true
				user.userId = userFirebase.uid
				user.username = userFirebase.displayName
				user.photoURL = userFirebase.photoURL
				return user
			})
			console.log("logged in user", user)
			goto("/")
		}).catch((err) => {
			firebaseError = err.code.split("/")[1]
			disableButton = false
		})
	}
</script>

{#if signUp}
<h2>Create a new account</h2>

<form class="sign-up" on:submit|preventDefault={submitHandleSingUp}>
	{#each inputs as input}
		<FormInput
			props={input}
			onChange={onChange}
			value={values[input.label]}
			{firebaseError}
		></FormInput>
	{/each}
	<button>submit</button>
</form>
{:else}
<h2>Login</h2>
<form class="login" on:submit|preventDefault={submitHandleLogin}>
	{#each inputs as input}
		{#if input.label === "email" || input.label === "password"}
			<FormInput
				props={input}
				onChange={onChange}
				value={values[input.label]}
				{login}
				{firebaseError}
			></FormInput>
		{/if}
	{/each}
	<button disabled={disableButton}>submit</button>
</form>
{/if}
{#if signUp} 
	<h4 on:click={() => signUp = false}>I have an account</h4>
{:else}
	<h4 on:click={() => signUp = true}>sign up</h4>
{/if}
<style>
.sign-up {
	display: flex;
	flex-direction: column;
}
.login {
	display: flex;
	flex-direction: column;
}
h4 {
	cursor: pointer;
}

</style>