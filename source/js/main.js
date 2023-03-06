const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return { loading: true, showMenu: false, barLocal: 0 };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        if (this.$refs.homePostsWrap) {
            this.$refs.menu.classList.add("menu-color");
            const { background } = themeConfig
            if (background.length > 0) {
                const bgElement = document.getElementById("home-background")
                if (bgElement) {
                    const randomIndex = Math.floor(Math.random() * background.length)
                    bgElement.style.backgroundImage = `url('${background[randomIndex]}')`
                }
            }
        }
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            if (typeof this.renderers === "undefined") return;
            for (let i of this.renderers) i();
        },
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
        handleScroll() {
            let menu = this.$refs.menu,
                wrap = this.$refs.homePostsWrap;
            let newlocal = document.documentElement.scrollTop;
            if (this.barLocal < newlocal) {
                this.showMenu = false;
                menu.classList.add("hidden");
            } else menu.classList.remove("hidden");
            if (wrap) {
                if (newlocal <= window.innerHeight - 100) menu.classList.add("menu-color");
                else menu.classList.remove("menu-color");
                if (newlocal <= 400) wrap.style.marginTop = -newlocal / 5 + "px";
                else wrap.style.marginTop = "-80px";
            }
            this.barLocal = newlocal;
        },
    },
});
app.mount("#layout");
