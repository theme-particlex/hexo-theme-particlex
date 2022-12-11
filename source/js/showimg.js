function showimg() {
    let wrap = document.getElementById("showimg"),
        content = document.getElementById("showimg-content"),
        imgs = document.querySelectorAll(".article .content img");
    function show(src) {
        content.setAttribute("src", src);
        wrap.style.opacity = 1;
        wrap.style.visibility = "visible";
    }
    function hide() {
        wrap.style.opacity = 0;
        wrap.style.visibility = "hidden";
    }
    for (let img of imgs)
        img.addEventListener("click", function () {
            show(this.getAttribute("src"));
        });
    wrap.addEventListener("click", function () {
        hide();
    });
    window.addEventListener("resize", function () {
        hide();
    });
}
