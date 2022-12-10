function highlight() {
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
        copycode.innerHTML = '<i class="fa-solid fa-copy"></i><i class="fa-solid fa-clone"></i>';
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
