let editor = document.getElementById("editor");
let preview = document.getElementById("preview");
editor.addEventListener("input", () => {
    renderMarkdown();
})
editor.addEventListener("keydown", (event) => {
    if(event.ctrlKey == true  && event.key == "b") {
        keyboardShortcut("**", "**");
    }
});

let keyboardShortcut = function(symbolStart, symbolEnd) {
    wrapSelection(symbolStart, symbolEnd);
}

let wrapSelection = function(before, after) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    
    if(editor.value.substring(start - before.length, start) === before && editor.value.substring(end, end + after.length) === after) {
        console.log("works");
        const selectedText = editor.value.substring(start, end);
        editor.value =
            editor.value.substring(0, start - before.length)
            + ""
            + selectedText
            + ""
            + editor.value.substring(end + after.length);
        editor.setSelectionRange(
            start - after.length,
            end - before.length
        )
        renderMarkdown();
    } else {
        const selectedText = editor.value.substring(start, end);
        console.log("1", editor.value.substring(0, start),"2", before,"3", selectedText,"4", after,"5", editor.value.substring(selectedText.length + after.length, end));
        editor.value =
            editor.value.substring(0, start)
            + before
            + selectedText
            + after
            + editor.value.substring(end);
        editor.setSelectionRange(
            start + before.length,
            end + before.length
        )
        renderMarkdown();
    }
}

let renderMarkdown = function(){
    const content = document.getElementById("editor").value;
    let markdown = marked.parse(content);
    preview.innerHTML = markdown;
}