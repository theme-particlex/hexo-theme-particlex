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
    procstr(str) {
        if (!str) return "";
        return str.toLowerCase().replace(/\s+/gm, "");
    },
    match(str, proc) {
        return str.indexOf(proc) != -1;
    },
    update() {
        let res = [],
            proc = this.procstr(this.input.value);
        if (proc) res = this.data.filter(i => this.match(i.odata, proc)).map(i => i.path);
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
