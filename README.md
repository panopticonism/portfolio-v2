## Architecture

```
Notion ──────┐                                    ┌─> /            (homepage)
             ├─> lib/ (fetch + map to slim types) ─┼─> /blog        (post list)
Contentful ──┘        at build/revalidate time     ├─> /blog/[slug] (post)
                                                    └─> /sitemap.xml
```

- **Content lives in two CMSs.** Contentful holds the projects. Notion holds the writing: the homepage code snippets and the blog. Notion is where the posts get drafted anyway, so publishing a post is just a matter of setting its status to `Done`.
- **Everything is static with incremental regeneration.** Pages are built ahead of time and regenerated in the background at most once a minute (`revalidate: 60`). Visitors never wait on a CMS, and edits still show up within about a minute.
- **Only what the page renders is sent to the browser.** `lib/contentful.ts` and `lib/notion.ts` map the raw API responses to small types (`Project`, `PostSummary`) before they become page props.
- **Code is highlighted at build time.** Code blocks are rendered with [Shiki](https://shiki.style) during data fetching (`lib/highlightCode.ts`), so no highlighting JavaScript ships to the browser.

## Development

1. Create a `.env` file at the root:

   ```
   NOTION_API_KEY=
   NOTION_BLOG_ID=
   NOTION_FRONTPAGE_ID=
   CONTENTFUL_ACCESS_TOKEN=
   ```

2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

## Scripts

| Script              | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Development server                  |
| `npm run build`     | Production build                    |
| `npm run typecheck` | TypeScript check                    |
| `npm test`          | Unit tests (Vitest) for `lib/`      |
