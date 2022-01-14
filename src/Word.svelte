<script>
    import { ladder } from './store';
    export let value;
    let checked = false;

    function check() {
        console.log("help");
        // migsnote: optionally add ` context="module" ` to script tag to export this function
        if (checked) {
            ladder.update((list) => list.filter((x) => x !== value));
            checked = false;
        } else {
            ladder.update((list) => [...list, value]);
            checked = true;
        }
    }
</script>

<div class:selected="{checked}" on:click={check}><p>{value}</p></div>

<style>
    div {
        cursor: pointer;
        margin: 5px;
        padding: 5px;
        flex-grow: 1;
        border: 2px solid transparent;
    }

    div.selected {
        color: #a03f3f;
        font-weight: bold;
    }
</style>
