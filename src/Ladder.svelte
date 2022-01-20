<script>
    import { afterUpdate } from 'svelte';
    import { ladder, mySpecialWords, updateSpecialWords } from './store';
    export let words = [];
    let specials = [];
    let isVisible = false;

    mySpecialWords.subscribe((list) => {
        specials = list;
    });
    afterUpdate(async () => {
        let firstTd = document.getElementById('special-0');
        if (firstTd) {
            let taintedInner = firstTd.innerHTML;
            let scrubbedInner = taintedInner.replace(/\<(.*)\>/g, '');
            document.getElementById('special-0').innerHTML = scrubbedInner;
        }
    });

    function toggleVis() {
        if (isVisible) {
            save();
            isVisible = false;
        } else {
            isVisible = true;
        }
    }
    function save() {
        let table = document.getElementById('laddy');
        const rowLen = table.rows.length;
        const words = [];
        for (let i = 0; i < rowLen; i++) {
            let cells = table.rows.item(i).cells;
            let word = cells[1].innerHTML;
            let scrubbedWord = word.replace(/\<(.*)\>/g, '');
            words.push(scrubbedWord);
        }
        updateSpecialWords(words);
    }
    function remove(value) {
        ladder.update((list) => list.filter((x) => x !== value));
    }
</script>

{#if isVisible}
    <p class="title" on:click={toggleVis}>Ladder ({words.length}) ▲</p>
    <table id="laddy">
        {#each words as word, i}
            <tr>
                <td><p on:click={() => remove(word)}>{word}</p></td>
                <td id={'special-' + i} contenteditable="true">
                    {#if specials.length > 0 && specials[i]}
                        {specials[i]}
                    {/if}
                </td>
            </tr>
        {/each}
    </table>
{:else}
    <p class="title" on:click={toggleVis}>Ladder ({words.length}) ▼</p>
{/if}

<style>
    .title {
        color: #43ad7d;
        font-weight: bold;
        margin: 40px;
    }
    table {
        text-align: center;
        margin: 0 auto;
        padding: 7px;
        color: #dbdee3;
        background-color: #43ad7d;
        border-radius: 7px;
    }
    :global(body.dark-mode) table {
        color: #43ad7d;
        background-color: #bfc2c7;
    }
    td {
        width: 100px;
    }
    p {
        cursor: pointer;
    }
</style>
