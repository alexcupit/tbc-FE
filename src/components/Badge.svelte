<script>
	export let badge;
	export let locked;
</script>

<!-- <img src={badge.src}> -->
<div class="img" style={`background-image: url(${badge.src})`}>
	{#if locked}
		<div class="overlay" style={`background-image: url("/badges/padlock.png")`} />
	{/if}
</div>
<span>{badge.type}</span>

<style>
	.img {
		width: 128px;
		height: 130px;
	}
	.overlay {
		width: 100%;
		height: 100%;
		filter: opacity(85%);
	}
	span {
		margin: 4px;
	}
</style>
