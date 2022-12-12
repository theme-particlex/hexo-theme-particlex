const sleep = ms => new Promise(res => setTimeout(res, ms));
let copying = false;
function highlight() {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
    let codes = document.getElementsByTagName("pre");
    for (let code of codes) {
        const lang = [].filter.call(code.classList, lang => lang != "sourceCode")[0] || "text";
        code.innerHTML = `<div class="code-content">${code.innerHTML}</div><div class="language">${lang}</div><div class="copycode"><i class="fa-solid fa-copy fa-fw"></i><i class="fa-solid fa-clone fa-fw"></i></div>`;
        let copycode = code.getElementsByClassName("copycode")[0];
        copycode.addEventListener("click", async function () {
            if (copying) return;
            copying = true;
            this.classList.add("copied");
            await navigator.clipboard.writeText(this.parentElement.firstChild.innerText);
            await sleep(1000);
            this.classList.remove("copied");
            copying = false;
        });
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
    wrap.addEventListener("click", () => hide());
    window.addEventListener("resize", () => hide());
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
