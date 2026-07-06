import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Doc = {
  slug: string;
  title: string;
  description: string;
  filePath: string;
  href: string;
  section: string;
};

const rootDir = process.cwd();

marked.use({
  gfm: true
});

function read(filePath: string) {
  return fs.readFileSync(path.join(rootDir, filePath), "utf-8");
}

function exists(filePath: string) {
  return fs.existsSync(path.join(rootDir, filePath));
}

function firstHeading(markdown: string, fallback: string) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function plainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_>#|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(markdown: string) {
  const text = plainText(markdown);
  return text.length > 132 ? `${text.slice(0, 132)}...` : text;
}

function dayNumber(slug: string) {
  const match = slug.match(/^day(\d+)/);
  return match ? Number(match[1]) : 999;
}

function asDoc(
  filePath: string,
  href: string,
  section: string,
  fallback: string,
  slugOverride?: string
): Doc {
  const markdown = read(filePath);
  const slug = slugOverride ?? path.basename(filePath, path.extname(filePath));
  return {
    slug,
    title: firstHeading(markdown, fallback),
    description: excerpt(markdown),
    filePath,
    href,
    section
  };
}

export function renderMarkdown(markdown: string) {
  return marked.parse(markdown, { async: false }) as string;
}

export function getDocMarkdown(doc: Doc) {
  return read(doc.filePath);
}

export function getDailyDocs() {
  const dir = path.join(rootDir, "daily");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("day"))
    .map((entry) => {
      const filePath = `daily/${entry.name}/README.md`;
      return asDoc(filePath, `/daily/${entry.name}/`, "daily", entry.name, entry.name);
    })
    .sort((a, b) => dayNumber(a.slug) - dayNumber(b.slug));
}

export function getDailyDoc(slug: string) {
  return getDailyDocs().find((doc) => doc.href === `/daily/${slug}/`);
}

export function getDailyExtras(slug: string) {
  const dir = path.join(rootDir, "daily", slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .sort()
    .map((name) =>
      asDoc(`daily/${slug}/${name}`, `/articles/${path.basename(name, ".md")}/`, "article", name)
    );
}

export function getArticleDocs() {
  const dailyDocs = getDailyDocs();
  return dailyDocs.flatMap((doc) => {
    const slug = doc.href.split("/").filter(Boolean).at(-1);
    return slug ? getDailyExtras(slug) : [];
  });
}

export function getArticleDoc(slug: string) {
  return getArticleDocs().find((doc) => doc.slug === slug);
}

export function getNoteDocs() {
  const notesDir = path.join(rootDir, "notes");
  const noteDocs = fs
    .readdirSync(notesDir)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => asDoc(`notes/${name}`, `/notes/${path.basename(name, ".md")}/`, "note", name));

  const extras = ["learning-log.md"].filter(exists).map((filePath) =>
    asDoc(filePath, `/notes/${path.basename(filePath, ".md")}/`, "note", filePath)
  );

  return [...extras, ...noteDocs];
}

export function getNoteDoc(slug: string) {
  return getNoteDocs().find((doc) => doc.slug === slug);
}

export function getProjectDocs() {
  const files = [
    "projects/final-agent/README.md",
    "projects/final-agent/docs/architecture.md",
    "projects/final-agent/docs/safety.md",
    "projects/final-agent/evals/eval_cases.md"
  ].filter(exists);

  return files.map((filePath) =>
    asDoc(filePath, `/project/#${path.basename(filePath, ".md")}`, "project", filePath)
  );
}

export function getStandaloneDoc(filePath: string, href: string, fallback: string) {
  return asDoc(filePath, href, "standalone", fallback);
}

export function getStats() {
  return {
    days: getDailyDocs().length,
    articles: getArticleDocs().length,
    notes: getNoteDocs().length,
    projectDocs: getProjectDocs().length
  };
}
