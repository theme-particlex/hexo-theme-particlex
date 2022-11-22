const config = hexo.config;
const path = config.search?.path || "search.json";
hexo.extend.generator.register("json", locals => {
    let posts = locals.posts.sort("-date"),
        data = [];
    posts?.each(post => {
        if (post.nosearch) return;
        data.push({
            path: config.root + post.path,
            title: post.title,
            date: post.date.format("YYYY/M/D"),
            tags: post.tags?.map(tag => ({ name: tag.name, path: config.root + tag.path })),
            categories: post.categories?.map(category => ({
                name: category.name,
                path: config.root + category.path,
            })),
        });
    });
    let json = JSON.stringify(data);
    return { path: path, data: json };
});
