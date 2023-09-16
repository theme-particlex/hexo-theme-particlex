mixins.darkmode = {
    data() {
        return {
            theme: localStorage.getItem("theme"),
        };
    },
    created() {
        if (this.theme === null) {
            let media = window.matchMedia("(prefers-color-scheme: dark)");
            this.theme = media.matches ? "dark" : "light";
        }
        if (this.theme === "dark") {
            document.documentElement.classList.add("dark");
            document.querySelector("hljs-style-dark").setAttribute("disabled", "");
        }
    },
    methods: {
        handleThemeSwitch() {
            this.theme = this.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", this.theme);
            document.documentElement.classList.toggle("dark");
            document.querySelector("hljs-style-dark").toggleAttribute("disabled");
        },
    },
};
