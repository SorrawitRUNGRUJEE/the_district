import BlogNav from "@/components/blog/BlogNav";
import PageHeader from "@/components/layout/PageHeader";
import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { getAllPosts, getAllTagsWithCount } from "@/lib/markdown";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const { page, tag } = await searchParams;
  const t = await getTranslations("BlogPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  // --- Filter Logic ---
  const selectedTag = tag || null;
  const allPosts = await getAllPosts(locale);
  const allTagsWithCount = await getAllTagsWithCount(locale);
  const totalPostsCount = allPosts.length;

  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.frontmatter.tags?.includes(selectedTag))
    : allPosts;

  // --- Pagination Logic ---
  const currentPage = Number(page) || 1;
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  // --- Pagination Detail Logic ---
  const startCount =
    filteredPosts.length > 0 ? (currentPage - 1) * postsPerPage + 1 : 0;
  const endCount = Math.min(currentPage * postsPerPage, filteredPosts.length);
  const totalItems = filteredPosts.length;

  const getPageRange = () => {
    const delta = 1;
    const range: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  const getPageLink = (pageNum: number | string) => {
    const baseUrl = `blog?page=${pageNum}`;
    return selectedTag ? `${baseUrl}&tag=${selectedTag}` : baseUrl;
  };

  return (
    <main className="bg-soft text-foreground min-h-screen flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />

      <BlogNav
        allTags={allTagsWithCount}
        selectedTag={selectedTag}
        allLabel={t("filter.all")}
        totalCount={totalPostsCount}
        containerClass={containerClass}
      />

      <section className="pb-20 border-b border-border grow">
        <div className={containerClass}>
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
              {paginatedPosts.map((blog, index) => {
                const { title, date, category, excerpt, coverImage, featured } =
                  blog.frontmatter;

                return (
                  <article
                    key={blog.slug}
                    className="group flex flex-col space-y-6"
                  >
                    <div className="w-full overflow-hidden shadow-2xl bg-surface rounded-sm">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="block relative aspect-video cursor-pointer"
                      >
                        <SafeImage
                          src={
                            (coverImage as string) ||
                            "/images/branding/cover.webp"
                          }
                          alt={(title as string) || "Blog cover"}
                          preload={index < 2}
                          className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                        />
                        {featured && (
                          <div className="absolute top-6 left-6 bg-brand text-black text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 italic shadow-xl z-10">
                            Recommended
                          </div>
                        )}
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                        <span>{(category as string) || "JOURNAL"}</span>
                        <span className="w-8 h-px bg-border"></span>
                        <span className="text-soft-foreground">
                          {date as string}
                        </span>
                      </div>

                      <Link href={`/blog/${blog.slug}`}>
                        <h2 className="text-2xl font-light tracking-wide text-foreground uppercase leading-tight hover:text-brand-light transition-colors min-h-14">
                          {title as string}
                        </h2>
                      </Link>

                      <p className="text-soft-foreground font-light leading-relaxed tracking-wide text-sm line-clamp-3">
                        {(excerpt as string) || ""}
                      </p>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase pt-2"
                      >
                        <span className="border-b border-border pb-1 group-hover:border-brand transition-colors">
                          {t("readMore")}
                        </span>
                        <span className="text-brand group-hover:translate-x-2 transition-transform">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center text-soft-foreground/50 text-xs tracking-widest uppercase italic">
              {t("filter.noResults")}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="mt-32 w-full flex flex-col items-center">
              <div className="w-full flex justify-center mb-10">
                <p className="text-[9px] font-bold tracking-[0.5em] uppercase text-soft-foreground/50 italic text-center translate-x-[0.25em]">
                  {t("pagination.showing")} {startCount}–{endCount}{" "}
                  {t("pagination.of")} {totalItems} {t("pagination.posts")}
                </p>
              </div>

              <div className="grid grid-cols-3 items-center w-full max-w-2xl mx-auto">
                <div className="flex justify-end">
                  <Link
                    href={getPageLink(Math.max(1, currentPage - 1))}
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-2 transition-all ${currentPage === 1 ? "opacity-0 pointer-events-none" : "text-soft-foreground hover:text-brand"}`}
                  >
                    {t("pagination.prev")}
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-1">
                  {getPageRange().map((p, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {p === "..." ? (
                        <span className="w-10 h-10 flex items-center justify-center text-soft-foreground/20 text-[10px]">
                          ...
                        </span>
                      ) : (
                        <Link
                          href={getPageLink(p as number)}
                          className={`w-10 h-10 flex items-center justify-center text-[10px] font-bold transition-all border border-transparent ${p === currentPage ? "bg-brand text-black italic scale-110 shadow-lg" : "text-soft-foreground hover:text-foreground hover:border-border"}`}
                        >
                          {(p as number).toString().padStart(2, "0")}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-start">
                  <Link
                    href={getPageLink(Math.min(totalPages, currentPage + 1))}
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-2 transition-all ${currentPage === totalPages ? "opacity-0 pointer-events-none" : "text-soft-foreground hover:text-brand"}`}
                  >
                    {t("pagination.next")}
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 bg-surface border-t border-border">
        <div className={`${containerClass} text-center`}>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-soft-foreground/30">
            {t("footerBranding")}
          </p>
        </div>
      </footer>
    </main>
  );
}
