hljs.highlightAll();
hljs.configure({ ignoreUnescapedHTML: true });
var codes = document.getElementsByTagName("pre");
for (var i = 0; i < codes.length; i++) {
    var lang = codes[i].firstChild.className.split(/\s+/).filter((x) => {
        return x != "sourceCode";
    })[0];
    if (!lang) lang = "text";
    codes[i].innerHTML += '<div class="language">' + lang + "</div>";
}
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
        window.onload = function () {
            that.show_page = true;
            document.getElementById("loading").style.opacity = 0;
            setTimeout(function () {
                document.getElementById("loading").style.display = "none";
            }, 300);
        };
    },
    mounted() {
        if (document.getElementById("home-head"))
            document.getElementById("menu").className += " menu-color";
        window.addEventListener("scroll", this.handleScroll, true);
        for (let index = 0; index < codes.length; index++) {
            const codeblock = codes[index];
            const copyCode = document.createElement("span");
            copyCode.className = "copyCode"
            copyCode.innerText = "复制代码";
            copyCode.addEventListener('click', async function () {
                await navigator.clipboard.writeText(this.parentElement.firstChild.innerText)
                copyCode.innerText = "复制成功！！"
                setTimeout(() => { copyCode.innerText = "复制代码" }, 3000)
            })
            codeblock.appendChild(copyCode);
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
