mixins.home = {
    mounted() {
        let menu = this.$refs.menu,
            background = this.$refs.homeBackground;
        menu.classList.add("menu-color");
        let image = background.dataset.image.split(",");
        let id = Math.floor(Math.random() * image.length);
        background.style.backgroundImage = `url('${image[id]}')`;
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};
