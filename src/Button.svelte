<!-- source: https://svelte.dev/repl/ed4fef4beceb4b0eb295d1f9fdf3bd62?version=3.6.9 -->

<script>
    let text = "Dark";
    function toggle() {
        if (text === "Dark") {
            text = "Light";
        } else if (text === "Light") {
            text = "Dark";
        }
        window.document.body.classList.toggle('dark-mode')
    }
    </script>
    <button on:click={toggle}>
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