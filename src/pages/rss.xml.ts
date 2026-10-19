import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Hand-rolled RSS 2.0 feed, so no extra dependency is needed
export const GET: APIRoute = async ({ site }) => {
  const base = site!.origin;
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.id}/`;
      return `
    <item>
      <title>${escape(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      ${post.data.tags.map((t) => `<category>${escape(t)}</category>`).join("")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Iván Ajenjo — Blog</title>
    <link>${base}/blog/</link>
    <description>Ideas sobre desarrollo backend, arquitectura de software y lo que voy aprendiendo por el camino.</description>
    <language>es-ES</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
