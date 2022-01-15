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
    <p class="title" on:click={toggleVis}>Ladder ({words.length})</p>
    {#each words as word}
        <p on:click={() => remove(word)}>{word}</p>
    {/each}
{:else}
    <p class="title" on:click={toggleVis}>Ladder ({words.length})</p>
{/if}

<style>
    .title {
        font-weight: bold;
    }
    p {
        cursor: pointer;
    }
</style>
