/* ==================================================
   GET ELEMENTS
================================================== */

const htmlCode =
    document.getElementById("htmlCode");

const cssCode =
    document.getElementById("cssCode");

const jsCode =
    document.getElementById("jsCode");

const preview =
    document.getElementById("preview");

const runBtn =
    document.getElementById("runBtn");

const clearBtn =
    document.getElementById("clearBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const themeBtn =
    document.getElementById("themeBtn");

const refreshBtn =
    document.getElementById("refreshBtn");

const autoRunBtn =
    document.getElementById("autoRunBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const clearConsoleBtn =
    document.getElementById("clearConsoleBtn");

const consoleOutput =
    document.getElementById("consoleOutput");


const htmlLines =
    document.getElementById("htmlLines");

const cssLines =
    document.getElementById("cssLines");

const jsLines =
    document.getElementById("jsLines");


/* ==================================================
   DEFAULT CODE
================================================== */

const defaultHTML = `<div class="container">

    <h1>Hello, World!</h1>

    <p>
        Welcome to my Code Editor.
    </p>

    <button onclick="showMessage()">
        Click Me
    </button>

</div>`;


const defaultCSS = `body {

    font-family: Arial, sans-serif;

    background: #f1f5f9;

    text-align: center;

    padding: 50px;
}


.container {

    background: white;

    padding: 40px;

    border-radius: 15px;

    max-width: 500px;

    margin: auto;

    box-shadow:
        0 10px 30px
        rgba(0, 0, 0, 0.1);
}


h1 {

    color: #2563eb;
}


p {

    color: #475569;
}


button {

    background: #2563eb;

    color: white;

    border: none;

    padding: 12px 25px;

    border-radius: 8px;

    cursor: pointer;
}


button:hover {

    background: #1d4ed8;
}`;


const defaultJS = `function showMessage() {

    console.log("Button clicked!");

    alert("Hello! Welcome to my CodeEditor.");

}`;


/* ==================================================
   AUTO RUN
================================================== */

let autoRun = true;


/* ==================================================
   LOAD SAVED CODE
================================================== */

function loadCode() {

    const savedHTML =
        localStorage.getItem(
            "codeEditorHTML"
        );

    const savedCSS =
        localStorage.getItem(
            "codeEditorCSS"
        );

    const savedJS =
        localStorage.getItem(
            "codeEditorJS"
        );


    htmlCode.value =
        savedHTML !== null
            ? savedHTML
            : defaultHTML;


    cssCode.value =
        savedCSS !== null
            ? savedCSS
            : defaultCSS;


    jsCode.value =
        savedJS !== null
            ? savedJS
            : defaultJS;


    updateLineNumbers();

    runCode();
}


/* ==================================================
   RUN CODE
================================================== */

function runCode() {

    clearConsole();

    const html =
        htmlCode.value;

    const css =
        cssCode.value;

    const javascript =
        jsCode.value;

   fetch("/api/run", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        html: html,
        css: css,
        javascript: javascript
    })
})
.then(response => response.text())
.then(result => {
    console.log("Backend:", result);
})
.catch(error => {
    console.error("Backend error:", error);
});


    const output = `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

${css}

</style>

</head>

<body>

${html}

<script>

(function() {

    function sendToParent(type, args) {

        try {

            window.parent.postMessage({

                source: "code-editor",

                type: type,

                message: args.map(function(item) {

                    try {

                        if (
                            typeof item === "object"
                            && item !== null
                        ) {

                            return JSON.stringify(
                                item,
                                null,
                                2
                            );

                        }

                        return String(item);

                    } catch(e) {

                        return String(item);

                    }

                }).join(" ")

            }, "*");

        } catch(e) {

            console.error(e);

        }

    }


    const originalLog =
        console.log;

    const originalInfo =
        console.info;

    const originalWarn =
        console.warn;

    const originalError =
        console.error;


    console.log = function() {

        sendToParent(
            "log",
            Array.from(arguments)
        );

        originalLog.apply(
            console,
            arguments
        );

    };


    console.info = function() {

        sendToParent(
            "info",
            Array.from(arguments)
        );

        originalInfo.apply(
            console,
            arguments
        );

    };


    console.warn = function() {

        sendToParent(
            "warning",
            Array.from(arguments)
        );

        originalWarn.apply(
            console,
            arguments
        );

    };


    console.error = function() {

        sendToParent(
            "error",
            Array.from(arguments)
        );

        originalError.apply(
            console,
            arguments
        );

    };


    window.onerror = function(
        message,
        source,
        lineno,
        colno
    ) {

        sendToParent(
            "error",
            [
                message +
                " (Line " +
                lineno +
                ")"
            ]
        );

    };


    try {

    window.eval(${JSON.stringify(javascript)});

} catch(error) {

    sendToParent(
        "error",
        [
            error.name +
            ": " +
            error.message
        ]
    );

}

})();

<\/script>

</body>

</html>
`;


    preview.srcdoc =
        output;


    saveCode();


    addConsoleMessage(
        "Code executed successfully.",
        "success"
    );
}


