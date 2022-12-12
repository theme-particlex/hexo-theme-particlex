const searcher = {
    init(path) {
        this.composition = false;
        window.addEventListener("load", () => {
            this.input = document.getElementsByClassName("search-bar")[0];
            this.timeline = document.getElementsByClassName("timeline");
            this.input.addEventListener("input", () => this.composition || this.update());
            this.input.addEventListener("compositionstart", () => (this.composition = true));
            this.input.addEventListener("compositionend", () => {
                this.update(), (this.composition = false);
            });
            fetch(path)
                .then(res => res.json())
                .then(data => {
                    this.data = data;
                });
        });
    },
    rstr(s) {
        if (!s) return "";
        return s.toLowerCase().replace(/\s+/gm, "");
    },
    match(s, rs) {
        return s.indexOf(rs) != -1;
    },
    update() {
        let res = [],
            rs = this.rstr(this.input.value);
        if (rs) res = this.data.filter(i => this.match(i.odata, rs)).map(i => i.path);
        else res = this.data.map(i => i.path);
        for (let line of this.timeline)
            if (res.indexOf(line.getAttribute("path")) == -1) {
                line.style.opacity = 0;
                line.style.pointerEvents = "none";
                line.style.marginTop = -line.offsetHeight - 30 + "px";
            } else {
                line.style.opacity = 1;
                line.style.pointerEvents = "";
                line.style.marginTop = "";
            }
    },
};
