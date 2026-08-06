let editor = document.getElementById("editor");
let preview = document.getElementById("preview");
editor.addEventListener("input", () => {
    const content = document.getElementById("editor").value;
    let markdown = marked.parse(content);
    preview.innerHTML = markdown;
})
