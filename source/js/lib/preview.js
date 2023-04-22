mixins.preview = {
    data() {
        return { previewShow: false };
    },
    created() {
        this.renderers.push(this.preview);
    },
    methods: {
        preview() {
            let preview = this.$refs.preview,
                content = this.$refs.previewContent;
            let images = document.querySelectorAll("img");
            for (let i of images)
                i.addEventListener("click", () => {
                    content.alt = i.alt;
                    content.src = i.src;
                    this.previewShow = true;
                });
            preview.addEventListener("click", () => {
                this.previewShow = false;
            });
            window.addEventListener("resize", () => {
                this.previewShow = false;
            });
        },
    },
};
