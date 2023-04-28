mixins.home = {
    mounted() {
        let background = this.$refs.homeBackground,
            images = background.dataset.images.split(","),
            id = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[id]}')`;
        this.menuColor = true;
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};
