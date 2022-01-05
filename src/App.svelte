<script>
	import { getAdjectives, getVerbs } from "../scripts/datamuseClient";
	import Button from "./Button.svelte";
	let input = "";
	let promise; // = getVerbs(input);
	function handleVerb(put) {
		promise = getVerbs(put);
	}
	function handleAdjective(put) {
		promise = getAdjectives(put);
	}
	function removeSpecialChars() {
		var str = document.getElementById("seed").value;
		var start = document.getElementById("seed").selectionStart;
		var checkStr = str.replace(/[\/\\?%*:|"<>]/g, "");
		if (checkStr !== str) {
			document.getElementById("seed").value = checkStr;
			input = checkStr;
			document.getElementById("seed").selectionStart = start - 1;
			document.getElementById("seed").selectionEnd = start - 1;
		}
	}
	// function toggleModeButtonText() {
	// 	if ($isDark) {
	// 		isDark.set(false);
	// 	} else {
	// 		isDark.set(true);
	// 	}
	// }
</script>

<main>
	<div class="transient">
		<div id="github-link">
			<a
				class="github-button"
				href="https://github.com/olmigs/klyric"
				data-size="large"
				data-show-count="true"
				aria-label="Star olmigs/klyric on GitHub">Star</a
			>
		</div>
		<Button />
	</div>
	<div class="ctrl">
		<h1>Lyricist</h1>
		<input
			id="seed"
			style="margin-top: 30px"
			type="text"
			bind:value={input}
			on:input={removeSpecialChars}
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="true"
		/>
		<button on:click={() => handleAdjective(input)}>Adjectives!</button>
		<button on:click={() => handleVerb(input)}>Verbs!</button>
	</div>
	<div class="wordbox">
		{#await promise}
			<div class="word">waiting...</div>
		{:then arr}
			<!-- migstodo: pass arr to a component -->
			{#if arr}
				<div style="color: green" class="about">
					<p>
						Use the below adjectives/verbs to construct a <strong
							><em>word ladder</em></strong
						>.
					</p>
				</div>
				{#each arr as a}
					<div class="word"><p>{a.word}</p></div>
				{/each}
			{:else}
				<div style="color: green" class="word">
					<p>Type in a noun!</p>
					<p style="font-size: 10pt">
						Examples: physician, hunter, runner, etc.
					</p>
				</div>
			{/if}
		{:catch err}
			<p style="color: red">{err.message}</p>
		{/await}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.wordbox {
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		width: 70%;
		display: flex;
		flex-flow: row wrap;
	}

	.ctrl {
		margin-top: 60px;
	}

	.about {
		flex: 0 0 100%;
	}

	.word {
		margin: 5px;
		padding: 5px;
		flex-grow: 1;
	}

	.transient {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin: 0 auto;
		margin-top: 40px;
		padding: 5px;
	}

	#github-link {
		text-decoration: none;
		color: black;
	}

	:global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s;
	}
	:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
