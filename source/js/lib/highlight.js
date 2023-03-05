const highlightMixin = {
    data() {
        return { copying: false };
    },
    mounted() {
        hljs.configure({ ignoreUnescapedHTML: true });
    },
    methods: {
        highlight() {
            let that = this;
            let codes = document.getElementsByTagName("pre");
            for (let i of codes) {
                let lang = [...i.classList, ...i.firstChild.classList][0] || "plaintext";
                let code = i.innerText;
                i.innerHTML = `<div class="code-content">${code}</div><div class="language">${lang}</div><div class="copycode"><i class="fa-solid fa-copy fa-fw"></i><i class="fa-solid fa-clone fa-fw"></i></div>`;
                let copycode = i.getElementsByClassName("copycode")[0];
                copycode.addEventListener("click", async function () {
                    if (that.copying) return;
                    that.copying = true;
                    this.classList.add("copied");
                    await navigator.clipboard.writeText(code);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    this.classList.remove("copied");
                    that.copying = false;
                });
                let content = i.getElementsByClassName("code-content")[0];
                hljs.highlightElement(content);
            }
        },
    },
};
mixins.push(highlightMixin);
