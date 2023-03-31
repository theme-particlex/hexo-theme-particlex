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
            let codes = document.querySelectorAll("pre");
            for (let i of codes) {
                let code = i.innerText;
                let lang = [...i.classList, ...i.firstChild.classList][0] || "plaintext";
                i.innerHTML = `
                    <div class="code-content">${code}</div>
                    <div class="language">${lang}</div>
                    <div class="copycode">
                        <i class="fa-solid fa-copy fa-fw"></i>
                        <i class="fa-solid fa-clone fa-fw"></i>
                    </div>
                `;
                let content = i.querySelector(".code-content");
                let copycode = i.querySelector(".copycode");
                copycode.addEventListener("click", async () => {
                    if (this.copying) return;
                    this.copying = true;
                    copycode.classList.add("copied");
                    await navigator.clipboard.writeText(code);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    copycode.classList.remove("copied");
                    this.copying = false;
                });
                hljs.highlightElement(content);
            }
        },
    },
};
