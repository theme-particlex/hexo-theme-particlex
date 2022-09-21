hljs.highlightAll();
hljs.configure({ ignoreUnescapedHTML: true });
const App = Vue.createApp({
    data() {
        return {
            show_page: false,
            menu_show: false,
            card_top: 100,
            bar_local: 0,
        };
    },
    created() {
        var that = this;
        window.addEventListener("load", () => {
            that.show_page = true;
            document.getElementById("loading").style.opacity = 0;
            setTimeout(function () {
                document.getElementById("loading").style.display = "none";
            }, 300);
        });
    },
    mounted() {
        if (document.getElementById("home-head"))
            document.getElementById("menu").className += " menu-color";
        window.addEventListener("scroll", this.handleScroll, true);
        var codes = document.getElementsByTagName("pre");
        for (var code of codes) {
            const lang = code.firstChild.className.split(/\s+/).filter((x) => {
                return x != "sourceCode";
            })[0];
            if (!lang) lang = "text";
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
            copycode.addEventListener("click", async function () {
                await navigator.clipboard.writeText(
                    this.parentElement.firstChild.innerText
                );
                copycode.classList.add("copied");
                setTimeout(() => {
                    copycode.classList.remove("copied");
                }, 1500);
            });
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
            var new_local = document.documentElement.scrollTop;
            var menu = document.getElementById("menu");
            var that = this;
            if (this.bar_local < new_local) {
                menu.className = "hidden-menu";
                that.menu_show = false;
            } else menu.className = "show-menu";
            if (document.getElementById("home-posts-wrap"))
                if (new_local <= window.innerHeight - 100)
                    menu.className += " menu-color";
            this.bar_local = new_local;
        },
    },
});
App.mount("#layout");
