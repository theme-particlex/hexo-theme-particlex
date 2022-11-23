hljs.highlightAll();
hljs.configure({ ignoreUnescapedHTML: true });
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const App = Vue.createApp({
    data() {
        return {
            showpage: false,
            menushow: false,
            cardtop: 100,
            barlocal: 0,
        };
    },
    created() {
        let that = this;
        window.addEventListener("load", () => {
            that.showpage = true;
            document.getElementById("loading").style.opacity = 0;
            document.getElementById("loading").style.pointerEvents = "none";
            setTimeout(function () {
                document.body.removeChild(document.getElementById("loading"));
            }, 250);
        });
    },
    mounted() {
        if (document.getElementById("home-head"))
            document.getElementById("menu").className += " menu-color";
        window.addEventListener("scroll", this.handleScroll, true);
        let codes = document.getElementsByTagName("pre");
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
                '<i class="fa-solid fa-copy"></i><i class="fa-solid fa-clone"></i>';
            copycode.addEventListener(
                "click",
                (function () {
                    let copying = false;
                    return async function () {
                        if (copying) return;
                        copying = true;
                        copycode.classList.add("copied");
                        await navigator.clipboard.writeText(
                            this.parentElement.firstChild.innerText
                        );
                        await timeout(1000);
                        copycode.classList.remove("copied");
                        copying = false;
                    };
                })()
            );
            code.innerHTML = "";
            code.append(content, language, copycode);
        }
    },
    methods: {
        home_click() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            });
        },
        handleScroll() {
            let newlocal = document.documentElement.scrollTop;
            let menu = document.getElementById("menu");
            let that = this;
            if (this.barlocal < newlocal) {
                menu.className = "hidden-menu";
                that.menushow = false;
            } else menu.className = "show-menu";
            if (document.getElementById("home-posts-wrap"))
                if (newlocal <= window.innerHeight - 100) menu.className += " menu-color";
            this.barlocal = newlocal;
        },
    },
});
App.mount("#layout");
