<script>
    import userStore from "../../stores/userStore"
    let user;
    userStore.subscribe((data) => user = data)
</script>

<h3>Profile info</h3>
<p>Username: {user.username}</p>
<p>Last played: {user.dateLastPlayed}</p>
<p>Current streak: {user.currentStreak}</p>
