<!-- source: https://svelte.dev/repl/ed4fef4beceb4b0eb295d1f9fdf3bd62?version=3.6.9 -->
<script>
    import { onMount, afterUpdate } from 'svelte';
    export let toggleHook = () => {};
    export let condition = 'UNSET';
    export let val = '';
    export let alt_val = '';
    export let index = -1;
    let text = '';

    onMount(() => {
        updateText(condition);
    });

    afterUpdate(() => {
        updateText(condition);
    });

    function updateText(cond) {
        if (cond !== 'UNSET') {
            text = cond ? val : alt_val;
        } else {
            text = val;
        }
    }

    function toggle() {
        let toggle_bool = toggleHook();
        updateText(toggle_bool);
    }
</script>

<button tabindex={index} on:click={toggle}>
    {text}
</button>

<style>
    button {
        background-color: #e46739;
        color: white;
        border: 3px solid transparent;
        border-radius: 4px;
        padding: 0.3rem;
    }
    button:hover,
    button:focus {
        border: 3px solid #ceb037;
    }
    :global(body.dark-mode) button {
        background-color: #0084f6;
        color: white;
    }
</style>