/* ==================================================
   RECEIVE CONSOLE MESSAGES
================================================== */

window.addEventListener(
    "message",
    function(event) {

        if (
            !event.data ||
            event.data.source !==
            "code-editor"
        ) {

            return;

        }


        addConsoleMessage(
            event.data.message,
            event.data.type
        );

    }
);


/* ==================================================
   CONSOLE MESSAGE
================================================== */

function addConsoleMessage(
    message,
    type = "log"
) {

    const welcome =
        consoleOutput.querySelector(
            ".console-welcome"
        );


    if (welcome) {

        welcome.remove();

    }


    const line =
        document.createElement("div");


    line.className =
        "console-line console-" +
        type;


    line.textContent =
        "> " + message;


    consoleOutput.appendChild(
        line
    );


    consoleOutput.scrollTop =
        consoleOutput.scrollHeight;
}


/* ==================================================
   CLEAR CONSOLE
================================================== */

function clearConsole() {

    consoleOutput.innerHTML =
        '<div class="console-welcome">' +
        'Console ready...' +
        '</div>';
}


clearConsoleBtn.addEventListener(
    "click",
    clearConsole
);


/* ==================================================
   SAVE CODE
================================================== */

function saveCode() {

    localStorage.setItem(
        "codeEditorHTML",
        htmlCode.value
    );

    localStorage.setItem(
        "codeEditorCSS",
        cssCode.value
    );

    localStorage.setItem(
        "codeEditorJS",
        jsCode.value
    );
}


/* ==================================================
   CLEAR ALL CODE
================================================== */

function clearCode() {

    const confirmation =
        confirm(
            "Are you sure you want to clear all code?"
        );


    if (!confirmation) {

        return;

    }


    htmlCode.value = "";

    cssCode.value = "";

    jsCode.value = "";


    localStorage.removeItem(
        "codeEditorHTML"
    );

    localStorage.removeItem(
        "codeEditorCSS"
    );

    localStorage.removeItem(
        "codeEditorJS"
    );


    updateLineNumbers();

    clearConsole();

    runCode();
}


clearBtn.addEventListener(
    "click",
    clearCode
);


/* ==================================================
   LINE NUMBERS
================================================== */

function updateLineNumbersFor(
    textarea,
    lineContainer
) {

    const lineCount =
        textarea.value.split("\n").length;


    let numbers = "";


    for (
        let i = 1;
        i <= lineCount;
        i++
    ) {

        numbers +=
            i + "<br>";

    }


    lineContainer.innerHTML =
        numbers;
}


function updateLineNumbers() {

    updateLineNumbersFor(
        htmlCode,
        htmlLines
    );

    updateLineNumbersFor(
        cssCode,
        cssLines
    );

    updateLineNumbersFor(
        jsCode,
        jsLines
    );
}


/* ==================================================
   AUTO SAVE + AUTO RUN
================================================== */

function handleEditorInput(
    textarea,
    lineContainer
) {

    updateLineNumbersFor(
        textarea,
        lineContainer
    );


    saveCode();


    if (autoRun) {

        clearTimeout(
            window.runTimer
        );


        window.runTimer =
            setTimeout(
                runCode,
                500
            );

    }
}


htmlCode.addEventListener(
    "input",
    function() {

        handleEditorInput(
            htmlCode,
            htmlLines
        );

    }
);


cssCode.addEventListener(
    "input",
    function() {

        handleEditorInput(
            cssCode,
            cssLines
        );

    }
);


jsCode.addEventListener(
    "input",
    function() {

        handleEditorInput(
            jsCode,
            jsLines
        );

    }
);


/* ==================================================
   SCROLL SYNCHRONIZATION
================================================== */

function syncScroll(
    textarea,
    lineContainer
) {

    lineContainer.scrollTop =
        textarea.scrollTop;
}


htmlCode.addEventListener(
    "scroll",
    function() {

        syncScroll(
            htmlCode,
            htmlLines
        );

    }
);


cssCode.addEventListener(
    "scroll",
    function() {

        syncScroll(
            cssCode,
            cssLines
        );

    }
);


