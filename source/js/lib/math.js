mixins.math = {
    created() {
        this.renderers.push(this.math);
    },
    methods: {
        math() {
            renderMathInElement(document.body, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                    { left: "\\(", right: "\\)", display: false },
                    { left: "\\[", right: "\\]", display: true },
                ],
            });
        },
    },
};
