<script>
    // migsnote: `input` is available by calling `document.getElementById(name)`
    export let name, index;
    let input = '';
    function removeSpecialChars(id) {
        var str = document.getElementById(id).value;
        var start = document.getElementById(id).selectionStart;
        var checkStr = str.replace(/[\/\\?%*:|"<>]/g, '');
        if (checkStr !== str) {
            document.getElementById(id).value = checkStr;
            document.getElementById(id).selectionStart = start - 1;
            input = checkStr;
            document.getElementById(id).selectionEnd = start - 1;
        }
    }
</script>

<input
    class={$$props.class}
    id={name}
    type="text"
    bind:value={input}
    on:input={() => removeSpecialChars(name)}
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="true"
    tabindex={index}
/>

<style>
    input {
        background-image: linear-gradient(#d7f5fe, #adedff);
        border-radius: 7px;
    }
</style>
