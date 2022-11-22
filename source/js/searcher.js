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
    procstring(str) {
        return str.toLowerCase().replace(/\s+/g, "");
    },
    match(str) {
        return this.procstring(str).indexOf(this.procstring(this.input.value)) != -1;
    },
    update() {
        let res = [];
        if (this.procstring(this.input.value) == "") res = this.data.map(i => i.path);
        else
            this.data.map(data => {
                let flag = false;
                if (this.match(data.title)) flag = true;
                for (let i of data.tags) if (this.match(i.name)) flag = true;
                for (let i of data.categories) if (this.match(i.name)) flag = true;
                if (flag) res.push(data.path);
            });
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
