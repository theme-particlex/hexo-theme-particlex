function showimg() {
    let imgshow = document.getElementById("img_show"),
        imgcontent = document.getElementById("img_content"),
        imglist = document.querySelectorAll(".article .content img");
    function show(src) {
        imgcontent.setAttribute("src", src);
        imgshow.style.opacity = 1;
        imgshow.style.visibility = "visible";
    }
    function hide() {
        imgshow.style.opacity = 0;
        imgshow.style.visibility = "hidden";
    }
    for (let img of imglist)
        img.addEventListener("click", function () {
            show(this.getAttribute("src"));
        });
    imgshow.addEventListener("click", function () {
        hide();
    });
    window.addEventListener("resize", function () {
        hide();
    });
}
