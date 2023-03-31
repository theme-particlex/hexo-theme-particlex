# Hexo-Theme-ParticleX

[ParticleX](https://github.com/argvchs/hexo-theme-particlex) 主题，诞生原因是因为原来的 [Particle](https://github.com/korilin/hexo-theme-particle) 主题不维护了，但是我觉得还是很好的

原来用的是 Vue 2 + Ant Design Vue 1，现更新到 Vue 3，去除 Ant Design Vue 采用自定义样式，图标更改为 Font Awesome 6，CDN 改为 Staticfile

原项目 `README.md` 里说：

> 目前有 Full、Night 和 Maiden **两个**主题样式

虽然更改后只有一种了，如果你想改颜色就在 `particlex.css` 里 `Ctrl+F` 替换吧

## 演示

-   [GitHub Pages](https://argvchs.github.io)
-   [Netlify](https://argvchs.netlify.app)
-   [Vercel](https://argvchs.vercel.app)

## 安装
**从Release列表下载(推荐)：**

[Release](https://github.com/argvchs/hexo-theme-particlex/releases)

**手动安装：**
```bash
cd themes
git clone https://github.com/argvchs/hexo-theme-particlex.git particlex --depth=1
npm run build
```
---

然后在根目录 `_config.yml` 设置主题为 ParticleX 即可

```yaml
theme: particlex
```

-   关闭自带 Highlight

    Hexo 有自带的 Highlight，但是和 ParticleX 的 Highlight 不兼容

    ```yaml
    highlight:
        enable: false
    prismjs:
        enable: false
    ```

    如果使用 Pandoc 还需要设置一下

    ```yaml
    pandoc:
        extra:
            - no-highlight:
    ```

-   禁用年度月度归档

    Hexo 会自动生成年度月度归档，可是 ParticleX 主题没有这个功能 ~~我太懒了~~

    ```yaml
    archive_generator:
        enabled: true
        per_page: 0
        yearly: false
        monthly: false
        daily: false
    ```

修改完请 `hexo cl` 清除缓存

## 配置

```yaml
# Avatar image
avatar: /images/avatar.jpg

# Home page info block
headBlockEnable: true

# Home page background image
background: /images/background.jpg
```

其中 Background 可以是一个列表，打开时会随机加载一个背景

-   导航栏

    为了方便，主题使用的图标是 Font Awesome 6 图标

    ```yaml
    # ParticleX theme icon is adopts the Font Awesome 6
    # https://fontawesome.com

    # Main menu navigation
    menu:
        Home:
            name: house
            theme: solid
            link: /
        About:
            name: id-card
            theme: solid
            link: /about
        Archives:
            name: box-archive
            theme: solid
            link: /archives
        Categories:
            name: bookmark
            theme: solid
            link: /categories
        Tags:
            name: tags
            theme: solid
            link: /tags
    ```

-   主页信息卡片

    `description` 支持 Markdown 格式

    图标链接配置和导航栏配置相同

    **如果图标链接或友链为空，请在 `iconLinks:` 或 `friendLinks:` 后添加一个 `{}`**

    ```yaml
    # Side info card
    card:
        enable: true
        description: |
            Description
            ...
        iconLinks:
            {}
        friendLinks:
            Argvchs: https://argvchs.netlify.app
    ```

-   页脚

    考虑到博客部署在服务器并使用自己域名的情况，按规定需要在网站下边添加备案消息

    如没有需要显示备案消息的可以关闭

    ```yaml
    # Footer info
    footer:
        since: 2022
        # Customize the server domain name ICP
        ICP:
            enable: false
            code:
            link:
    ```

-   Polyfill

    使用 [Polyfill.io](https://polyfill.io) 自动根据 UA 处理新的 JS API 兼容

    可以配合 [Hexo-Babel](https://github.com/argvchs/hexo-babel) 插件处理 JS 语法兼容

    ```yaml
    # Polyfill
    # https://polyfill.io
    polyfill:
        enable: true
        features:
            - default
    ```

-   代码高亮

    使用 Highlight.js 代码高亮

    样式可以在[这里](https://highlightjs.org/static/demo)选择，默认为 GitHub

    ```yaml
    # Highlight.js
    # https://highlightjs.org
    highlight:
        enable: true
        style: github
    ```

-   数学渲染

    使用 KaTeX 渲染数学公式

    ```yaml
    # Rendering math with KaTeX
    math:
        enable: false
    ```

-   图片预览

    简单的点击图片放大缩小的预览

    ```yaml
    # Image Preview
    preview:
        enable: true
    ```

-   文章缩略

    一般来说，缩略展示文档只需要在文档中添加 `<!-- more -->` 即可，缩略内容在显示全文中也会出现

    但考虑到不想把缩略内容放在正文里，就添加了此参数，在 [Front-Matter](https://hexo.io/zh-cn/docs/front-matter) 里设置

    支持 Markdown 格式

    ```yaml
    description: |
        Normal _Italic_ **Strong**
    ```

-   文章置顶

    在 [Front-Matter](https://hexo.io/zh-cn/docs/front-matter) 里设置 `pinned` 作为置顶参数，越大越靠前，默认为 0

-   文章加密

    使用 AES 加密算法，在 [Front-Matter](https://hexo.io/zh-cn/docs/front-matter) 里设置 `secret` 作为密码，**使用请安装插件 [Hexo-Helper-Crypto](https://github.com/argvchs/hexo-helper-crypto)**

    ```yaml
    # Article encryption
    crypto:
        enable: false
    ```

-   搜索

    嵌入到 Archives 中的搜索

    目前只支持搜索文档标题（我太弱了）

    ```yaml
    # Search
    search:
        enable: false
    ```

-   Giscus

    Giscus 是一个由 GitHub Discussions 支持的评论系统

    在 [Giscus.app](https://giscus.app) 设置好各项后，会在下面生成一个 `<script>` 标签，在主题内填入即可

    ```yaml
    # Giscus
    # https://github.com/giscus/giscus
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

-   Gitalk

    Gitalk 是一个基于 GitHub Issue 和 Preact 的评论系统

    考虑到博客可能部署到多个网站同步评论，但 OAuth APP 只能有一个回调 URL，所以添加了 `sites` 参数用于多个网站的评论

    **同样如果没有其他网站，请在 `sites:` 后添加一个 `{}`**

    由于 Gitalk 官方 CORS 代理用的是 Cloudflare，速度过慢，添加了 `proxy` 参数，搭建 CORS 代理可以看[这篇文章](https://argvchs.github.io/2022/07/04/build-cors-anywhere)

    ```yaml
    # Gitalk
    # https://github.com/gitalk/gitalk
    gitalk:
        enable: false
        clientID: # Default ClientID
        clientSecret: # Default ClientSecret
        repo: # The name of repository of store comments
        owner: # GitHub repo owner
        admin: # GitHub repo owner and collaborators, only these guys can initialize github issues
        language: zh-CN # en, zh-CN, zh-TW, es-ES, fr, ru, de, pl and ko are currently available
        proxy: # CORS proxy
        sites: # Sites
            {}
            # www.example.com:
            #    clientID:
            #    clientSecret:
    ```

-   Waline

    Waline 是一个简单、安全的评论系统

    详见：[在 ParticleX 上使用 Waline | Yuzi's Blog](https://blog.yuzi.dev/posts/bcb4ff00.html)

    **注意如果不需要 `locale` 参数，请在 `locale:` 后添加一个 `{}`**

    ```yaml
    # Waline
    # https://github.com/walinejs/waline
    waline:
        enable: false
        serverURL: # Waline server address url, you should set this to your own link
        locale: # Locale: https://waline.js.org/guide/client/i18n.html#locale-option
            {}
        commentCount: true # If false, comment count will only be displayed in post page, not in home page
        pageview: false # Pageviews count, Note: You should not enable both `waline.pageview` and `leancloud_visitors`
        emoji: # Custom emoji
            - https://unpkg.com/@waline/emojis@1.2.0/weibo
            - https://unpkg.com/@waline/emojis@1.2.0/alus
            - https://unpkg.com/@waline/emojis@1.2.0/bilibili
            - https://unpkg.com/@waline/emojis@1.2.0/qq
            - https://unpkg.com/@waline/emojis@1.2.0/tieba
            - https://unpkg.com/@waline/emojis@1.2.0/tw-emoji
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

-   Twikoo

    Twikoo 是一个一个简洁、安全、免费的静态网站评论系统

    ```yaml
    # Twikoo
    # https://github.com/imaegoo/twikoo
    twikoo:
        enable: false
        envID:
        region:
        path: location.pathname
        lang: zh-CN
    ```

## 写在最后

本项目采用 MIT 开源许可证，欢迎大家贡献，你可以随意打开一个 Issue 来进行提问，有任何改进想法都可以进行 Fork，期待您的 Pull Request！
