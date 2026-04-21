import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchBlogPosts } from "@/lib/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Academy Resources | Ocean Safety Guides & Lifeguard Tips",
  description:
    "Free ocean safety guides from The Shore Academy's certified lifeguard instructors. Rip currents, beach flags, wave navigation, and parent readiness guides for South Florida families.",
};

const STATIC_POSTS = [
  {
    slug: "how-to-escape-a-rip-current",
    title: "How to Escape a Rip Current: A Step-by-Step Survival Guide",
    excerpt: "Rip currents cause over 80% of all lifeguard rescues in the U.S. This guide teaches you exactly what to do if you get caught in one - and how to spot them before you enter the water.",
    category: "Safety Guide",
    author: "Dominick - Head Coach",
    readTime: 7,
    date: "2025-01-15",
    image: "https://images.pexels.com/photos/6970903/pexels-photo-6970903.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
    imageAlt: "Powerful ocean waves crashing on a Florida beach",
  },
  {
    slug: "beach-flag-colors-florida",
    title: "Beach Flag Colors Explained: What Every Flag Means at a Florida Beach",
    excerpt: "Most beachgoers can't explain what a purple flag means. Or a double red. Understanding the beach flag system is the first layer of ocean safety - and it takes five minutes to learn.",
    category: "Know the Flags",
    author: "Dominick - Head Coach",
    readTime: 5,
    date: "2025-01-22",
    image: "https://images.pexels.com/photos/1199182/pexels-photo-1199182.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
    imageAlt: "Red and yellow beach warning flag on a pole in front of the ocean at a Florida beach",
  },
  {
    slug: "is-my-child-ready-for-ocean-swimming",
    title: "Is Your Child Ready for the Ocean? A Parent's Complete Guide",
    excerpt: "Strong pool swimmers still drown in the ocean. This guide explains the critical differences between pool and ocean swimming, and gives parents a clear checklist for ocean readiness.",
    category: "For Parents",
    author: "Dominick - Head Coach",
    readTime: 6,
    date: "2025-02-01",
    image: "https://images.pexels.com/photos/1755195/pexels-photo-1755195.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
    imageAlt: "Young boy running into ocean waves at a sunny Florida beach",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AcademyResourcesPage() {
  const { data: strapiPosts } = await fetchBlogPosts();
  const hasStrapiPosts = strapiPosts && strapiPosts.length > 0;

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(165deg, var(--navy) 0%, #0d2040 60%, var(--deep-blue) 100%)", padding: "140px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", marginBottom: 16 }}>Free Guides</span>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
            Academy Resources
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            Free guides from our certified ocean lifeguard instructors. The knowledge that saves lives on South Florida beaches every summer.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ background: "var(--off-white)", padding: "12px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "var(--text-light)" }}>
          <Link href="/" style={{ color: "var(--ocean)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Academy Resources</span>
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: "80px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="blog-grid">
            {hasStrapiPosts
              ? strapiPosts.map((post: any) => {
                  const a = post.attributes;
                  return (
                    <BlogCard
                      key={a.slug}
                      slug={a.slug}
                      title={a.title}
                      excerpt={a.excerpt}
                      category={a.category}
                      author={a.author}
                      readTime={a.readTimeMinutes}
                      date={a.publishedDate}
                      imageUrl={a.coverImage?.data?.attributes?.url}
                      imageAlt={a.title}
                    />
                  );
                })
              : STATIC_POSTS.map((post) => (
                  <BlogCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    author={post.author}
                    readTime={post.readTime}
                    date={post.date}
                    imageUrl={post.image}
                    imageAlt={post.imageAlt}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "var(--off-white)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
            Ready to Put This Knowledge Into Practice?
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-light)", lineHeight: 1.7, marginBottom: 32 }}>
            Reading about ocean safety is the first step. Training in the Atlantic with certified lifeguard instructors is the next.
          </p>
          <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 36px", borderRadius: 50, textDecoration: "none" }}>
            Book an Ocean Safety Session →
          </Link>
        </div>
      </section>

      <style>{`.blog-grid { @media (max-width:768px) { grid-template-columns: 1fr 1fr !important; } @media (max-width:600px) { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

function BlogCard({ slug, title, excerpt, category, author, readTime, date, imageUrl, imageAlt }: {
  slug: string; title: string; excerpt: string; category?: string; author: string;
  readTime: number; date: string; imageUrl?: string; imageAlt?: string;
}) {
  return (
    <article className="hover-blog-card" style={{ background: "var(--off-white)", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid transparent", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 200, position: "relative", background: "linear-gradient(135deg, var(--deep-blue), var(--ocean))" }}>
        {imageUrl && <Image src={imageUrl} alt={imageAlt ?? title} fill style={{ objectFit: "cover" }} loading="lazy" />}
        {category && <span style={{ position: "absolute", top: 12, left: 12, background: "var(--teal)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase" }}>{category}</span>}
      </div>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 10, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</h2>
        <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>{excerpt}</p>
        <div style={{ fontSize: 12, color: "var(--text-light)", marginBottom: 16 }}>
          {author} &bull; {readTime} min read &bull; {new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <Link href={`/academy-resources/${slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--ocean)", textDecoration: "none" }}>
          Read Guide →
        </Link>
      </div>
    </article>
  );
}
