mixins.highlight = {
    data() {
        return {
            copying: false,
        };
    },
    created() {
        hljs.configure({ ignoreUnescapedHTML: true });
        this.renderers.push(this.highlight);
    },
    methods: {
        highlight() {
            let that = this;
            let codes = document.querySelectorAll("pre");
            for (let i of codes) {
                let lang = [...i.classList, ...i.firstChild.classList][0] || "plaintext";
                let code = i.innerText;
                i.innerHTML = `<div class="code-content">${code}</div><div class="language">${lang}</div><div class="code-copy"><i class="fa-solid fa-copy fa-fw"></i><i class="fa-solid fa-clone fa-fw"></i></div>`;
                let copy = i.querySelector(".code-copy");
                copy.addEventListener("click", async function () {
                    if (that.copying) return;
                    that.copying = true;
                    this.classList.add("copied");
                    await navigator.clipboard.writeText(code);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    this.classList.remove("copied");
                    that.copying = false;
                });
                let content = i.querySelector(".code-content");
                hljs.highlightElement(content);
            }
        },
    },
};
