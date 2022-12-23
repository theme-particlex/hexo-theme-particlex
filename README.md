# Hexo-Theme-ParticleX

[Hexo-Theme-ParticleX](https://github.com/argvchs/hexo-theme-particlex) 主题，诞生原因是因为原来的 [Particle](https://github.com/korilin/hexo-theme-particle) 主题不维护了，但是我觉得还是很好的

原来用的是 Vue2 + AntdVue1，现更新到 Vue3，去除 AntdVue 采用自定义样式，图标更改为 FontAwesome 6，将不能用的 JsDelivr 改为 Staticfile CDN

原项目 `README.md` 里说：

> 目前有 full、night 和 maiden **两个**主题样式

~~虽然更改后只有一种了，如果你想改颜色就在 `particlex.css` 里 `Ctrl+F` 替换吧~~

## 演示地址

-   Github Pages <https://argvchs.github.io>
-   Netlify <https://argvchs.netlify.app>
-   Vercel <https://argvchs.vercel.app>

## 安装

```bash
cd themes
git clone https://github.com/argvchs/hexo-theme-particlex.git particlex --depth=1
```

## 关闭自带 Highlight

到博客根目录下的 `_config.yml`，找到 `highlight` 和 `prismjs` 参数，设置为如下：

```yaml
highlight:
    enable: false
    line_number: true
    auto_detect: false
    tab_replace: ""
    wrap: true
    hljs: false
prismjs:
    enable: false
    preprocess: true
    line_number: true
    tab_replace: ""
```

修改完请清除缓存：`hexo cl`

## 配置

```yaml
language: # Language
avatar: # Avatar URL
head_block_enable: true
home_background: # Background URL
```

-   导航栏配置

    为了方便，主题使用的图标是 FontAwesome 6 图标，地址为：<https://fontawesome.com/search>

    ```yaml
    menu:
        home:
            name: house
            theme: solid
            src: /
        about:
            name: id-card
            theme: solid
            src: /about
        archives:
            name: box-archive
            theme: solid
            src: /archives
        categories:
            name: bookmark
            theme: solid
            src: /categories
        tags:
            name: tags
            theme: solid
            src: /tags
        # <name>:
        #     name: <icon-name>
        #     theme: <icon-theme>
        #     src: <link-url>
    ```

-   主页信息卡片

    和导航栏配置差不多

    `description` 支持 Markdown 格式

    **如果图标链接或友链为空，请在 `icon_links:` 或 `friend_links:` 后添加一个 `{}`**

    ```yaml
    card:
        enable: true
        description:
            - "Description"
            - "..."
        icon_links:
            {}
            # <name>:
            #    name: <icon-name>
            #    theme: <icon-theme>
            #    link: <link-url>
        friend_links:
            {}
            # <name>: <link-url>
    ```

-   首页文档缩略配置

    一般来说，缩略展示文档只需要在文档中添加 `<!-- more -->` 即可，缩略内容在显示全文中也会出现

    但考虑到不想把缩略内容放在正文里，就添加了此配置

    配置在 Markdown 文件的 Front-Matter 中填写（被 `---` 括起来的内容），支持 Markdown 格式，不想用则不用添加

    例如：（注意换行和转义 `"`）

    ```yaml
    description: "text\n**bold**\n_italic_"
    ```

-   页脚配置

    考虑到博客部署在服务器并使用自己域名的情况，按国家规定需要在网站下边添加备案消息

    如没有需要显示备案消息的可以关闭

    ```yaml
    footer:
        since: 20xx
        ICP:
            enable: false
            code:
            link:
    ```

-   Polyfill

    使用 [Polyfill.io](https://polyfill.io/v3/url-builder) 自动根据 UA 处理新的 JS API 兼容问题，可以配合 [Hexo-Renderer-BabelJS](https://github.com/argvchs/hexo-renderer-babeljs) 插件处理 JS 语法

    ```yaml
    polyfill:
        enable: true
        features:
            - default
    ```

-   渲染数学公式

    使用 KaTeX 渲染数学公式，默认关闭

    ```yaml
    math:
        enable: false
    ```

-   文章加密

    使用 AES 加密算法，在 Front-Matter 里设置 `password` 作为密码，**使用请安装插件 [Hexo-Helper-Crypto](https://github.com/argvchs/hexo-helper-crypto)**

    ```yaml
    crypto:
        enable: false
    ```

-   搜索

    嵌入到 Archives 中的搜索，搜索数据是用 [Hexo-Generator-Search-Lite](https://github.com/argvchs/hexo-generator-search-lite) 生成，默认关闭，使用需要**安装上述插件**并**设置 `optimize: true`**

    目前只支持搜索文档的 Title Categories Tags（我太弱了）

    要同时在主题和根目录的两个 `_config.yml` 添加设置

    ```yaml
    # Theme config
    search:
        enable: false
        path: /search.json
    ```

    ```yaml
    # Site config
    search:
        path: /search.json
        optimize: false
    ```

-   Gitalk

    Gitalk 是一个基于 Github Issue 和 Preact 的评论系统

    考虑到博客可能部署到多个网站同步评论，但 OAuth APP 只能有一个回调 URL，所以添加了 `sites` 参数用于其他网站的评论，请注册多个 Oauth APP

    **同样如果没有其他网站，请在 `sites:` 后添加一个 `{}`**

    由于 Gitalk 官方 CORS 代理用的是 Cloudflare，速度过慢，添加了 `proxy` 配置，搭建 CORS 代理可以看[这篇文章](https://argvchs.github.io/2022/07/04/build-cors-anywhere)

    ```yaml
    gitalk:
        enable: false
        clientID: # Default ClientID
        clientSecret: # Default ClientSecret
        repo: # The name of repository of store comments
        owner: # GitHub repo owner
        admin: # GitHub repo owner and collaborators, only these guys can initialize github issues
        language: zh-CN # en, zh-CN, zh-TW, es-ES, fr, ru, de, pl and ko are currently available.
        proxy: # CORS proxy
        sites: # Sites
            {}
            # <www.example.com>:
            #    clientID: <client-id>
            #    clientSecret: <client-secret>
    ```

-   Giscus

    Giscus 是一个由 GitHub Discussions 支持的评论系统

    在 [ Giscus.app](https://giscus.app) 配置好各项后，会在下面生成一个 `<script>` 标签，在主题内填入即可

    ```yaml
    giscus:
        enable: false
        src: https://giscus.app/client.js
        repo:
        repoID:
        category:
        categoryID:
        mapping: pathname
        strict: 0
        reactionsEnabled: 1
        emitMetadata: 0
        inputPosition: bottom
        theme: preferred_color_scheme
        lang: zh-CN
    ```

-   Waline

    Waline 是一个简单、安全的评论系统

    配置方法详见：[在 ParticleX 上使用 Waline | Yuzi's Blog](https://blog.yuzi0201.top/posts/bcb4ff00.html)

    **注意如果不需要 Locale 配置，请在 `locale:` 后添加一个 `{}`**

    ```yaml
    waline:
        enable: false
        serverURL: # Waline server address url, you should set this to your own link
        locale: # Locale: https://waline.js.org/guide/client/i18n.html#locale-option
            {}
            # e.g.:
            # placeholder: Leave a comment
        commentCount: true # If false, comment count will only be displayed in post page, not in home page
        pageview: false # Pageviews count, Note: You should not enable both `waline.pageview` and `leancloud_visitors`
        emoji: # Custom emoji
            - https://unpkg.com/@waline/emojis@1.0.1/weibo
            - https://unpkg.com/@waline/emojis@1.0.1/alus
            - https://unpkg.com/@waline/emojis@1.0.1/bilibili
            - https://unpkg.com/@waline/emojis@1.0.1/qq
            - https://unpkg.com/@waline/emojis@1.0.1/tieba
            - https://unpkg.com/@waline/emojis@1.0.1/tw-emoji
        meta: # Comment information, valid meta are nick, mail and link
            - nick
            - mail
            - link
        requiredMeta: # Set required meta field, e.g.: [nick] | [nick, mail]
            - nick
        lang: zh-CN # Language, available values: en-US, zh-CN, zh-TW, pt-BR, ru-RU, jp-JP
        wordLimit: 0 # Word limit, no limit when setting to 0
        login: enable # Whether enable login, can choose from 'enable', 'disable' and 'force'
        pageSize: 10 # Comment per page
    ```

## 写在最后

本项目采用 MIT 开源许可证，欢迎大家贡献，你可以随意打开一个 Issue 来进行提问，有任何改进想法都可以进行 Fork，期待您的 Pull Request
