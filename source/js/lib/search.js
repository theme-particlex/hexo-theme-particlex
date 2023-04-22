mixins.search = {
    data() {
        return { rawSearch: "" };
    },
    watch: {
        search(value) {
            let timeline = this.$refs.timeline.childNodes;
            for (let i of timeline)
                if (!value || i.dataset.title.includes(value)) {
                    i.style.opacity = 1;
                    i.style.visibility = "visible";
                    i.style.marginTop = 0;
                } else {
                    i.style.opacity = 0;
                    i.style.visibility = "hidden";
                    i.style.marginTop = -i.offsetHeight - 30 + "px";
                }
        },
    },
    computed: {
        search() {
            return this.rawSearch.toLowerCase().replace(/\s+/g, "");
        },
    },
};
