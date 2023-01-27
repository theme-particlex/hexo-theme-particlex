const app = Vue.createApp({
    data() {
        return {
            showpage: false,
            menushow: false,
            cardtop: 100,
            barlocal: 0,
            composition: false,
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.showpage = true;
            document.getElementById("loading").style.opacity = 0;
            document.getElementById("loading").style.visibility = "hidden";
        });
    },
    mounted() {
        if (document.getElementById("home-head"))
            document.getElementById("menu").className += " menu-color";
        if (document.getElementById("crypto")) {
            let input = document.getElementById("crypto");
            input.addEventListener("input", () => {
                if (!this.composition) this.handlecrypto();
            });
            input.addEventListener("compositionstart", () => {
                this.composition = true;
            });
            input.addEventListener("compositionend", () => {
                this.handlecrypto();
                this.composition = false;
            });
        }
        if (document.getElementById("search-bar")) {
            let input = document.getElementById("search-bar");
            input.addEventListener("input", () => {
                if (!this.composition) this.handlesearch();
            });
            input.addEventListener("compositionstart", () => {
                this.composition = true;
            });
            input.addEventListener("compositionend", () => {
                this.handlesearch();
                this.composition = false;
            });
        }
        window.addEventListener("scroll", this.handlescroll, true);
        this.render();
    },
    methods: {
        homeclick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
        render() {
            highlight();
            showimg();
            rendermath();
        },
        handlescroll() {
            let newlocal = document.documentElement.scrollTop;
            let menu = document.getElementById("menu");
            let wrap = document.getElementById("home-posts-wrap");
            if (this.barlocal < newlocal) {
                menu.className = "hidden-menu";
                this.menushow = false;
            } else menu.className = "show-menu";
            if (wrap) {
                if (newlocal <= window.innerHeight - 100) menu.className += " menu-color";
                if (newlocal <= 400) wrap.style.marginTop = newlocal / -5 + "px";
                else wrap.style.marginTop = "-80px";
            }
            this.barlocal = newlocal;
        },
        handlecrypto() {
            let input = document.getElementById("crypto"),
                content = document.getElementsByClassName("content")[0];
            let res = decrypt(input.dataset.encrypt, input.value, input.dataset.shasum);
            if (res.check) {
                input.disabled = true;
                input.classList.remove("fail");
                input.classList.add("success");
                content.innerHTML = res.decrypt;
                content.style.opacity = 1;
                this.render();
            } else input.classList.add("fail");
        },
        handlesearch() {
            let input = document.getElementById("search-bar"),
                timeline = document.getElementsByClassName("timeline"),
                key = input.value.toLowerCase().replace(/s+/gm, "");
            for (let i of timeline)
                if (!key || i.dataset.title.includes(key)) {
                    i.style.opacity = 1;
                    i.style.pointerEvents = "";
                    i.style.marginTop = "";
                } else {
                    i.style.opacity = 0;
                    i.style.pointerEvents = "none";
                    i.style.marginTop = -i.offsetHeight - 30 + "px";
                }
        },
    },
});
app.mount("#layout");
