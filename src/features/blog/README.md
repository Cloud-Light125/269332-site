# Blog routes are enabled

The blog content and implementation are active and publicly generated.

Active capabilities:

- Articles: src/content/blog/
- Content collection: src/content.config.ts
- Article layout: src/layouts/BlogPost.astro
- Date component: src/components/FormattedDate.astro
- Post query helper: src/utils/posts.ts
- MDX and RSS dependencies in package.json

Active routes:

- Blog index: src/pages/blog/index.astro
- Article pages: src/pages/blog/[...slug].astro
- RSS feed: src/pages/rss.xml.js

Template articles remain in the collection with draft: true and are not published.
