mixins.darkmode = {
    data() { return { isDark: false }; },
    created() {
        let colorTheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (!sessionStorage.getItem("NotFirstVisit") && colorTheme.matches) {
            this.switchDark(); sessionStorage.setItem("NotFirstVisit", true);
        } else { sessionStorage.setItem("NotFirstVisit", true); }
        sessionStorage.getItem("isDrek") ? this.switchDark() : this.switchLight();
        colorTheme.addEventListener('change', e => {
            e.matches ? this.switchDark() : this.switchLight()
        });
    },
    methods: {
        switchDark() {
            this.isDark = true;
            sessionStorage.setItem("isDrek", true);
            document.querySelector("#highlight-darkstyle").removeAttribute("disabled");
            document.querySelector("#darkstyle").removeAttribute("disabled");
        },
        switchLight() {
            this.isDark = false;
            sessionStorage.removeItem("isDrek");
            document.querySelector("#highlight-darkstyle").setAttribute("disabled", "");
            document.querySelector("#darkstyle").setAttribute("disabled", "");
        },
        handleThemeSwitch() { this.isDark ? this.switchLight() : this.switchDark(); },
    },
};
