<!-- source: https://svelte.dev/repl/ed4fef4beceb4b0eb295d1f9fdf3bd62?version=3.6.9 -->
<script>
    import { onMount } from 'svelte';
    import { selected, isDark, toggleDark } from './store';
    let text = '';

    onMount(() => {
        if (text == '') {
            text = $isDark ? 'Light' : 'Dark';
        }
    });

    function toggle(mode) {
        let new_text = toggleDark(mode);
        if (new_text) {
            text = new_text;
        }
        window.document.body.classList.toggle('dark-mode');
    }
</script>

<button on:click={() => toggle($selected)}>
    {text}
</button>

<style>
    button {
        background-color: #e46739;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.3rem;
    }
    :global(body.dark-mode) button {
        background-color: #0084f6;
        color: white;
    }
</style>
