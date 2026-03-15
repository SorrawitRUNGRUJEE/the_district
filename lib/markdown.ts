import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

const contentDirectory = path.join(process.cwd(), "public/content/blog");

/**
 * Define the structure of our Blog Frontmatter
 */
export interface BlogFrontmatter {
  title?: string;
  date?: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
  featured?: boolean;
  [key: string]: unknown;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content?: string;
}

/**
 * Get a single post by slug and locale
 */
export const getPostBySlug = cache(async (
  slug: string,
  locale: string,
): Promise<BlogPost | null> => {
  const fullPath = path.join(contentDirectory, slug, `index.${locale}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
});

/**
 * Get all posts for a specific locale with Advanced Sorting
 * Featured posts come first, then sorted by date (newest to oldest)
 */
export const getAllPosts = cache(async (locale: string): Promise<BlogPost[]> => {
  if (!fs.existsSync(contentDirectory)) return [];

  const folders = fs.readdirSync(contentDirectory);

  const posts = await Promise.all(
    folders.map(async (folder) => {
      const folderPath = path.join(contentDirectory, folder);
      if (!fs.statSync(folderPath).isDirectory()) return null;

      const post = await getPostBySlug(folder, locale);
      if (!post) return null;

      return {
        slug: folder,
        frontmatter: post.frontmatter,
      };
    }),
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      // 1. Featured posts always stay on top
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;

      // 2. If both have the same featured status, sort by date (Newest first)
      const dateA = new Date(a.frontmatter.date as string).getTime();
      const dateB = new Date(b.frontmatter.date as string).getTime();
      return dateB - dateA;
    });
});

/**
 * Get all unique tags with counts, sorted by frequency (High to Low)
 * and then alphabetically (A-Z) if counts are equal.
 */
export const getAllTagsWithCount = cache(async (
  locale: string,
): Promise<{ name: string; count: number }[]> => {
  const posts = await getAllPosts(locale);
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      // 1. Primary Sort: Count (Descending)
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      // 2. Secondary Sort: Alphabetical (Ascending)
      return a.name.localeCompare(b.name);
    });
});
