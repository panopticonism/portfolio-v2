import type { GetServerSideProps } from "next";
import { getPublishedPosts } from "lib/notion";
import { SITE_URL } from "lib/site";

const toUrl = (path: string, lastModified?: string) =>
  [
    "  <url>",
    `    <loc>${SITE_URL}${path}</loc>`,
    lastModified ? `    <lastmod>${lastModified.slice(0, 10)}</lastmod>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getPublishedPosts();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    toUrl("/"),
    toUrl("/blog"),
    ...posts.map((post) => toUrl(`/blog/${post.slug}`, post.date)),
    "</urlset>",
  ].join("\n");

  res.setHeader("Content-Type", "application/xml");
  // Cached at the edge for an hour, so Notion is queried at most hourly.
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
