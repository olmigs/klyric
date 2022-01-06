<script>
    import { onMount } from 'svelte';
    import { isDark } from './store';
    import { getAdjectives, getVerbs } from '../scripts/datamuseClient';
    import Button from './Button.svelte';
    import { getRandomInt } from '../scripts/utils';
    import Adjs from './adjectives';

    let author = 'Miguel Guerrero';
    let title_adj = '';
    let input = '';
    let promise; // = getVerbs(input);
    let link = `<a href='https://github.com/olmigs/klyric#Ladder'><strong>word ladder</strong></a>`;
    let words = ['lyricist', 'musician', 'programmer'];
    let desc = `A lyric exercise web app from ${words.join(', ')} ${author}.`;
    let tab_cnt = 0;

    onMount(async () => {
        if ($isDark) {
            window.document.body.classList.toggle('dark-mode');
        }
        if (title_adj == '') {
            title_adj = await getTitleFromAdjs();
        }
    });

    function handleVerb(put) {
        promise = getVerbs(put);
    }
    function handleAdjective(put) {
        promise = getAdjectives(put);
    }
    function removeSpecialChars() {
        var str = document.getElementById('seed').value;
        var start = document.getElementById('seed').selectionStart;
        var checkStr = str.replace(/[\/\\?%*:|"<>]/g, '');
        if (checkStr !== str) {
            document.getElementById('seed').value = checkStr;
            input = checkStr;
            document.getElementById('seed').selectionStart = start - 1;
            document.getElementById('seed').selectionEnd = start - 1;
        }
    }
    function incrementTab() {
        let curr = tab_cnt;
        tab_cnt++;
        return curr;
    }
    async function getTitleFromAdjs() {
        const i = getRandomInt(Adjs.length);
        return capitalizeFirstLetter(Adjs[i]);
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<svelte:head>
    <meta name="description" content={desc} />
    <meta name="author" content={author} />
</svelte:head>

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
        <h1>
            {title_adj} Lyricist
        </h1>
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
            tab-index={incrementTab}
        />
        <button
            class="fetch"
            on:click={() => handleAdjective(input)}
            tab-index={incrementTab}>Adjectives!</button
        >
        <button
            class="fetch"
            on:click={() => handleVerb(input)}
            tab-index={incrementTab}>Verbs!</button
        >
    </div>
    <div class="wordbox">
        {#await promise}
            <div class="word">waiting...</div>
        {:then arr}
            <!-- migstodo: pass arr to a component -->
            {#if arr}
                <div style="color: green" class="about">
                    <p>
                        Use the below adjectives/verbs to construct a {@html link}.
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

    .fetch {
        color: inherit;
        background-color: inherit;
        font-weight: bold;
        border: 2px solid #cecbc1;
        border-radius: 7px;
        margin: 5px;
        padding: 10px;
        transition: border 0.3s;
    }

    .fetch:hover,
    .fetch:focus {
        border: 2px solid #e46739;
    }

    #seed {
        background-image: linear-gradient(#d7f5fe, #adedff);
        border-radius: 7px;
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
