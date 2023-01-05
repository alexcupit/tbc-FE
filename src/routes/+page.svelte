<div class="logo-and-play">
	<img src="src/icons/KnowItAll.png" alt="" height="350" width="350" class="mb-5" />
	<a href="/play" class="btn test"><span class="text-neutral">PLAY</span></a>
</div>

<style>
	.logo-and-play {
		display: flex;
		flex-direction: column;
		height: 75vh;
		justify-content: center;
	}
	@keyframes changeBg {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@-webkit-keyframes changeBg {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@-moz-keyframes changeBg {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	.test {
		background: linear-gradient(270deg, rgb(229, 93, 135), rgb(95, 195, 228));
		background-size: 200% 200%;
		animation: changeBg 2s ease infinite;
	}
</style>
