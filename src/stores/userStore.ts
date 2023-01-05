import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

let user = writable({
	isLoggedIn: false,
	username: '',
	userId: '',
	photoURL: ''
});

if (browser && localStorage.user) {
	user.update((value) => {
		return (value = JSON.parse(localStorage.user));
	});
	console.log(user);
}

export default user;
