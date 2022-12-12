function highlight() {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
    let codes = document.getElementsByTagName("pre");
    let copying = false;
    for (let code of codes) {
        const lang =
            code?.firstChild.className.split(/\s+/).filter(x => {
                return x != "sourceCode";
            })[0] || "text";
        let content = document.createElement("div");
        content.classList.add("code-content");
        content.innerHTML = code.innerHTML;
        let language = document.createElement("div");
        language.classList.add("language");
        language.innerHTML = lang;
        let copycode = document.createElement("div");
        copycode.classList.add("copycode");
        copycode.innerHTML =
            '<i class="fa-solid fa-copy fa-fw"></i><i class="fa-solid fa-clone fa-fw"></i>';
        copycode.addEventListener("click", async function () {
            if (copying) return;
            copying = true;
            copycode.classList.add("copied");
            await navigator.clipboard.writeText(this.parentElement.firstChild.innerText);
            await sleep(1000);
            copycode.classList.remove("copied");
            copying = false;
        });
        code.innerHTML = "";
        code.append(content, language, copycode);
    }
}
function showimg() {
    let wrap = document.getElementById("showimg"),
        content = document.getElementById("showimg-content"),
        imgs = document.querySelectorAll(".article .content img");
    function show(src) {
        content.setAttribute("src", src);
        wrap.style.opacity = 1;
        wrap.style.visibility = "visible";
    }
    function hide() {
        wrap.style.opacity = 0;
        wrap.style.visibility = "hidden";
    }
    for (let img of imgs)
        img.addEventListener("click", function () {
            show(this.getAttribute("src"));
        });
    wrap.addEventListener("click", function () {
        hide();
    });
    window.addEventListener("resize", function () {
        hide();
    });
}
function rendermath() {
    if (typeof renderMathInElement != "undefined")
        renderMathInElement(document.body, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: true },
            ],
        });
}
