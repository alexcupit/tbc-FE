<script lang="ts">
	let innerWidth: number;
	import userStore from '../stores/userStore';
	let user: object;
	userStore.subscribe((data) => {
		user = data;
	});
</script>

<div class="modal" id="my-modal-2">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Welcome to Know It All</h3>
		<section class="prose">
			<p>Can you take on the daily quiz and prove you Know It All?</p>
			<h4>How To Play</h4>
			<ol>
				<li>Clicking on PLAY will start the timer...</li>
				<li>Choose the correct answer for each of the five questions</li>
				<li>
					Your score will be based on how long it takes you to complete the quiz and the number of
					correct answers you select
				</li>
				<li>Every day, the quiz will refresh with five new questions!</li>
			</ol>
			<h4>Create an Account</h4>
			<p>
				Registering for an account will let you join the global leaderboard with your score from
				each day.
			</p>
			<p>You can also set up your own leaderboard with friends and see how you compare each day!</p>
		</section>
		<div class="modal-action">
			<a href="/#" class="btn">Got it!</a>
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
					<a href="/leaderboards"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							xmlns:svgjs="http://svgjs.com/svgjs"
							version="1.1"
							width="25"
							height="25"
							x="0"
							y="0"
							viewBox="0 0 512 512"
							style="enable-background:new 0 0 512 512"
							xml:space="preserve"
							class=""
						>
							<g>
								<g>
									<path
										d="m145.688 73.37 20 125c1.164 7.277 7.442 12.63 14.812 12.63h150c7.369 0 13.647-5.353 14.812-12.63l20-125c2.075-12.96-12.394-22.154-23.246-14.774l-39.735 27.02-36.224-36.223c-5.857-5.858-15.355-5.858-21.213 0l-36.224 36.223-39.735-27.02c-10.85-7.38-25.322 1.812-23.247 14.774zm56.377 44.034c5.955 4.05 13.949 3.295 19.041-1.797l34.394-34.394 34.394 34.393c5.093 5.093 13.085 5.847 19.041 1.797l21.264-14.459-12.49 78.056h-124.418l-12.489-78.055z"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
									<circle
										cx="255.5"
										cy="15"
										r="15"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
									<circle
										cx="360.5"
										cy="30"
										r="15"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
									<circle
										cx="150.5"
										cy="30"
										r="15"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
									<path
										d="m466.5 332h-125.333v-76c0-8.284-6.716-15-15-15h-140.334c-8.284 0-15 6.716-15 15v46h-125.333c-8.284 0-15 6.716-15 15v180c0 8.284 6.716 15 15 15h421c8.284 0 15-6.716 15-15v-150c0-8.284-6.716-15-15-15zm-406 0h110.333v150h-110.333zm140.333-61h110.334v211h-110.334zm250.667 211h-110.333v-120h110.333z"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
									<path
										d="m256 301h-15c-8.284 0-15 6.716-15 15s6.716 15 15 15v45c0 8.284 6.716 15 15 15s15-6.716 15-15v-60c0-8.284-6.716-15-15-15z"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
								</g>
							</g>
						</svg></a
					>
				</li>
				<li>
					<a href="#my-modal-2"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							xmlns:svgjs="http://svgjs.com/svgjs"
							version="1.1"
							width="25"
							height="25"
							x="0"
							y="0"
							viewBox="0 0 973.1 973.1"
							style="enable-background:new 0 0 512 512"
							xml:space="preserve"
							class=""
						>
							<g>
								<g>
									<path
										d="M502.29,788.199h-47c-33.1,0-60,26.9-60,60v64.9c0,33.1,26.9,60,60,60h47c33.101,0,60-26.9,60-60v-64.9   C562.29,815,535.391,788.199,502.29,788.199z"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
									<path
										d="M170.89,285.8l86.7,10.8c27.5,3.4,53.6-12.4,63.5-38.3c12.5-32.7,29.9-58.5,52.2-77.3c31.601-26.6,70.9-40,117.9-40   c48.7,0,87.5,12.8,116.3,38.3c28.8,25.6,43.1,56.2,43.1,92.1c0,25.8-8.1,49.4-24.3,70.8c-10.5,13.6-42.8,42.2-96.7,85.9   c-54,43.7-89.899,83.099-107.899,118.099c-18.4,35.801-24.8,75.5-26.4,115.301c-1.399,34.1,25.8,62.5,60,62.5h49   c31.2,0,57-23.9,59.8-54.9c2-22.299,5.7-39.199,11.301-50.699c9.399-19.701,33.699-45.701,72.699-78.1   C723.59,477.8,772.79,428.4,795.891,392c23-36.3,34.6-74.8,34.6-115.5c0-73.5-31.3-138-94-193.4c-62.6-55.4-147-83.1-253-83.1   c-100.8,0-182.1,27.3-244.1,82c-52.8,46.6-84.9,101.8-96.2,165.5C139.69,266.1,152.39,283.5,170.89,285.8z"
										fill="#b3ccf5"
										data-original="#000000"
										class=""
									/>
								</g>
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
							</g>
						</svg>
					</a>
				</li>
				<li>
					{#if !user.isLoggedIn}
						<a href="/login"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								xmlns:svgjs="http://svgjs.com/svgjs"
								version="1.1"
								width="25"
								height="25"
								x="0"
								y="0"
								viewBox="0 0 512 512"
								style="enable-background:new 0 0 512 512"
								xml:space="preserve"
								class=""
							>
								<g>
									<g>
										<g>
											<path
												d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"
												fill="#b3ccf5"
												data-original="#000000"
												class=""
											/>
										</g>
									</g>
									<g>
										<g>
											<path
												d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195    C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15    C481,444.833,460.745,395.539,423.966,358.195z"
												fill="#b3ccf5"
												data-original="#000000"
												class=""
											/>
										</g>
									</g>
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
								</g>
							</svg></a
						>
					{:else}
						<a href="/profile"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								xmlns:svgjs="http://svgjs.com/svgjs"
								version="1.1"
								width="25"
								height="25"
								x="0"
								y="0"
								viewBox="0 0 512 512"
								style="enable-background:new 0 0 512 512"
								xml:space="preserve"
								class=""
							>
								<g>
									<g>
										<g>
											<path
												d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"
												fill="#b3ccf5"
												data-original="#000000"
												class=""
											/>
										</g>
									</g>
									<g>
										<g>
											<path
												d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195    C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15    C481,444.833,460.745,395.539,423.966,358.195z"
												fill="#b3ccf5"
												data-original="#000000"
												class=""
											/>
										</g>
									</g>
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
									<g />
								</g>
							</svg></a
						>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</header>
