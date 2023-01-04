<script lang="ts">
	import { Link } from 'svelte-navigator';
	let innerWidth: number;
	import userStore from '../stores/userStore';
	let user: object;
	userStore.subscribe((data) => {
		user = data;
	});
</script>

<div class="modal" id="my-modal-2">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Welcome to Know-It-All</h3>
		<p class="py-4">Some text about how to play!</p>
		<div class="modal-action">
			<a href="#" class="btn">Got it!</a>
		</div>
	</div>
</div>

<svelte:window bind:innerWidth />
<header>
	<nav />
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Know It All</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a href="/"
						><img
							src=""
							alt=""
							height="25"
							width="25"
						/></a
					>
				</li>
				<li>
					<a href="#my-modal-2"
						><img
							src=""
							alt=""
							height="25"
							width="25"
						/></a
					>
				</li>
				<li>
					{#if !user.isLoggedIn}
						<a href="/login"
							><img
								src=""
								alt=""
								height="25"
								width="25"
							/></a
						>
					{:else}
						<a href="/profile"
							><img
								src=""
								alt=""
								height="25"
								width="25"
							/></a
						>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</header>
