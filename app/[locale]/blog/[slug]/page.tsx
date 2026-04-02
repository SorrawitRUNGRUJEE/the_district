import AnimatedPostHeader from "@/components/blog/AnimatedPostHeader";
import BlogGallery from "@/components/blog/BlogGallery";
import PageHeader from "@/components/layout/PageHeader";
import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/markdown";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

/**
 * Generate static params for all posts and locales
 */
export async function generateStaticParams() {
  const locales = ["en", "th", "cn"];
  const allParams: { slug: string; locale: string }[] = [];

  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    posts.forEach((post) => {
      allParams.push({
        slug: post.slug,
        locale: locale,
      });
    });
  }

  return allParams;
}

/**
 * MDX Components for stylized article content
 */
const mdxComponents = {
  ImageGallery: (props: { images?: string | string[]; caption?: string }) => (
    <div className="not-prose my-16 group">
      <BlogGallery images={props.images} />
      {props.caption && (
        <div className="mt-6 flex justify-center px-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-brand/30" />
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-soft-foreground/40">
              {props.caption}
            </p>
            <div className="h-px w-8 bg-brand/30" />
          </div>
        </div>
      )}
    </div>
  ),

  SingleImage: (props: { src: string; alt?: string; caption?: string }) => (
    <div className="not-prose my-16 group">
      <div className="relative aspect-video w-full overflow-hidden rounded-4xl border border-border shadow-2xl">
        <SafeImage
          src={props.src}
          alt={props.caption || props.alt || "The District Blog Image"}
          className="object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
      </div>
      {props.caption && (
        <div className="mt-6 flex justify-center px-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-brand/30" />
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-soft-foreground/40">
              {props.caption}
            </p>
            <div className="h-px w-8 bg-brand/30" />
          </div>
        </div>
      )}
    </div>
  ),

  img: (props: ComponentPropsWithoutRef<"img">) => (
    <div className="not-prose my-16 group">
      <div className="relative aspect-video w-full overflow-hidden rounded-4xl border border-border shadow-2xl">
        {props.src && (
          <SafeImage
            src={props.src}
            alt={props.alt || ""}
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
        )}
      </div>
      {props.alt && (
        <div className="mt-6 flex justify-center px-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-brand/30" />
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-soft-foreground/40">
              {props.alt}
            </p>
            <div className="h-px w-8 bg-brand/30" />
          </div>
        </div>
      )}
    </div>
  ),
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) notFound();

  const { frontmatter, content } = post;
  const tags = (frontmatter.tags as string[]) || [];

  return (
    <article className="min-h-screen bg-background text-foreground pb-32 relative">
      <PageHeader
        title="STORY"
        containerClass={LAYOUT_CONFIG.containerClass}
        className="md:hidden pt-24 pb-10"
      />

      {/* 1. Desktop Navigation: Floating side link */}
      <Link
        href="/blog"
        className="fixed top-24 left-8 z-50 hidden lg:flex items-center gap-4 group text-soft-foreground hover:text-foreground transition-all"
      >
        <div className="w-10 h-px bg-foreground group-hover:w-16 transition-all" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
          Discover More Stories
        </span>
      </Link>

      {/* 2. Hero Section: Fluid height with padding safety */}
      <div className="relative min-h-[70vh] md:min-h-[85vh] w-full flex flex-col justify-end pt-40 pb-20 md:pt-60 md:pb-32">
        {/* Visual Background */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={
              (frontmatter.coverImage as string) ||
              "/images/branding/cover.webp"
            }
            alt={(frontmatter.title as string) || "Blog Cover"}
            preload={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content Overlay */}
        <AnimatedPostHeader
          title={frontmatter.title as string}
          date={frontmatter.date as string}
          tags={tags}
        >
          {/* Mobile Navigation: Breadcrumb style */}
          <div className="lg:hidden mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-soft-foreground group"
            >
              <span className="text-brand group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span className="border-b border-border group-hover:border-foreground/30 transition-colors uppercase">
                Discover More Stories
              </span>
            </Link>
          </div>
        </AnimatedPostHeader>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 mt-32">
        {/* Excerpt Block */}
        {frontmatter.excerpt && (
          <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/70 italic mb-20 border-l-2 border-brand pl-8">
            {frontmatter.excerpt as string}
          </p>
        )}

        <div
          className="
          prose dark:prose-invert 
          max-w-none

          /* Hierarchy & Typography */
          prose-h2:text-foreground prose-h2:text-4xl prose-h2:tracking-widest prose-h2:uppercase prose-h2:font-black prose-h2:mt-32 prose-h2:mb-12
          prose-h3:text-foreground prose-h3:text-2xl prose-h3:tracking-wide prose-h3:uppercase prose-h3:mt-20
          prose-p:text-soft-foreground prose-p:leading-relaxed prose-p:text-lg prose-p:mb-8
          prose-strong:text-brand prose-strong:font-bold

          /* Block Elements */
          prose-blockquote:border-l-brand prose-blockquote:bg-surface/30 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl
          prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:text-xl prose-blockquote:leading-relaxed prose-blockquote:my-16

          /* Table & List Aesthetics */
          prose-table:border-border prose-table:my-16
          prose-th:text-brand prose-th:uppercase prose-th:text-[11px] prose-th:tracking-[0.3em] prose-th:py-6
          prose-td:py-6 prose-td:text-soft-foreground
          prose-li:text-soft-foreground prose-li:marker:text-brand
        "
        >
          {content && (
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
