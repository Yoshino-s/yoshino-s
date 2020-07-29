import RSSParser from "rss-parser";

const parser = new RSSParser();

export async function generateWriteup() {
  const res = await parser.parseURL(
    "https://rss.lilydjwg.me/zhihuzhuanlan/c_1200076713121669120"
  );
  const items = (res.items || [])
    .sort(
      (a, b) =>
        new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime()
    )
    .slice(0, 5)
    .map((i) => [i.title || "", i.link || ""]);
  const titleWidth = Math.max(...items.map((i) => i[0].length));
  return items.map((i) => `- [${i[0].padEnd(titleWidth)}](${i[1]})`).join("\n");
}
