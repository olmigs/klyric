<!-- Goals:
    1. needs a boolean isVisible property to show only "Ladder ({$ladder.length})" when isVisible === false
    2. when visible, must be able to remove randomized words from Ladder on:click
    3. possibly, do not allow duplicates (i.e. use Set type)
    4. remember: Elements with a contenteditable="true" attribute support textContent and innerHTML bindings
-->
<script>
    import { ladder } from './store';
    export let words = [];
    let isVisible = false;

    function toggleVis() {
        if (isVisible) {
            isVisible = false;
        } else {
            isVisible = true;
        }
    }
    function remove(value) {
        ladder.update((list) => list.filter((x) => x !== value));
    }
</script>

{#if isVisible}
    <p class="title" on:click={toggleVis}>Ladder ({words.length}) ▲</p>
    <table>
        {#each words as word}
            <tr>
                <td><p on:click={() => remove(word)}>{word}</p></td>
                <td contenteditable="true" />
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
