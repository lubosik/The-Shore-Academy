import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/strapi";

export const revalidate = 60;

const STATIC_CONTENT: Record<string, {
  title: string; seoTitle?: string; seoDescription?: string; author: string; readTime: number;
  date: string; category: string; image: string; imageAlt: string; content: React.ReactNode;
}> = {
  "how-to-escape-a-rip-current": {
    title: "How to Escape a Rip Current: A Step-by-Step Survival Guide",
    seoTitle: "How to Escape a Rip Current: A Step-by-Step Survival Guide | The Shore Academy",
    seoDescription: "Rip currents cause over 80% of all lifeguard rescues in the U.S. Learn exactly what to do if you get caught in a rip current and how to spot them before entering the water.",
    author: "Dominick — Head Coach, The Shore Academy",
    readTime: 7,
    date: "2025-01-15",
    category: "Safety Guide",
    image: "https://images.pexels.com/photos/6970903/pexels-photo-6970903.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1",
    imageAlt: "Powerful ocean waves crashing on a Florida beach — dangerous surf conditions that produce rip currents",
    content: (
      <div>
        <div style={{ background: "rgba(26,111,160,0.07)", borderLeft: "4px solid var(--ocean)", padding: "20px 24px", borderRadius: "var(--radius-sm)", marginBottom: 32 }}>
          <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>The Most Important Ocean Safety Fact You&apos;ll Ever Read</p>
          <p style={{ color: "var(--text-light)" }}>Rip currents are responsible for over 80% of all lifeguard rescues in the United States. They kill more than 100 people every year. And the overwhelming majority of those deaths were preventable — if the swimmer had known what to do.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }} className="stat-grid">
          {[{ num: "80%", label: "of rescues caused by rip currents" }, { num: "100+", label: "deaths annually in the U.S." }, { num: "8 ft/s", label: "maximum rip current speed" }].map((s) => (
            <div key={s.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: "20px 24px", textAlign: "center", border: "1px solid #e8ecf0" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 36, fontWeight: 700, color: "var(--ocean)", marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "var(--text-light)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>What Is a Rip Current?</h2>
        <p style={{ marginBottom: 16 }}>A rip current is a narrow, powerful channel of water that flows away from shore through the surf zone, back toward the open ocean. They form when waves break and push water toward the beach — that water has to go somewhere, and it finds the path of least resistance: typically through a break in a sandbar, near a jetty, pier, or inlet, or through a low point in the ocean floor.</p>
        <p style={{ marginBottom: 32 }}>Rip currents can move at speeds up to 8 feet per second — faster than any Olympic swimmer can sustain. They are not whirlpools. They do not pull swimmers underwater. But they will exhaust and drown you if you fight them incorrectly.</p>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>The 5-Step Rip Current Survival Plan</h2>
        {[
          { step: 1, title: "Stay Calm. Do Not Panic.", text: "Panic causes exhaustion. Exhaustion causes drowning. If you realize you are in a rip current, the single most important thing you can do is stay calm. You are not in immediate danger if you do not fight the current." },
          { step: 2, title: "Do Not Swim Against the Current.", text: "This is the mistake that kills people. Swimming directly back to shore against a rip current is like running on a treadmill at maximum speed — you burn energy and go nowhere. The current is stronger than you. Do not fight it head-on." },
          { step: 3, title: "Swim Parallel to Shore.", text: "Rip currents are narrow — typically 20 to 100 feet wide. Escape the current by swimming parallel to the beach — either left or right — until you are out of the current channel. You will know you are free when you stop being pulled offshore." },
          { step: 4, title: "Swim Back at a Diagonal Angle.", text: "Once you are free of the current, angle back toward shore. Do not swim straight in — angle slightly away from the current zone so you don't re-enter the same channel. Use the waves to assist your return." },
          { step: 5, title: "If You Cannot Escape — Float and Signal.", text: "If you are too exhausted to swim out, don't fight. Float on your back, conserve energy, and wave one arm above your head to signal a lifeguard. Rip currents eventually dissipate — most will carry you no more than 100 yards offshore before weakening." },
        ].map((s) => (
          <div key={s.step} style={{ display: "flex", gap: 20, marginBottom: 24, background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--ocean)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "var(--text-light)", lineHeight: 1.7 }}>{s.text}</p>
            </div>
          </div>
        ))}
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>How to Identify a Rip Current Before You Enter the Water</h2>
        <p style={{ marginBottom: 20 }}>The safest way to survive a rip current is to never enter one. Here&apos;s what to look for from the shore:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 32 }} className="stat-grid">
          {["A channel of choppy, churning water at the surface", "A line of foam, seaweed, or debris moving steadily offshore", "A discolored patch of water (often brownish or greenish) cutting through the surf line", "A gap in the breaking wave pattern — where waves aren't breaking consistently", "A visible \"river\" of water moving away from shore"].map((sign) => (
            <div key={sign} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 16px", background: "var(--off-white)", borderRadius: "var(--radius-sm)", border: "1px solid #e8ecf0" }}>
              <span style={{ color: "var(--teal)", fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 14, color: "var(--text-light)" }}>{sign}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "var(--radius-sm)", padding: "20px 24px", marginBottom: 32 }}>
          <h4 style={{ fontWeight: 700, color: "#856404", marginBottom: 8 }}>⚠️ Warning: Pool Swimming Skills Don&apos;t Translate to the Ocean</h4>
          <p style={{ color: "#856404", lineHeight: 1.7 }}>Strong pool swimmers drown in rip currents every year. The ocean behaves nothing like a pool — there are no walls, the surface moves unpredictably, and even elite swimmers can be overpowered by current speed. Ocean safety is a separate set of skills that must be learned and practiced in the ocean itself.</p>
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>Frequently Asked Questions</h2>
        {[
          { q: "What should I do if caught in a rip current?", a: "Stay calm, don't fight the current, swim parallel to shore to escape the channel, then angle back to the beach. If exhausted, float and signal for help." },
          { q: "How fast can a rip current move?", a: "Rip currents can reach speeds up to 8 feet per second — faster than any Olympic swimmer can sustain over distance." },
          { q: "Does a rip current pull you underwater?", a: "No. Rip currents pull you offshore along the surface, not underwater. The danger is exhaustion from fighting the current, not being pulled under." },
          { q: "How do I identify a rip current?", a: "Look for a channel of choppy water, discolored water cutting through the surf, a gap in the wave break pattern, or foam and debris moving steadily offshore." },
          { q: "Can a strong swimmer escape a rip current by swimming straight in?", a: "No — swimming directly against a rip current will exhaust even elite swimmers. Always swim parallel to shore to exit the channel." },
          { q: "Are rip currents common in Florida?", a: "Yes — rip currents are extremely common on all Florida Atlantic beaches, especially around jetties, piers, inlets, and sandbars. South Florida beaches have active rip currents year-round." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: 16, padding: "16px 20px", background: "var(--off-white)", borderRadius: "var(--radius-sm)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{faq.q}</h3>
            <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.7 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    ),
  },
  "beach-flag-colors-florida": {
    title: "Beach Flag Colors Explained: What Every Flag Means at a Florida Beach",
    seoTitle: "Beach Flag Colors Florida: What Every Flag Means | The Shore Academy",
    seoDescription: "What does a purple beach flag mean? What about double red? Learn what every Florida beach flag color means — green, yellow, red, double red, and purple — and what to do at each level.",
    author: "Dominick — Head Coach, The Shore Academy",
    readTime: 5,
    date: "2025-01-22",
    category: "Know the Flags",
    image: "https://images.pexels.com/photos/1199182/pexels-photo-1199182.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1",
    imageAlt: "Red and yellow beach warning flag on a pole in front of the ocean at a Florida beach",
    content: (
      <div>
        <div style={{ background: "rgba(26,111,160,0.07)", borderLeft: "4px solid var(--ocean)", padding: "20px 24px", borderRadius: "var(--radius-sm)", marginBottom: 32 }}>
          <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>Know Before You Go</p>
          <p style={{ color: "var(--text-light)" }}>Florida&apos;s beach flag system is standardized statewide by the United States Lifesaving Association (USLA). Every flag means the same thing at every beach in Florida. Yet most beachgoers can&apos;t identify all five flags. This guide fixes that in five minutes.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }} className="stat-grid">
          {[{ num: "5", label: "flag colors in the USLA system" }, { num: "$500", label: "fine for swimming under double red" }, { num: "1989", label: "USLA statewide standardization" }].map((s) => (
            <div key={s.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: "20px 24px", textAlign: "center", border: "1px solid #e8ecf0" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 36, fontWeight: 700, color: "var(--ocean)", marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "var(--text-light)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>The 5 Florida Beach Flag Colors</h2>
        {[
          { color: "#22c55e", name: "Green Flag", subtitle: "Low Hazard", icon: "🟢", meaning: "Low hazard — calm conditions. Green does not mean zero risk. It means current ocean conditions present a low level of hazard compared to normal. Always assess conditions yourself before entering.", tip: "Green means go — but always look before you leap. Check for rip currents, assess wave height, and confirm your swimming ability before entering." },
          { color: "#eab308", name: "Yellow Flag", subtitle: "Medium Hazard", icon: "🟡", meaning: "Medium hazard — moderate surf and/or currents. Yellow is the most commonly displayed flag on South Florida beaches. Conditions are manageable for strong, experienced ocean swimmers, but present real risk for inexperienced or weak swimmers.", tip: "Under yellow conditions, weak or inexperienced swimmers should stay in shallow water or stay out entirely. Strong swimmers should enter with caution." },
          { color: "#ef4444", name: "Red Flag", subtitle: "High Hazard — Dangerous Surf & Currents", icon: "🔴", meaning: "High hazard — dangerous surf and/or strong currents. A single red flag means conditions are significantly hazardous. Rip currents are strong. Only highly experienced ocean swimmers with real surf experience should enter the water.", tip: "Do not enter the water unless you are an experienced ocean swimmer. Children and inexperienced swimmers should stay on the beach." },
          { color: "#dc2626", name: "Double Red Flag", subtitle: "Beach Closed — No Swimming", icon: "🚫", meaning: "Water closed to the public. A double red flag is the highest warning level — it means the beach is closed to swimming. Entering the water under a double red flag is illegal in most Florida counties and carries a fine of up to $500.", tip: "Violators can be fined up to $500 and may be subject to arrest. Conditions are dangerous enough that even strong swimmers should stay out." },
          { color: "#a855f7", name: "Purple Flag", subtitle: "Dangerous Marine Life", icon: "🟣", meaning: "Dangerous marine life present — jellyfish, Portuguese man-of-war, stingrays, sharks, or other hazardous sea creatures have been spotted. A purple flag may be flown alongside other condition flags.", tip: "Purple flags are often flown alongside green flags in calm conditions when jellyfish or man-of-war are abundant. Always shuffle your feet when walking in shallow water." },
        ].map((flag) => (
          <div key={flag.name} style={{ background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: 24, marginBottom: 20, border: `3px solid ${flag.color}20` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{flag.icon}</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>{flag.name}</h3>
                <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 20, background: flag.color, color: "#fff", fontSize: 12, fontWeight: 700 }}>{flag.subtitle}</span>
              </div>
            </div>
            <p style={{ color: "var(--text-light)", lineHeight: 1.7, marginBottom: 12 }}>{flag.meaning}</p>
            <div style={{ background: "rgba(26,111,160,0.06)", borderRadius: "var(--radius-sm)", padding: "12px 16px", fontSize: 13, color: "var(--ocean)", fontWeight: 600 }}>
              💡 {flag.tip}
            </div>
          </div>
        ))}
        <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "var(--radius-sm)", padding: "20px 24px", marginBottom: 32 }}>
          <h4 style={{ fontWeight: 700, color: "#856404", marginBottom: 8 }}>⚠️ Important: Purple Man-of-War Warning</h4>
          <p style={{ color: "#856404", lineHeight: 1.7 }}>Portuguese man-of-war are common on South Florida beaches, especially during spring and early summer with onshore winds. Their tentacles can extend 30+ feet below the surface and remain venomous for hours after the creature washes ashore. A purple flag means these or other dangerous marine life have been spotted — treat it seriously regardless of water conditions.</p>
        </div>
      </div>
    ),
  },
  "is-my-child-ready-for-ocean-swimming": {
    title: "Is Your Child Ready for the Ocean? A Parent's Complete Guide",
    seoTitle: "Is My Child Ready for Ocean Swimming? Parent's Guide | The Shore Academy",
    seoDescription: "Strong pool swimmers still drown in the ocean. Learn the critical differences between pool and ocean swimming, the 3 benchmarks for ocean readiness, and what warning signs to watch for.",
    author: "Dominick — Head Coach, The Shore Academy",
    readTime: 6,
    date: "2025-02-01",
    category: "For Parents",
    image: "https://images.pexels.com/photos/1755195/pexels-photo-1755195.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1",
    imageAlt: "Young boy running into ocean waves at a sunny Florida beach",
    content: (
      <div>
        <div style={{ background: "rgba(26,111,160,0.07)", borderLeft: "4px solid var(--ocean)", padding: "20px 24px", borderRadius: "var(--radius-sm)", marginBottom: 32 }}>
          <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>The Question Every Florida Parent Should Ask</p>
          <p style={{ color: "var(--text-light)" }}>Your child passed their swim test. They can swim laps. They love the water. Are they ready for the ocean? The answer requires more than just pool proficiency. This guide gives you a clear, honest framework to assess ocean readiness.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }} className="stat-grid">
          {[{ num: "73%", label: "of open water drownings occur in non-swimmers or weak swimmers" }, { num: "3", label: "key benchmarks for ocean readiness" }, { num: "6–15", label: "optimal age range for ocean safety training" }].map((s) => (
            <div key={s.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: "20px 24px", textAlign: "center", border: "1px solid #e8ecf0" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 36, fontWeight: 700, color: "var(--ocean)", marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "var(--text-light)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>Why Pool Swimming Doesn&apos;t Prepare Kids for the Ocean</h2>
        <p style={{ marginBottom: 16 }}>Pool swimming and ocean swimming are fundamentally different activities. Pools have controlled environments: fixed depth, no current, no surf, clear visibility, walls to grab, lifeguards at arm&apos;s length. Oceans have none of these things.</p>
        <p style={{ marginBottom: 32 }}>A child who swims laps in a pool faces these new variables in the ocean: breaking waves and surf zone turbulence, rip currents and longshore currents, variable and unknown depth, reduced visibility, marine life, no walls or lanes, psychological fear response to waves hitting the face.</p>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>The 3 Benchmarks for Ocean Readiness</h2>
        {[
          { title: "The 25-Yard Swim Test", desc: "Your child must be able to swim 25 yards (one pool length) continuously, unassisted, using a recognized stroke — freestyle, breaststroke, or backstroke. Not doggy paddle. Not with a board. This establishes baseline propulsion capability." },
          { title: "The 60-Second Back Float", desc: "Your child must be able to float on their back for 60 seconds with minimal movement. Back floating is a survival skill — it allows a swimmer to rest and breathe without expending energy. In the ocean, this can mean the difference between life and death." },
          { title: "The 2-Minute Treading Test", desc: "Your child must be able to tread water for 2 minutes without support in water over their head. Treading water is the ocean swimmer's resting position — it must be effortless before ocean entry." },
        ].map((b, i) => (
          <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--teal)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{b.title}</h3>
              <p style={{ color: "var(--text-light)", lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          </div>
        ))}
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>Warning Signs Your Child Is NOT Ready for the Ocean</h2>
        <div style={{ background: "#fff5f5", border: "1px solid var(--coral)", borderRadius: "var(--radius-sm)", padding: "20px 24px", marginBottom: 32 }}>
          {["Panics or cries when splashed in the face", "Cannot float on their back without assistance", "Relies on floaties or kickboards to stay afloat", "Cannot follow instructions consistently (critical for safety commands)", "Has never been in open water before"].map((w) => (
            <div key={w} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(224,92,58,0.15)" }}>
              <span style={{ color: "var(--coral)", fontWeight: 700 }}>✗</span>
              <span style={{ fontSize: 14, color: "var(--text)" }}>{w}</span>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>Age-by-Age Ocean Readiness Guide</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 32 }} className="stat-grid">
          {[
            { age: "Ages 3–5", skills: "Shoreline play only. Build comfort with water in face, waves, and sand. No independent ocean swimming at this age." },
            { age: "Ages 6–8", skills: "Supervised surf play in shallow water with parent or instructor present. Learn beach flag system. Introduce rip current awareness." },
            { age: "Ages 9–11", skills: "Building ocean confidence. Ready for structured ocean safety instruction. Shore Academy group sessions begin at this level." },
            { age: "Ages 12–15", skills: "Junior lifeguard-level skills achievable. Full rip current, wave navigation, and basic rescue curriculum appropriate." },
          ].map((a) => (
            <div key={a.age} style={{ background: "var(--off-white)", borderRadius: "var(--radius-sm)", padding: 20, border: "1px solid #e8ecf0" }}>
              <h4 style={{ fontWeight: 700, color: "var(--ocean)", marginBottom: 8 }}>{a.age}</h4>
              <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6 }}>{a.skills}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  const { data } = await fetchBlogPosts({ "pagination[pageSize]": "100" });
  const strapiSlugs = (data || []).map((post: any) => ({ slug: post.attributes?.slug ?? "" })).filter((p: { slug: string }) => p.slug);
  const staticSlugs = Object.keys(STATIC_CONTENT).map((slug) => ({ slug }));
  return [...staticSlugs, ...strapiSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const staticPost = STATIC_CONTENT[slug];
  if (staticPost) {
    return {
      title: staticPost.seoTitle ?? staticPost.title,
      description: staticPost.seoDescription,
    };
  }
  const data = await fetchBlogPost(slug);
  const post = data?.data?.[0]?.attributes;
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const staticPost = STATIC_CONTENT[slug];

  if (!staticPost) {
    const data = await fetchBlogPost(slug);
    const post = data?.data?.[0]?.attributes;
    if (!post) notFound();

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      author: { "@type": "Person", name: post.author },
      datePublished: post.publishedDate,
      publisher: { "@type": "Organization", name: "The Shore Academy", url: "https://theshoreacademy.com" },
    };

    return (
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div style={{ background: "linear-gradient(165deg, var(--navy), var(--deep-blue))", padding: "140px 24px 60px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Link href="/academy-resources" style={{ color: "var(--teal)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 24 }}>← Back to Academy Resources</Link>
            {post.category && <span style={{ display: "inline-block", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>{post.category}</span>}
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>{post.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{post.author} &bull; {post.readTimeMinutes} min read &bull; {new Date(post.publishedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", fontSize: 16, lineHeight: 1.8, color: "var(--text)" }}>
          <p style={{ fontSize: 18, color: "var(--text-light)", marginBottom: 32 }}>{post.excerpt}</p>
          {/* Strapi blocks rendered as plain text fallback */}
          <p style={{ color: "var(--text-light)" }}>Content available in CMS.</p>
          <div style={{ marginTop: 60, padding: "32px 40px", background: "linear-gradient(135deg, var(--navy), var(--deep-blue))", borderRadius: "var(--radius)", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Ready to Put This Knowledge Into Practice?</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>Book an ocean safety session with our certified lifeguard instructors.</p>
            <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}>Book a Session →</Link>
          </div>
        </div>
      </article>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: staticPost.seoTitle ?? staticPost.title,
    description: staticPost.seoDescription,
    author: { "@type": "Person", name: staticPost.author },
    datePublished: staticPost.date,
    image: staticPost.image,
    publisher: { "@type": "Organization", name: "The Shore Academy", url: "https://theshoreacademy.com" },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <div style={{ background: "linear-gradient(165deg, var(--navy), var(--deep-blue))", padding: "140px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/academy-resources" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Academy Resources</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{staticPost.category}</span>
          </nav>
          <span style={{ display: "inline-block", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>{staticPost.category}</span>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>{staticPost.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            {staticPost.author} &bull; {staticPost.readTime} min read &bull;{" "}
            {new Date(staticPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Cover image */}
      <div style={{ position: "relative", height: 400, overflow: "hidden" }}>
        <Image src={staticPost.image} alt={staticPost.imageAlt} fill style={{ objectFit: "cover" }} priority />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", fontSize: 16, lineHeight: 1.8, color: "var(--text)" }}>
        {staticPost.content}

        {/* CTA */}
        <div style={{ marginTop: 60, padding: "40px", background: "linear-gradient(135deg, var(--navy), var(--deep-blue))", borderRadius: "var(--radius)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            Want to Put This Knowledge Into Practice?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
            Reading about ocean safety is the first step. Training in the Atlantic with certified lifeguard instructors is the next. Weekend sessions in West Palm Beach, Boca Raton, Delray Beach, Miami & Fort Lauderdale.
          </p>
          <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 36px", borderRadius: 50, textDecoration: "none" }}>
            Book an Ocean Safety Session →
          </Link>
        </div>

        <Link href="/academy-resources" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 40, fontSize: 14, fontWeight: 600, color: "var(--ocean)", textDecoration: "none" }}>
          ← Back to Academy Resources
        </Link>
      </div>

      <style>{`.stat-grid { @media (max-width:600px) { grid-template-columns: 1fr !important; } }`}</style>
    </article>
  );
}
