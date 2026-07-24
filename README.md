# CloudLight

CloudLight 的 Astro 静态网站源码。

网站用于发布个人博客、展示项目与开发记录，并提供网页工具和功能导航。生产站点通过 GitHub main 分支连接 Cloudflare Pages 自动构建。

## 技术栈

- Astro
- TypeScript
- Markdown 与 MDX Content Collections
- Astro RSS 与 Sitemap
- 原生 HTML、CSS 和少量 JavaScript

## 本地开发

安装依赖：

    npm install

按照项目约定，以后台模式启动开发服务器：

    npm run dev -- --background

查看、停止或读取开发服务器日志：

    npm run astro -- dev status
    npm run astro -- dev stop
    npm run astro -- dev logs

生产构建与本地预览：

    npm run build
    npm run preview

## 内容

博客文章位于 src/content/blog。文章 Frontmatter 支持 title、description、pubDate、updatedDate、heroImage 和 draft。

draft 为 true 的文章不会出现在博客列表、文章动态路由、RSS 或 Sitemap 中。

## 部署

Cloudflare Pages 配置：

- Production branch：main
- Build command：npm run build
- Build output directory：dist
- Node.js：读取仓库根目录 .node-version

正式站点地址：https://269332.xyz
