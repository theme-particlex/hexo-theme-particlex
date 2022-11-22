const Searcher = (() => {
    const rstr = s => s.toLowerCase().replace(/\s+/g, "");
    const match = (reg, str) => rstr(str).indexOf(rstr(reg)) != -1;
    return class {
        constructor(path) {
            this.path = path;
            this.data = null;
        }
        async init() {
            await fetch(this.path)
                .then(res => res.json())
                .then(data => (this.data = data));
        }
        search(key) {
            if (rstr(key) == "") return this.data;
            let res = [];
            this.data.map(d => {
                let flag = false;
                if (match(key, d.title)) flag = true;
                for (let i of d.tags) if (match(key, i.name)) flag = true;
                for (let i of d.categories) if (match(key, i.name)) flag = true;
                if (flag) res.push(d);
            });
            return res;
        }
    };
})();
