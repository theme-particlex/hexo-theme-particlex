const SEARCH_REGX = "<img src="
const IMAGE_URL_FILED = 'lazy'
if (!hexo.config.lazyload?.disabled) {
  hexo.extend.filter.register('after_post_render', function(data){
    if (data.content && data.content.replaceAll) {
      data.content = data.content.replaceAll(SEARCH_REGX, `<img ${IMAGE_URL_FILED}=`)
    }
    return data;
  });
}
