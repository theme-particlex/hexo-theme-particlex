# ParticleX 主题项目

## 项目概述

ParticleX 是一个简洁美观的 Hexo 博客主题，基于 Particle 主题魔改。该主题采用现代化的前端技术栈，提供丰富的功能特性和视觉效果，适合个人博客搭建。

### 主要技术栈

- **模板引擎**: EJS
- **样式语言**: SCSS
- **前端框架**: Vue.js 3 Composition API
- **图标库**: Font Awesome 6
- **代码高亮**: PrismJS、Highlight.js（可选）
- **数学渲染**: KaTeX（可选）
- **评论系统**: giscus、Gitalk、Waline、Twikoo（可选）

### 核心特性

- 响应式设计，支持移动端和桌面端
- 粒子背景特效、烟花效果、点击文字特效
- 代码语法高亮（支持多种主题）
- 文章加密功能（AES加密）
- 图片预览功能
- 搜索功能
- 多种评论系统集成
- 自定义颜色主题
- 文章置顶功能
- 标题自动翻译（通过LibreTranslate API）

## 项目结构

```
particlex/
├── _config.yml          # 主题配置文件
├── package.json         # 依赖管理
├── layout/              # EJS模板文件
│   ├── layout.ejs       # 主布局
│   ├── index.ejs        # 首页
│   ├── post.ejs         # 文章页
│   ├── archives.ejs     # 归档页
│   ├── categories.ejs   # 分类页
│   ├── tags.ejs         # 标签页
│   ├── card.ejs         # 侧边卡片
│   ├── menu.ejs         # 导航菜单
│   ├── footer.ejs       # 页脚
│   └── ...
├── source/              # 静态资源
│   ├── css/
│   │   └── main.scss    # 主样式文件
│   ├── js/
│   │   ├── main.js      # 主JavaScript（Vue应用 + Composables）
│   │   ├── canvas.js    # 粒子效果
│   │   ├── span.js      # 点击文字特效
│   │   └── PrismJS.js   # PrismJS 代码高亮
│   └── images/          # 图片资源
└── scripts/             # Hexo脚本
    └── translate-title.js  # 标题翻译脚本
```

## 安装和使用

### 安装步骤

1. 克隆主题到 Hexo 博客的 themes 目录：

```bash
git clone https://github.com/kmizmal/hexo-theme-particlex.git ./themes/particlex
```

2. 安装必要的依赖：

```bash
pnpm add sass hexo-renderer-sass-next
```

3. 在 Hexo 根目录的 `_config.yml` 中设置主题：

```yaml
theme: particlex
```

4. 复制主题配置文件（可选）：

```bash
cp themes/particlex/_config.yml _config.particlex.yml
```

## 配置说明

主题配置位于主题目录下的 `_config.yml`，主要配置项包括：

### 基本配置

- `avatar`: 头像图片路径
- `background`: 主页背景图片列表（随机加载）
- `loading`: 加载动画图片
- `colors`: 分类和标签的随机颜色列表
- `arrow`: 自定义鼠标光标

### 导航菜单

使用 Font Awesome 6 图标：

```yaml
menu:
  Home:
    name: house
    theme: solid
    link: /
  About:
    name: id-card
    theme: solid
    link: /about
```

### 功能配置

- `polyfill`: Polyfill.io 兼容性处理
- `prismjs`: 代码高亮配置（主题、行号）
- `highlight`: Highlight.js 代码高亮（与 PrismJS 二选一）
- `math`: KaTeX 数学公式渲染
- `preview`: 图片预览
- `crypto`: 文章加密
- `search`: 搜索功能
- `span`: 文字点击特效
- `TopIndex`: 顶部进度条
- `Background_particles`: 背景粒子特效

### 评论系统

支持多种评论系统，可同时启用多个：

- **giscus**: 基于 GitHub Discussions
- **Gitalk**: 基于 GitHub Issue
- **Waline**: 简单安全的评论系统
- **Twikoo**: 简洁免费的评论系统

## 开发规范

### 模板开发

- 使用 EJS 语法
- 遵循现有的模板结构
- 使用 `partial()` 函数引入子模板
- 使用 `url_for()` 函数处理静态资源路径

### 样式开发

- 使用 SCSS 语法
- 遵循 BEM 命名规范
- 使用变量管理颜色和尺寸
- 确保响应式设计（使用媒体查询）

### JavaScript 开发

- 使用 Vue.js 3 Composition API
- 使用 Composable 函数复用逻辑（定义在 main.js 中）
- 遵循现有的代码结构
- 注意性能优化（事件监听、滚动处理）
- 功能模块根据配置动态启用（检查全局变量是否存在）

### 文件命名

- 模板文件使用小写和连字符：`post.ejs`, `card.ejs`
- JavaScript 文件使用小写和连字符：`main.js`, `canvas.js`
- SCSS 文件使用小写和连字符：`main.scss`

## 文章 Front-Matter

文章支持以下 Front-Matter 配置：

```yaml
---
title: 文章标题
date: 2025-01-16 10:00:00
updated: 2025-01-16 10:00:00
categories: 分类
tags: [标签1, 标签2]
description: |
  文章描述（支持 Markdown）
pinned: 10  # 置顶数值，越大越靠前
secret: password  # 加密密码（需启用 crypto）
comments: true  # 是否启用评论
---
```

## 依赖项

主要依赖：

- `hexo-renderer-sass-next`: SCSS 渲染器
- `hexo-renderer-ejs`: EJS 模板渲染器

前端依赖（通过 CDN 引入）：

- Vue.js 3
- KaTeX（数学公式）
- CryptoJS（文章加密）
- Highlight.js（代码高亮，可选）

## 注意事项

1. **禁用年度月度归档**：主题不支持年度月度归档，需要在 Hexo 根目录 `_config.yml` 中禁用：

```yaml
archive_generator:
  enabled: true
  per_page: 0
  yearly: false
  monthly: false
  daily: false
```

2. **缓存清除**：修改配置后建议运行 `hexo cl` 清除缓存

3. **图片路径**：使用绝对路径或 `url_for()` 函数处理图片路径

4. **图标选择**：从 [Font Awesome 6](https://fontawesome.com) 选择图标

## 贡献指南

项目采用 MIT 开源许可证，欢迎贡献。可以通过以下方式参与：

- 提交 Issue 报告问题或提出建议
- Fork 项目并提交 Pull Request
- 分享使用经验和自定义配置

## 相关链接

- GitHub 仓库：https://github.com/kmizmal/hexo-theme-particlex
- 演示站点：
  - GitHub Pages: https://kmizmal.github.io/
  - Netlify: https://argvchs.netlify.app
  - Vercel: https://zmal-blog.vercel.app
- 原项目：Argvchs/hexo-theme-particlex

## 许可证

MIT License