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
            theme: localStorage.getItem("theme") || "auto",
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
        if (this.theme === "auto")
            this.isSystemDarkMode() ? this.setDarkMode(true) : this.setDarkMode(false);
        else
            this.theme === "dark" ? this.setDarkMode(true) : this.setDarkMode(false);
        window.addEventListener("beforeunload", () => {
            if (this.theme === "auto") localStorage.removeItem("theme");
            else localStorage.setItem("theme", this.theme);
        });
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
        isSystemDarkMode() {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        },
        /**
         * @param {boolean} dark 
         */
        setDarkMode(dark) {
            if (dark) {
                document.documentElement.classList.add("dark");
                document
                .getElementById("highlight-style-dark")
                .removeAttribute("disabled");
            } else {
                document.documentElement.classList.remove("dark");
                document
                .getElementById("highlight-style-dark")
                .setAttribute("disabled", "");
            }
        },
        handleThemeSwitch() {
            this.theme = ((theme) => {
                switch (theme) {
                case "auto": // auto -> light
                    this.setDarkMode(false);
                    return "light";
                case "light": // light -> dark
                    this.setDarkMode(true)
                    return "dark";
                case "dark": // dark -> auto
                    this.isSystemDarkMode() ? this.setDarkMode(true) : this.setDarkMode(false);
                    return "auto";
            }})(this.theme)
        },
    },
});
app.mount("#layout");
