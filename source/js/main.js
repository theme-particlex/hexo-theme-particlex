const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
            theme: localStorage.getItem("theme"),
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
        if (this.theme === null) {
            let media = window.matchMedia("(prefers-color-scheme: dark)");
            this.theme = media.matches ? "dark" : "light";
        }
        if (this.theme === "dark") {
            document.documentElement.classList.add("dark");
            document.querySelector("hljs-style-dark").setAttribute("disabled", "");
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
        handleThemeSwitch() {
            this.theme = this.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", this.theme);
            document.documentElement.classList.toggle("dark");
            document.querySelector("hljs-style-dark").toggleAttribute("disabled");
        },
    },
});
app.mount("#layout");
