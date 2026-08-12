let editor = document.getElementById("editor");
let preview = document.getElementById("preview");
editor.addEventListener("input", () => {
window.addEventListener("DOMContentLoaded", () => {
    renderMarkdown();
})
if(editor) editor.addEventListener("input", () => {
    renderMarkdown();
})
if(editor) editor.addEventListener("keydown", (event) => {
    if(event.ctrlKey && event.key.toLowerCase() == "b") {
        event.preventDefault();
        keyboardShortcut("**", "**");
    }
    if(event.ctrlKey && event.key.toLowerCase() == "k") {
        event.preventDefault();
        keyboardShortcut("[", "]()");
    }
    if(event.ctrlKey && event.shiftKey && event.key.toLowerCase() == "s") {
        event.preventDefault();
        keyboardShortcut("~~", "~~");
    }
    if(event.ctrlKey && event.key.toLowerCase() == "i") {
        event.preventDefault();
        keyboardShortcut("_", "_");
    }
});

let keyboardShortcut = function(symbolStart, symbolEnd) {
    wrapSelection(symbolStart, symbolEnd);
}

let wrapSelection = function(before, after) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    let i = 1;
    let startString = "";
    console.log(editor.value[start - i]);
    while(
        editor.value[start - i] == "~"
        || editor.value[start - i] == "*"
        || editor.value[start - i] == "_"
    ){
        startString += editor.value[start - i];
        i += 1;
    }
    startString = startString.split("").reverse().join("");
    console.log(startString);
    let endString = "";
    let j = 0;
    while(
        editor.value[end + j] == "~"
        || editor.value[end + j] == "*"
        || editor.value[end + j] == "_"
    ){
        endString += editor.value[end + j];
        j += 1;
    }
    const hasWrapper =
    startString.includes(before) &&
    endString.includes(after);
    const selectedText = editor.value.substring(start, end);
    let beforeIndex = startString.lastIndexOf(before);
    let afterIndex = endString.indexOf(after);
    let editorBeforeIndex = start - startString.length + beforeIndex;
    let editorAfterIndex = end + afterIndex;
    if(hasWrapper) {
        editor.value = 
            editor.value.substring(0, editorBeforeIndex)
            + editor.value.substring(editorBeforeIndex + before.length, editorAfterIndex)
            + editor.value.substring(editorAfterIndex + after.length);
        editor.setSelectionRange(
            start - before.length,
            end - before.length
        )
        renderMarkdown();
    } else if(before != "`"){
        const selectedText = editor.value.substring(start, end);
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
    } else {
        const selectedText = editor.value.substring(start, end);
        editor.value =
            editor.value.substring(0, start - startString.length)
            + before
            + selectedText
            + after
            + editor.value.substring(end + endString.length);
        editor.setSelectionRange(
            start + before.length,
            end + before.length
        )
    }
}

let renderMarkdown = function(){
    const content = document.getElementById("editor").value;
    let markdown = marked.parse(content);
    preview.innerHTML = markdown;
    updateLineNumbers();
}

let draggingDivider = function(){
    let divider = document.getElementById("slider");
    let dragging = false;
    let leftPanel = document.getElementsByClassName("left")[1];
    divider.addEventListener("mousedown", () => {
    if(divider) divider.addEventListener("mousedown", () => {
        dragging = true;
    })
    document.addEventListener("mouseup", () => {
        dragging = false;
    })
    document.addEventListener("mousemove", (event) => {
        if(dragging) {
            leftPanel.style.width = Math.min(Math.max(parseInt(event.clientX + "px"), parseInt("200px")), parseInt((window.innerWidth - 200) + "px"));
            document.body.style.userSelect = "none";
            document.body.style.cursor = "grabbing";
        } else {
            document.body.style.userSelect = "initial";
            document.body.style.cursor = "initial";
        }
    })
}
draggingDivider();

let lineCountDiv = document.querySelector("#lineCount");
let updateLineNumbers = function(){
    const lines = editor.value.split("\n");

    lineCountDiv.innerHTML = "";

    for(let i = 0; i < lines.length; i++){
    if(lineCountDiv) for(let i = 0; i < lines.length; i++){
        let lineNumberDiv = document.createElement("div");
        
        let lineNumber = document.createElement("p");
        lineNumber.innerText = (i + 1).toString();
        lineNumberDiv.append(lineNumber);
        lineCountDiv.append(lineNumberDiv);
    }
}
let scrollLineNumbers = function(){
    editor.addEventListener("scroll", () => {
    if(editor) editor.addEventListener("scroll", () => {
        lineCountDiv.scrollTop = editor.scrollTop;
    })
}
scrollLineNumbers();

let saveButton = document.getElementById("saveButton");
let saveCode = function(){
    if(saveButton) saveButton.addEventListener("click", () => {
        window.localStorage.setItem("code", editor.value);
        console.log(editor.value);
    });
}
    window.addEventListener("pagehide", () => {
        window.localStorage.setItem("savedCode", editor.value);
    });
};
saveCode();

let codePrompt = document.getElementById("prompt");
let promptYes = document.getElementById("yes");
let promptNo = document.getElementById("no");
let savedCodePrompt = function(){
    if (window.localStorage.getItem("code") !== window.localStorage.getItem("savedCode")) {
        codePrompt.classList.remove("hidden");
        promptYes.addEventListener("click", () => {
            console.log("yes");
            editor.value = window.localStorage.getItem("savedCode");
            window.localStorage.setItem("code", window.localStorage.getItem("savedCode"));
            codePrompt.classList.add("hidden");
            renderMarkdown();
        });
        promptNo.addEventListener("click", () => {
            console.log("no");
            codePrompt.classList.add("hidden");
        });
    }
}
savedCodePrompt();

let loadCode = function(){
    editor.value = window.localStorage.getItem("code") || "";
};
loadCode();

let settingsButton = document.getElementById("settingsButton");
let settingsMenu = document.getElementById("settingsMenu");
let settingsCloseButton = document.getElementById("settingsClose");
let toggleSettings = function(){
    if(settingsButton){
        settingsButton.addEventListener("click", () => {
            settingsMenu.classList.remove("hidden");
        });
        settingsCloseButton.addEventListener("click", () => {
            settingsMenu.classList.add("hidden"); 
        })
    }
};
toggleSettings();
