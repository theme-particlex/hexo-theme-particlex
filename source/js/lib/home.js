mixins.home = {
    mounted() {
        let background = this.$refs.homeBackground;
        let images = background.dataset.images.split(",");
        let id = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[id]}')`;
        this.menuColor = true;
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};
