function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let copying = false;
function highlight() {
    hljs.configure({ ignoreUnescapedHTML: true });
    let codes = document.getElementsByTagName("pre");
    for (let i of codes) {
        let lang = [...i.classList, ...i.firstChild.classList][0] || "text";
        i.innerHTML = `<div class="code-content">${i.innerHTML}</div><div class="language">${lang}</div><div class="copycode"><i class="fa-solid fa-copy fa-fw"></i><i class="fa-solid fa-clone fa-fw"></i></div>`;
        let copycode = i.getElementsByClassName("copycode")[0];
        copycode.addEventListener("click", async function () {
            if (copying) return;
            copying = true;
            this.classList.add("copied");
            await navigator.clipboard.writeText(this.parentElement.firstChild.innerText);
            await sleep(1000);
            this.classList.remove("copied");
            copying = false;
        });
        hljs.highlightElement(i.getElementsByClassName("code-content")[0]);
    }
}
function showimg() {
    let wrap = document.getElementById("showimg"),
        content = document.getElementById("showimg-content"),
        images = document.querySelectorAll(".article .content img");
    function show(src) {
        content.setAttribute("src", src);
        wrap.style.opacity = 1;
        wrap.style.visibility = "visible";
    }
    function hide() {
        wrap.style.opacity = 0;
        wrap.style.visibility = "hidden";
    }
    for (let i of images)
        i.addEventListener("click", function () {
            show(this.getAttribute("src"));
        });
    wrap.addEventListener("click", hide);
    window.addEventListener("resize", hide);
    window.addEventListener("scroll", hide);
}
function rendermath() {
    if (typeof renderMathInElement !== "undefined")
        renderMathInElement(document.body, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: true },
            ],
        });
}
function sha(str) {
    return CryptoJS.SHA256(str).toString(CryptoJS.enc.Base64);
}
function decrypt(encrypt, key, check) {
    try {
        let res = CryptoJS.AES.decrypt(encrypt, sha(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        return { decrypt: res, check: sha(res) == check };
    } catch {
        return { check: false };
    }
}
