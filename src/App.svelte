<script>
    import { onMount } from 'svelte';
    import { ladder, isDark, selected, toggleDark } from './store';
    import { getAdjectives, getVerbs } from '../scripts/datamuseClient';
    import Ladder from './Ladder.svelte';
    import Word from './Word.svelte';
    import Button from './Button.svelte';
    import SafeInput from './SafeInput.svelte';
    import { getRandomInt } from '../scripts/utils';
    import Adjs from './adjectives';

    // headers/meta content
    let author = 'Miguel Guerrero';
    let words = ['lyricist', 'musician', 'programmer'];
    let desc = `A lyric exercise web app from ${words.join(', ')} ${author}.`;
    // let imageURL =
    //     'https://s3.us-west-2.amazonaws.com/mdguerrero.com/ladder_example1.png';

    let title_adj = '';
    let promise;
    let link = `<a style="color:inherit;" href='https://github.com/olmigs/klyric#Ladder'><strong>word ladder</strong></a>`;
    let input_name = 'seed';
    let tab_cnt = 0;
    let lads;

    ladder.subscribe((list) => {
        lads = list;
    });

    onMount(async () => {
        if ($isDark) {
            window.document.body.classList.toggle('dark-mode');
        }
        if (title_adj == '') {
            title_adj = getTitleFromAdjs();
        }
    });

    const put = () => {
        return document.getElementById(input_name).value;
    };
    const toggleMode = () => {
        toggleDark($selected);
        return window.document.body.classList.toggle('dark-mode');
    };
    const handleVerb = () => {
        promise = getVerbs(put());
    };
    const handleAdjective = () => {
        promise = getAdjectives(put());
    };

    function incrementTab() {
        let curr = tab_cnt;
        tab_cnt++;
        return curr;
    }
    function getTitleFromAdjs() {
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
    <!-- <meta property="og:image" content={imageURL} /> -->
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
        <Button
            val="Light"
            alt_val="Dark"
            toggleHook={toggleMode}
            condition={$isDark}
        />
    </div>
    <div class="ctrl">
        <h1>
            {title_adj}
            {capitalizeFirstLetter(words[getRandomInt(words.length)])}
        </h1>
        <SafeInput class="inputBox" name={input_name} index={incrementTab} />
        <Button
            val="Verb"
            toggleHook={() => handleVerb()}
            index={incrementTab}
        />
        <Button
            val="Adjective"
            toggleHook={() => handleAdjective()}
            index={incrementTab}
        />
    </div>
    {#if lads.length > 0}
        <Ladder words={lads} />
    {:else}
        <p style="margin: 40px; visibility: hidden;">Ladder (0)</p>
    {/if}
    <div class="wordbox">
        {#await promise}
            <div class="about"><p>waiting...</p></div>
        {:then arr}
            <!-- migstodo: pass arr to a component? -->
            {#if arr}
                <div class="about">
                    <p>
                        Use the below adjectives/verbs to construct a {@html link}.
                    </p>
                </div>
                {#each arr as a}
                    <Word value={a.word} checked={lads.includes(a.word)} />
                {/each}
            {:else}
                <div class="about">
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
    .ctrl :global(.inputBox) {
        margin-top: 25px;
        margin-bottom: 25px;
    }
    .about {
        flex: 0 0 100%;
    }
    .about p {
        color: #43ad7d;
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
