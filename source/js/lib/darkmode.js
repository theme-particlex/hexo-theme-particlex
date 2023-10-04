let theme = localStorage.getItem("theme");
if (theme === null) {
    let media = window.matchMedia("(prefers-color-scheme: dark)");
    theme = media.matches ? "dark" : "light";
}
if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.querySelector("#hljs-style-dark").toggleAttribute("disabled");
}
mixins.darkmode = {
    data() {
        return { theme };
    },
    methods: {
        handleThemeSwitch() {
            this.theme = this.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", this.theme);
            document.documentElement.classList.toggle("dark");
            document.querySelector("#hljs-style-dark").toggleAttribute("disabled");
        },
    },
};
