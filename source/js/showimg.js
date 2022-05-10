(function () {
    var imgshow = document.getElementById("img_show"),
        imgcontent = document.getElementById("img_content"),
        imglist = document.querySelectorAll(".article .content img");
    function show(src) {
        imgcontent.setAttribute("src", src);
        imgshow.style.display = "flex";
        setTimeout(function () {
            imgshow.style.opacity = 1;
        }, 5);
    }
    function hide() {
        imgshow.style.opacity = 0;
        setTimeout(function () {
            imgshow.removeAttribute("style");
            document.body.removeAttribute("style");
        }, 250);
    }
    for (var img of imglist)
        img.addEventListener("click", function () {
            show(img.getAttribute("src"));
        });
    imgshow.addEventListener("click", function () {
        hide();
    });
    window.addEventListener("resize", function () {
        hide();
    });
})();
