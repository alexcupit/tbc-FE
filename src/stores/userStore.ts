import { writable } from "svelte/store";

const user = writable({
    isLoggedIn: false,
    username: "",
    userId: ""
})

export default user