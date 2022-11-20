(function () {
    var imgshow = document.getElementById("img_show"),
        imgcontent = document.getElementById("img_content"),
        imglist = document.querySelectorAll(".article .content img");
    function show(src) {
        imgcontent.setAttribute("src", src);
        imgshow.style.opacity = 1;
        imgshow.style.pointerEvents = "auto";
    }
    function hide() {
        imgshow.style.opacity = 0;
        imgshow.style.pointerEvents = "none";
    }
    for (var img of imglist)
        img.addEventListener("click", function () {
            show(this.getAttribute("src"));
        });
    imgshow.addEventListener("click", function () {
        hide();
    });
    window.addEventListener("resize", function () {
        hide();
    });
})();
