export function removeSpecialCharsById(id) {
    var str = document.getElementById(id).value;
    var start = document.getElementById(id).selectionStart;
    var checkStr = str.replace(/[\/\\?%*:|"<>]/g, '');
    if (checkStr !== str) {
        document.getElementById(id).value = checkStr;
        document.getElementById(id).selectionStart = start - 1;
        document.getElementById(id).selectionEnd = start - 1;
        console.log(checkStr);
    }
}