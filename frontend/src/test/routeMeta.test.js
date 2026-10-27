import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ARTICLES } from "../data/blogArticles";
import { jsonLdFor, metaForPath, routes } from "../routeMeta";

const appSrc = readFileSync(resolve(process.cwd(), "src/App.jsx"), "utf-8");

describe("routeMeta", () => {
  it("has unique paths, titles and descriptions", () => {
    for (const key of ["path", "title", "description"]) {
      const values = routes.map((r) => r[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("only lists public routes the router serves", () => {
    const publicPaths = new Set(
      [...appSrc.matchAll(/<Route path="(\/[^"]*)" element=\{<(?!Protected)/g)].map((m) => m[1])
    );
    for (const r of routes) {
      if (!r.path.startsWith("/blog/")) expect(publicPaths.has(r.path), r.path).toBe(true);
    }
    for (const p of ["/employees", "/payroll", "/auth"]) expect(metaForPath(p)).toBeUndefined();
  });

  it("dates every blog post", () => {
    for (const a of ARTICLES) {
      expect(jsonLdFor(metaForPath(`/blog/${a.slug}`)).datePublished).toBe(a.published);
    }
  });

  it("keeps titles within 70 chars", () => {
    for (const r of routes) expect(r.title.length, r.path).toBeLessThanOrEqual(70);
  });

  it("puts the product FAQ on the home page only", () => {
    expect(JSON.stringify(jsonLdFor(metaForPath("/")))).toContain("FAQPage");
    expect(JSON.stringify(jsonLdFor(metaForPath("/calculator")))).not.toContain("FAQPage");
  });
});
