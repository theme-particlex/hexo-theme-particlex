const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
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
            document.getElementById("loading").style.visibility = "hidden";
        });
    },
    mounted() {
        if (document.getElementById("home-head"))
            document.getElementById("menu").className += " menu-color";
        window.addEventListener("scroll", this.handleScroll, true);
        highlight();
        showimg();
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
            let wrap = document.getElementById("home-posts-wrap");
            let footer = document.getElementById("footer");
            let that = this;
            if (this.barlocal < newlocal) {
                menu.className = "hidden-menu";
                that.menushow = false;
            } else menu.className = "show-menu";
            if (wrap) {
                if (newlocal <= window.innerHeight - 100) menu.className += " menu-color";
                if (newlocal <= 400) {
                    wrap.style.top = -newlocal / 5 + "px";
                    footer.style.top = 150 - newlocal / 5 + "px";
                } else if (wrap.style.top != "-80px" || footer.style.top != "70px") {
                    wrap.style.top = "-80px";
                    footer.style.top = "70px";
                }
            }
            this.barlocal = newlocal;
        },
    },
});
App.mount("#layout");
