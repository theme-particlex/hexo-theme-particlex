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
            theme: localStorage.theme || "auto",
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            if (typeof this.renderers === "undefined") return;
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
            switch (this.theme) {
                case "auto": //目前是自动，要切换成浅色
                    document.documentElement.classList.remove("dark");
                    localStorage.theme = "light";
                    this.theme = "light";
                    break;
                case "light": //目前是浅色，要切换成深色
                    document.documentElement.classList.add("dark");
                    localStorage.theme = "dark";
                    this.theme = "dark";
                    break;
                case "dark": //目前是深色，要切换成自动
                    window.matchMedia("(prefers-color-scheme: dark)").matches || //系统不是深色模式
                        document.documentElement.classList.remove("dark");
                    localStorage.removeItem("theme");
                    this.theme = "auto";
                    break;
            }
        },
    },
});
app.mount("#layout");
