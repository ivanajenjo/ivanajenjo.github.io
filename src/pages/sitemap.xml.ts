import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";

const day = (d: Date) => d.toISOString().slice(0, 10);

// Generated at build time so new posts are always listed (replaces public/sitemap.xml)
export const GET: APIRoute = async ({ site }) => {
  const base = site!.origin;
  const posts = await getPosts();
  const latest = posts[0] ? day(posts[0].data.updatedDate ?? posts[0].data.pubDate) : undefined;

  const urls = [
    { loc: `${base}/`, priority: "1.0" },
    { loc: `${base}/blog/`, lastmod: latest, priority: "0.8" },
    ...posts.map((p) => ({
      loc: `${base}/blog/${p.id}/`,
      lastmod: day(p.data.updatedDate ?? p.data.pubDate),
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
