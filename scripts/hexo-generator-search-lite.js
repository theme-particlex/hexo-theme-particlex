const config = hexo.config;
const path = config.search?.path || "search.json";
function procstr(str) {
    if (typeof str === "undefined" || str == null) return "";
    return str.toLowerCase().replace(/\s+/g, "");
}
hexo.extend.generator.register("json", locals => {
    let posts = locals.posts.sort("-date"),
        data = [];
    posts?.each(post => {
        if (post.nosearch) return;
        let sdata = procstr(post.title);
        if (post.categories) sdata += " " + post.categories.map(i => procstr(i.name)).join(" ");
        if (post.tags) sdata += " " + post.tags.map(i => procstr(i.name)).join(" ");
        data.push({
            path: config.root + post.path,
            sdata,
        });
    });
    let json = JSON.stringify(data);
    return { path: path, data: json };
});
