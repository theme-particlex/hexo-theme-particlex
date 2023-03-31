const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            showMenu: false,
            barLocal: 0,
            renderers: [],
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