jsCode.addEventListener(
    "scroll",
    function() {

        syncScroll(
            jsCode,
            jsLines
        );

    }
);


/* ==================================================
   TAB SUPPORT
================================================== */

function enableTabSupport(
    textarea
) {

    textarea.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Tab"
            ) {

                event.preventDefault();


                const start =
                    this.selectionStart;

                const end =
                    this.selectionEnd;


                this.value =
                    this.value.substring(
                        0,
                        start
                    ) +
                    "    " +
                    this.value.substring(
                        end
                    );


                this.selectionStart =
                    this.selectionEnd =
                    start + 4;


                updateLineNumbers();

                saveCode();

            }

        }
    );
}


enableTabSupport(htmlCode);

enableTabSupport(cssCode);

enableTabSupport(jsCode);


/* ==================================================
   CTRL + S - SAVE CODE
================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            saveCode();

        }

    }
);


/* ==================================================
   THEME SWITCH
================================================== */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light-theme"
        );


        const isLight =
            document.body.classList.contains(
                "light-theme"
            );


        themeBtn.textContent =
            isLight
                ? "☀️ Dark Theme"
                : "🌙 Light Theme";


        localStorage.setItem(
            "codeEditorTheme",
            isLight
                ? "light"
                : "dark"
        );

    }
);


/* ==================================================
   LOAD THEME
================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "codeEditorTheme"
        );


    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        themeBtn.textContent =
            "☀️ Dark Theme";

    }

}


/* ==================================================
   AUTO RUN BUTTON
================================================== */

autoRunBtn.addEventListener(
    "click",
    function() {

        autoRun =
            !autoRun;


        autoRunBtn.textContent =
            autoRun
                ? "⚡ Auto Run: ON"
                : "⚡ Auto Run: OFF";

    }
);


/* ==================================================
   REFRESH PREVIEW
================================================== */

refreshBtn.addEventListener(
    "click",
    function() {

        runCode();

    }
);


/* ==================================================
   FULLSCREEN PREVIEW
================================================== */

fullscreenBtn.addEventListener(
    "click",
    function() {

        const section =
            document.querySelector(
                ".preview-section"
            );


        section.classList.toggle(
            "fullscreen"
        );


        const isFullscreen =
            section.classList.contains(
                "fullscreen"
            );


        fullscreenBtn.textContent =
            isFullscreen
                ? "✕ Exit Fullscreen"
                : "⛶ Fullscreen";

    }
);


/* ==================================================
   DOWNLOAD PROJECT
================================================== */

function downloadProject() {

    const html =
        htmlCode.value;

    const css =
        cssCode.value;

    const javascript =
        jsCode.value;


    const completeHTML = `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>My Code Editor Project</title>

<link rel="stylesheet"
href="style.css">

</head>

<body>

${html}

<script src="script.js"><\/script>

</body>

</html>
`;


    downloadFile(
        "index.html",
        completeHTML
    );


    setTimeout(
        function() {

            downloadFile(
                "style.css",
                css
            );

        },
        300
    );


    setTimeout(
        function() {

            downloadFile(
                "script.js",
                javascript
            );

        },
        600
    );


    addConsoleMessage(
        "Project downloaded successfully.",
        "success"
    );
}


/* ==================================================
   DOWNLOAD HELPER
================================================== */

function downloadFile(
    filename,
    content
) {

    const blob =
        new Blob(
            [content],
            {
                type:
                    "text/plain"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );
}


/* ==================================================
   BUTTON EVENTS
================================================== */

runBtn.addEventListener(
    "click",
    runCode
);


downloadBtn.addEventListener(
    "click",
    downloadProject
);


/* ==================================================
   INITIALIZE
================================================== */

loadTheme();

loadCode();
/* =====================================================
   KEYBOARD SHORTCUTS GUIDE
===================================================== */

const shortcutsBtn = document.getElementById("shortcutsBtn");

shortcutsBtn.addEventListener("click", function () {
   alert(
    "⌨ Keyboard Shortcuts\n\n" +
    "Ctrl + Enter  →  Run Code\n" +
    "Ctrl + S      →  Save Code\n" +
    "Tab           →  Indent Code\n\n" +
    "Use these shortcuts to work faster!"
);
});
// ==========================================
// BACKEND CONNECTION TEST
// ==========================================

async function testBackend() {
    try {
        const response = await fetch("/api/test");
        const message = await response.text();

        console.log("Backend response:", message);
    } catch (error) {
        console.error("Backend connection failed:", error);
    }
}

testBackend();