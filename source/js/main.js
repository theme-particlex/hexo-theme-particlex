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
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
            document.getElementById("main").className = "into-enter-active";
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
                wrap.style.top = -Math.min(newScrollTop / 5, 80) + "px";
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
