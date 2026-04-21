import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/strapi";

export const revalidate = 60;

// ─── SHARED STYLE HELPERS ─────────────────────────────────────────────────────

const s = {
  callout: {
    background: "linear-gradient(135deg, rgba(15,163,177,0.08), rgba(26,111,160,0.06))",
    border: "1px solid rgba(15,163,177,0.2)",
    borderLeft: "4px solid var(--teal)",
    borderRadius: 8,
    padding: "24px 28px",
    margin: "28px 0",
  } as React.CSSProperties,
  calloutLabel: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "1px", color: "var(--teal)", marginBottom: 10 },
  calloutP: { fontSize: 16, color: "var(--text)", margin: 0, lineHeight: 1.7 } as React.CSSProperties,
  statRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, margin: "28px 0" } as React.CSSProperties,
  statBox: { background: "var(--navy)", borderRadius: 8, padding: "24px 20px", textAlign: "center" as const },
  statNum: { fontFamily: "var(--font-playfair), serif", fontSize: 32, fontWeight: 700, color: "var(--teal)", display: "block" } as React.CSSProperties,
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, letterSpacing: "1px", marginTop: 6, display: "block" } as React.CSSProperties,
  h2: { fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px,3vw,30px)", color: "var(--navy)", margin: "48px 0 16px", fontWeight: 700, letterSpacing: "-0.3px" } as React.CSSProperties,
  p: { fontSize: 17, color: "var(--text)", lineHeight: 1.85, marginBottom: 22 } as React.CSSProperties,
  warningBox: {
    background: "linear-gradient(135deg, #fff5f5, #fff0ee)",
    border: "1px solid rgba(232,93,80,0.2)",
    borderLeft: "4px solid var(--coral)",
    borderRadius: 8,
    padding: "20px 24px",
    margin: "24px 0",
  } as React.CSSProperties,
  warningLabel: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "1px", color: "var(--coral)", marginBottom: 8 },
  tipBox: {
    background: "linear-gradient(135deg, #e8f8ef, #d4edda)",
    border: "1px solid rgba(39,174,96,0.2)",
    borderLeft: "4px solid #27ae60",
    borderRadius: 8,
    padding: "20px 24px",
    margin: "24px 0",
  } as React.CSSProperties,
  tipLabel: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "1px", color: "#27ae60", marginBottom: 8 },
};

function InlineCTA({ label, headline, body, btnText, trust }: {
  label: string; headline: string; body: string; btnText: string; trust: string;
}) {
  return (
    <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--deep-blue) 100%)", borderRadius: 12, padding: "36px 32px", margin: "48px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(15,163,177,0.18) 0%, transparent 60%)", pointerEvents: "none" }} aria-hidden="true" />
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--teal)", marginBottom: 12, position: "relative", margin: "0 0 12px" }}>{label}</p>
      <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(19px,3vw,24px)", fontWeight: 700, color: "#fff", marginBottom: 10, position: "relative", lineHeight: 1.3 }}>{headline}</h3>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", maxWidth: 460, margin: "0 auto 22px", lineHeight: 1.65, position: "relative" }}>{body}</p>
      <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--coral)", color: "#fff", padding: "13px 30px", borderRadius: 50, fontSize: 15, fontWeight: 700, textDecoration: "none", position: "relative" }}>
        {btnText} &rarr;
      </Link>
      <p style={{ marginTop: 13, fontSize: 12, color: "rgba(255,255,255,0.4)", position: "relative" }}>{trust}</p>
    </div>
  );
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type RelatedPost = { slug: string; tag: string; title: string; desc: string };
type FaqItem = { q: string; a: string };
type StaticPost = {
  title: string; seoTitle?: string; seoDescription?: string;
  author: string; readTime: number; date: string; category: string;
  image: string; imageAlt: string;
  content: React.ReactNode;
  endCtaHeadline: string; endCtaBody: string;
  faq: FaqItem[];
  related: RelatedPost[];
};

// ─── STATIC CONTENT ──────────────────────────────────────────────────────────

const STATIC_CONTENT: Record<string, StaticPost> = {

  // ── RIP CURRENT ────────────────────────────────────────────────────────────
  "how-to-escape-a-rip-current": {
    title: "How to Escape a Rip Current: A Step-by-Step Survival Guide",
    seoTitle: "How to Escape a Rip Current: Step-by-Step Survival Guide | The Shore Academy",
    seoDescription: "Rip currents cause over 80% of lifeguard rescues in the U.S. Learn exactly how to spot, avoid, and escape a rip current on Florida beaches. Expert guide from certified ocean lifeguards in West Palm Beach.",
    author: "The Shore Academy Instructors",
    readTime: 7,
    date: "2026-04-12",
    category: "Ocean Safety Guide",
    image: "https://images.pexels.com/photos/6970903/pexels-photo-6970903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Powerful ocean waves crashing on a South Florida beach - the kind of conditions that produce rip currents",
    endCtaHeadline: "Learn These Skills in the Real Ocean",
    endCtaBody: "Reading about rip currents is step one. The Shore Academy puts students into the Atlantic Ocean with certified lifeguard instructors so the response becomes instinct, not theory. Weekend sessions in West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale.",
    faq: [
      { q: "What should you do if caught in a rip current?", a: "Do not swim against the current - this exhausts you without making progress. Stay calm, float to conserve energy, and swim parallel to shore until you feel the pull release. Then angle back to the beach at a diagonal. If you cannot get out, wave one arm and call for help to signal a lifeguard." },
      { q: "How fast can a rip current pull you?", a: "Rip currents can reach speeds up to 8 feet per second - faster than any Olympic swimmer can sprint. This is why swimming directly against one quickly exhausts even strong swimmers. The correct response is to swim out of the channel sideways, not fight it head-on." },
      { q: "Do rip currents pull you underwater?", a: "No. Rip currents are a horizontal force - they pull you away from shore, not beneath the surface. They will not drag you underwater. The danger is exhaustion from fighting the current. The correct response is to float, stay calm, and swim parallel to shore to exit the channel." },
      { q: "How do you identify a rip current from the beach?", a: "Look for a gap in the breaking waves, a choppy or discolored channel of water, foam or debris moving steadily out to sea in a narrow band, and rough, choppy water surrounded by calmer surf on either side. If you are unsure, ask a lifeguard before entering. Spend 60 seconds scanning the water before you go in." },
      { q: "Can a strong swimmer escape a rip current?", a: "Yes, but not by swimming against it. Strong swimming ability helps you stay calm and execute the correct technique - swimming parallel to shore to exit the channel. Raw power is not the answer. Knowledge and calm execution are. Many drowning victims in rip currents were experienced swimmers who fought the current directly instead of exiting sideways." },
      { q: "Are rip currents common on Florida beaches?", a: "Yes. Florida's Atlantic coast - including West Palm Beach, Boca Raton, and Delray Beach - is one of the highest-risk rip current environments in the U.S. The combination of offshore sandbars, inlets, and seasonal swell activity means rip currents form frequently, often without obvious visual warning. Always check the beach flag and consult lifeguards before entering." },
    ],
    related: [
      { slug: "beach-flag-colors-florida", tag: "Know the Flags", title: "Beach Flag Colors Explained: What Every Flag Means at a Florida Beach", desc: "Most beachgoers don't know what a purple flag means. Learn the full Florida flag system in five minutes." },
      { slug: "is-my-child-ready-for-ocean-swimming", tag: "For Parents", title: "Is Your Child Ready for the Ocean? A Parent's Complete Guide", desc: "Strong pool swimmers still get into trouble in the ocean. Here is a clear checklist for ocean readiness." },
    ],
    content: (
      <div>
        <div style={s.callout}>
          <div style={s.calloutLabel}>The Short Answer</div>
          <p style={s.calloutP}><strong>Do not swim against the current.</strong> Stay calm, float to conserve energy, and swim parallel to shore until you feel the current release you. Then angle back to the beach diagonally. If you cannot get out, signal a lifeguard by raising one arm and calling for help.</p>
          <p style={{ ...s.calloutP, marginTop: 10 }}>That is the foundation. The rest of this guide explains why it works, how to spot rip currents before they catch you, and what our certified lifeguard instructors teach every student at The Shore Academy.</p>
        </div>

        <div style={s.statRow} className="stat-grid">
          {[{ num: "80%", label: "of lifeguard rescues caused by rip currents" }, { num: "100+", label: "U.S. drowning deaths per year" }, { num: "8 ft/s", label: "maximum rip current speed" }].map(st => (
            <div key={st.label} style={s.statBox}><span style={s.statNum}>{st.num}</span><span style={s.statLabel}>{st.label}</span></div>
          ))}
        </div>

        <h2 style={s.h2}>What Is a Rip Current?</h2>
        <p style={s.p}>A rip current is a narrow, fast-moving channel of water that flows from the shoreline out into the open ocean. It forms when waves push water toward the beach faster than it can spread out sideways. The water finds a gap - usually through a break in a sandbar, or near a pier, jetty, or inlet - and rushes seaward through that opening with significant force.</p>
        <p style={s.p}>They are not whirlpools. They do not pull you underwater. But they will carry you away from shore quickly, and if you panic and fight directly against them, they will exhaust you before you make any progress. That exhaustion is what kills people.</p>
        <p style={s.p}>According to NOAA, rip currents are the number one weather-related killer on U.S. beaches, claiming more lives annually than tornadoes, hurricanes, or floods in coastal areas. Florida's Atlantic coast - including the beaches of West Palm Beach, Boca Raton, and Delray Beach - is one of the highest-risk rip current zones in the country due to the combination of offshore sandbars, inlet systems, and seasonal swell patterns.</p>

        <h2 style={s.h2}>How to Spot a Rip Current From the Beach</h2>
        <p style={s.p}>The most important habit you can build is reading the water before you enter. Spend 60 seconds standing at the shoreline and looking at the surf. Here is what a rip current looks like:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, margin: "24px 0" }} className="stat-grid">
          {[
            { icon: "👀", title: "Gap in the breaking waves", desc: "Waves break consistently across sandbars but stop where the rip flows out. Look for a calm-looking channel cutting through an otherwise active surf zone." },
            { icon: "🌊", title: "Discolored or murky water", desc: "The rip channel stirs up sand from the ocean floor, making it appear darker, browner, or greener than the water around it." },
            { icon: "💧", title: "Foam or debris moving seaward", desc: "If you see sea foam, floating seaweed, or debris moving steadily away from the beach in a narrow band, you are looking at a rip current exit path." },
            { icon: "〰️", title: "Choppy, rippled surface", desc: "A rip current zone often looks rougher and more chaotic than the water on either side because of the conflicting water flow directions." },
          ].map(item => (
            <div key={item.title} style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 8, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <div>
                <strong style={{ color: "var(--navy)", display: "block", marginBottom: 4 }}>{item.title}</strong>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={s.warningBox}>
          <div style={s.warningLabel}>Important</div>
          <p style={{ fontSize: 15, color: "var(--text)", margin: 0, lineHeight: 1.7 }}>Rip currents do not always look dangerous. Many people walk into them because the channel appears calm compared to the breaking waves on either side. If anything about the water looks different in a narrow band, treat it as a rip until proven otherwise. When in doubt, ask a lifeguard before you enter.</p>
        </div>

        <h2 style={s.h2}>What to Do If You Get Caught in a Rip Current</h2>
        <p style={s.p}>If you feel yourself being pulled away from shore faster than you can swim toward it, you are probably in a rip current. The next 30 seconds determine everything. Here is the exact sequence:</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "24px 0" }}>
          {[
            { n: 1, title: "Do not panic", text: "A rip current will not pull you underwater. It carries you horizontally. Panic burns energy and leads to poor decisions. Take a breath, recognize what is happening, and start executing the plan below." },
            { n: 2, title: "Float and conserve energy", text: "Stop swimming for a moment. Float on your back or tread water gently. Most rip currents dissipate within 50 to 100 yards of the shoreline. A rested swimmer can self-rescue. An exhausted swimmer cannot." },
            { n: 3, title: "Swim parallel to shore", text: "Rip currents are typically 20 to 100 feet wide. Swim sideways, parallel to the beach, until you feel the pull release you. It does not matter which direction - just get out of the channel. Once free, angle back to shore at a diagonal. Do not swim straight in until you are clear of the rip." },
            { n: 4, title: "Signal for help if needed", text: "If you are tired and cannot exit the current, face the shore, raise one arm overhead, and call out. This is the universal water distress signal. Lifeguards are trained to spot it immediately. Do not silently struggle - use your voice and your arm." },
            { n: 5, title: "If helping someone else: reach, throw, row, go", text: "Never jump in after someone in a rip current unless you are a trained ocean rescuer. Throw them anything that floats. Shout instructions to swim parallel. Call for a lifeguard immediately. Untrained rescues in rip currents are a leading cause of multiple drownings in a single incident." },
          ].map(step => (
            <div key={step.n} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--off-white)", borderRadius: 8, padding: 20, border: "1px solid rgba(26,111,160,0.08)" }}>
              <div style={{ minWidth: 40, height: 40, background: "var(--ocean)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{step.title}</h4>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <InlineCTA
          label="The Steps Above Are the Difference Between Panic and Survival"
          headline="Now Give Your Child the Experience to Execute Them"
          body="There is a wide gap between reading the right steps and performing them calmly in the surf. Our certified ocean lifeguards in West Palm Beach put students into real waves so these responses become instinct - not theory they are trying to remember while being pulled offshore."
          btnText="Book an Ocean Safety Session"
          trust="Ages 6 and up  •  2:1 instructor ratio  •  Real Atlantic Ocean training"
        />

        <h2 style={s.h2}>Rip Currents on South Florida Beaches</h2>
        <p style={s.p}>The Atlantic coastline of Palm Beach County - covering West Palm Beach, Boca Raton, and Delray Beach - sees rip currents throughout the year, but particularly during summer storm season and winter swell events when offshore wave activity increases. The inlets and jetties in the area create reliable rip current formations that form in predictable locations day after day.</p>
        <p style={s.p}>Florida beaches use a color-coded flag system to communicate current conditions. Check the flag before you enter the water. A yellow flag means moderate rip current risk. A red flag means high risk. Under a red or double red flag, only highly experienced ocean swimmers should consider entering, and even then with extreme caution. <Link href="/academy-resources/beach-flag-colors-florida" style={{ color: "var(--ocean)", fontWeight: 600 }}>Read our full beach flag guide here.</Link></p>

        <h2 style={s.h2}>The Real Protection: Building Ocean Awareness</h2>
        <p style={s.p}>Knowing what to do in theory is a starting point. The difference between a swimmer who panics and a swimmer who executes correctly comes down to one thing: having practiced the response before they ever needed it.</p>
        <p style={s.p}>That is the entire premise behind The Shore Academy. We take students - children as young as 6, all the way through adults - into the Atlantic Ocean on the beaches of Palm Beach County and teach them to read and respond to real water. Not a pool. Not a simulation. The actual ocean, with real waves and real currents, coached by instructors who have performed hundreds of genuine open-water rescues.</p>
        <p style={s.p}>The rip current knowledge above will help you think more clearly if you ever find yourself in one. But the students who walk away from our sessions can identify a rip from the beach, feel the current change around them, and respond without hesitation - because they have done it before, safely, with certified lifeguards at their side.</p>
        <p style={s.p}><Link href="/academy-resources/is-my-child-ready-for-ocean-swimming" style={{ color: "var(--ocean)", fontWeight: 600 }}>Is your child ready for ocean safety training? Read our parent guide.</Link></p>

        <InlineCTA
          label="Limited Spots - Sessions Fill Weeks Ahead"
          headline="The Parents Acting Now Are the Ones Whose Kids Are Ready for Summer"
          body="We keep groups small by design: max 6 students, strict 2:1 ratio, certified instructors on every session. That means we fill fast. If your family spends time on South Florida beaches, the time to book is before the season peaks - not after a close call."
          btnText="Claim Your Spot Now"
          trust="No inquiry commitment  •  Reschedule free if conditions are unsafe  •  Palm Beach County"
        />
      </div>
    ),
  },

  // ── BEACH FLAGS ────────────────────────────────────────────────────────────
  "beach-flag-colors-florida": {
    title: "Beach Flag Colors Explained: What Every Flag Means at a Florida Beach",
    seoTitle: "Beach Flag Colors Florida: What Every Flag Means | The Shore Academy",
    seoDescription: "Green, yellow, red, double red, purple - what do beach flags mean? Learn every beach flag color and what you should do at each flag level. Florida beach safety guide from certified ocean lifeguards.",
    author: "The Shore Academy Instructors",
    readTime: 8,
    date: "2026-04-12",
    category: "Beach Safety",
    image: "https://images.pexels.com/photos/1199182/pexels-photo-1199182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Red and yellow beach warning flag flying on a pole at a Florida beach with the ocean in the background",
    endCtaHeadline: "Teach Your Kids to Read the Ocean",
    endCtaBody: "Knowing the flag system is step one. Our ocean safety programs in West Palm Beach teach children and families the full picture - from beach flags to rip currents to staying calm in rough surf. Weekend sessions available across South Florida.",
    faq: [
      { q: "What does a purple flag at the beach mean?", a: "A purple beach flag means dangerous marine life is present in or near the water. This typically includes jellyfish, stingrays, Portuguese man-of-war, sea lice, or sharks observed in the area. Purple flags do not refer to water or wave conditions. You can still swim under a purple flag, but you should stay alert and shuffle your feet in shallow water to avoid stingrays." },
      { q: "What does a double red flag mean at the beach?", a: "A double red flag means the beach is closed to swimmers. Entering the water under a double red flag is illegal in Florida and can result in a fine of up to $500. Double red flags are flown when conditions are extremely dangerous - typically during very high surf, strong rip currents, or severe weather. Even strong swimmers should stay out of the water." },
      { q: "What do the different beach flag colors mean?", a: "The five main beach flag colors are: Green (low hazard, calm conditions), Yellow (medium hazard, moderate surf or currents), Red (high hazard, rough surf and strong currents), Double Red (beach closed, water entry prohibited), and Purple (dangerous marine life present). Some beaches also use a blue flag for informational or zoning purposes." },
      { q: "Are beach flags standardized across Florida?", a: "Yes. Florida uses the USLA (United States Lifesaving Association) standardized beach flag system statewide. The same green, yellow, red, double red, and purple flag meanings apply at all guarded Florida beaches, including those in West Palm Beach, Boca Raton, Delray Beach, Miami, and the Panhandle." },
      { q: "Can you still swim when there is a red flag at the beach?", a: "A single red flag is a warning, not a legal prohibition. Adults can technically enter the water under a single red flag, but it is strongly discouraged for children, weak swimmers, and anyone without ocean swimming experience. Conditions under a red flag typically involve surf above 4 feet and strong rip currents. If you are not confident in your ocean skills, stay on shore." },
      { q: "Where can I check beach flag conditions before I go?", a: "Palm Beach County posts daily beach condition updates on the county parks website. The National Weather Service issues beach hazard statements for South Florida that include flag forecasts. Many local news stations also report beach flag status in their morning weather segments. For real-time conditions, call the specific beach directly or check county parks social media." },
    ],
    related: [
      { slug: "how-to-escape-a-rip-current", tag: "Ocean Safety", title: "How to Escape a Rip Current: Step-by-Step Survival Guide", desc: "Rip currents cause over 80% of lifeguard rescues. Learn exactly what to do - and what not to do - if you get caught in one." },
      { slug: "is-my-child-ready-for-ocean-swimming", tag: "For Parents", title: "Is My Child Ready for Ocean Swimming? A Parent's Guide", desc: "Pool swimming and ocean swimming require very different skills. Here is how to honestly assess whether your child is ready for the surf." },
    ],
    content: (
      <div>
        <div style={s.callout}>
          <div style={s.calloutLabel}>The Short Answer</div>
          <p style={s.calloutP}>Florida beaches fly five flag colors: <strong>green</strong> (low hazard), <strong>yellow</strong> (moderate hazard), <strong>red</strong> (high hazard), <strong>double red</strong> (beach closed, no swimming), and <strong>purple</strong> (dangerous marine life present). Purple does not mean rough water - it means jellyfish, stingrays, or other marine hazards have been spotted. Always check the flag before you enter the water.</p>
        </div>

        <p style={s.p}>You are at the beach. The kids are pulling at your arm, the cooler is in the sand, and the ocean looks fine. But there is a colored flag flapping near the lifeguard tower, and you are not 100% sure what it means.</p>
        <p style={s.p}>This happens to thousands of beachgoers every weekend along the South Florida coast. Most people know red means something bad. But yellow? Purple? Two reds at once? The details matter, and getting them wrong can lead to dangerous situations that ruin more than just your beach day.</p>
        <p style={s.p}>Here is every beach flag color used on Florida beaches, what each one means, and exactly how you should respond to it.</p>

        <div style={s.statRow} className="stat-grid">
          {[{ num: "5", label: "flag colors in the Florida system" }, { num: "$500", label: "fine for swimming under double red" }, { num: "1989", label: "year USLA system was standardized" }].map(st => (
            <div key={st.label} style={s.statBox}><span style={s.statNum}>{st.num}</span><span style={s.statLabel}>{st.label}</span></div>
          ))}
        </div>

        <h2 style={s.h2}>The Five Beach Flag Colors and What They Mean</h2>
        <p style={s.p}>Florida uses the <strong>USLA (United States Lifesaving Association)</strong> standardized flag system. All guarded Florida beaches - including those in West Palm Beach, Boca Raton, and Delray Beach - fly these same flags with the same meanings. Here is each one:</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "28px 0" }}>
          {[
            {
              color: "#22c55e", badge: "#d4edda", badgeText: "#155724", badgeName: "Low Hazard",
              icon: "🟢", name: "Green Flag - Calm Conditions",
              text: "A green flag means low hazard conditions. The surf is calm, currents are minimal, and the beach is generally safe for most swimmers. That said, even a green flag day is not a free pass to stop paying attention. Sneaker waves, sudden current shifts, and basic fatigue still happen. Swim near a lifeguard station, stay within your ability level, and keep watching younger swimmers.",
            },
            {
              color: "#eab308", badge: "#fff3cd", badgeText: "#856404", badgeName: "Medium Hazard",
              icon: "🟡", name: "Yellow Flag - Use Caution",
              text: "Yellow means moderate hazard. Surf is typically between 2 and 4 feet, and there may be lateral currents running along the shoreline. Confident adult swimmers can enter the water, but children and inexperienced swimmers should stay in shallow water where they can touch the bottom. A yellow flag day is when most rip current incidents start - people wade deeper than they should and get surprised by a current shift. If your kids cannot swim without floaties, yellow is a wade-only day.",
            },
            {
              color: "#ef4444", badge: "#f8d7da", badgeText: "#721c24", badgeName: "High Hazard",
              icon: "🔴", name: "Red Flag - Rough Surf and Strong Currents",
              text: "A single red flag signals high hazard conditions. Surf is typically above 4 feet, rip currents are active, and the shore break is powerful enough to knock over adults. This flag is strongly advisory. Adults can technically enter the water, but it is not recommended unless you are an experienced ocean swimmer who knows how to read conditions. Children, non-swimmers, and casual beachgoers should stay out. The majority of ocean rescues our instructors have witnessed happened on red flag days when people misjudged their own swimming ability.",
            },
            {
              color: "#dc2626", badge: "#f5c6cb", badgeText: "#491217", badgeName: "Beach Closed",
              icon: "🚩🚩", name: "Double Red Flag - Water Closed to the Public",
              text: "Two red flags flying together means the beach is officially closed to swimmers. In Florida, entering the water under a double red flag is illegal and can result in a fine up to $500. Double red flags are typically flown when surf exceeds 8 feet, during tropical storms, when there is an active shark warning, or when severe rip current conditions make the water objectively dangerous to anyone. This is not a suggestion - it is an order to stay out. There are no exceptions based on swimming ability.",
            },
            {
              color: "#a855f7", badge: "#e2d9f3", badgeText: "#4a1571", badgeName: "Marine Life Warning",
              icon: "🟣", name: "Purple Flag - Dangerous Marine Life",
              text: "This is the flag that most people misunderstand. Purple has nothing to do with wave height or current strength. It means dangerous marine life has been spotted in or near the water - jellyfish, Portuguese man-of-war, sea lice, stingrays, or sharks. Purple is often flown alongside another flag, so you might see a yellow and a purple together, which means moderate surf AND jellyfish. You can swim under a purple flag, but you should shuffle your feet in the sand as you enter to avoid stingrays, scan the water before going in, and be prepared to exit quickly if you feel stings.",
            },
          ].map(flag => (
            <div key={flag.name} style={{ background: "#fff", border: "1px solid #e8ecf0", borderRadius: 12, padding: 24, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ minWidth: 52, height: 52, borderRadius: 8, background: `${flag.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{flag.icon}</div>
              <div>
                <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginBottom: 8, background: flag.badge, color: flag.badgeText, letterSpacing: "0.3px" }}>{flag.badgeName}</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{flag.name}</h3>
                <p style={{ fontSize: 15, color: "var(--text-light)", lineHeight: 1.65, margin: 0 }}>{flag.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={s.warningBox}>
          <div style={s.warningLabel}>Important - Double Red Is a Legal Order</div>
          <p style={{ fontSize: 15, color: "var(--text)", margin: 0, lineHeight: 1.7 }}>Unlike most beach flags, which are advisory, a double red flag carries legal weight in Florida. County ordinances in Palm Beach County, Broward County, and Miami-Dade County all make it unlawful to enter the water when double red flags are flying. Fines start at $100 and can reach $500. Lifeguards can call law enforcement to enforce this. Do not test it.</p>
        </div>

        <InlineCTA
          label="You Now Know More Than Most Beachgoers"
          headline="Give Your Child the Instincts to Match the Knowledge"
          body="Reading is step one. Our certified lifeguard instructors take children into the real Atlantic surf in West Palm Beach - where the flags are flying and the currents are real - and turn this knowledge into automatic, confident responses."
          btnText="Book a Session"
          trust="Ages 6+  •  2:1 instructor ratio  •  West Palm Beach, Boca Raton, Delray Beach"
        />

        <h2 style={s.h2}>Can Two Different Flags Fly at the Same Time?</h2>
        <p style={s.p}>Yes, and this is where things get confusing. Lifeguard towers typically have two flag poles. One flag describes water conditions (green, yellow, red, double red), and the other can fly a purple flag simultaneously to indicate marine life concerns.</p>
        <p style={s.p}>Common combinations you will see on South Florida beaches:</p>
        <ul style={{ margin: "16px 0 22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { combo: "Yellow + Purple:", desc: "Moderate surf and jellyfish or sea lice in the water. Most common during summer jellyfish season." },
            { combo: "Red + Purple:", desc: "Rough surf AND marine hazards. A day to sit on shore." },
            { combo: "Green + Purple:", desc: "Calm water but marine life present. Check conditions before entering and shuffle your feet." },
            { combo: "Double Red alone:", desc: "Beach closed due to water conditions. No marine life flag needed since no one should be in the water." },
          ].map(item => (
            <li key={item.combo} style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.7 }}><strong style={{ color: "var(--navy)" }}>{item.combo}</strong> {item.desc}</li>
          ))}
        </ul>

        <h2 style={s.h2}>What You Should Actually Do at Each Flag Level</h2>
        <p style={s.p}>Knowing what a flag means is step one. Knowing how to change your behavior at each level is what keeps your family safe. Here is a practical breakdown:</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "24px 0" }}>
          {[
            { icon: "🟢", title: "At a Green Flag", text: "Enter freely but never turn your back on the ocean. Assign a water watcher - one person whose only job is watching the swimmers. Keep children within arm's reach in waist-deep water and under." },
            { icon: "🟡", title: "At a Yellow Flag", text: "Keep children and weak swimmers in knee-to-waist-deep water only. Adult swimmers should stay within 50 yards of a lifeguard tower. If you feel yourself being pulled sideways along the shore, that is a lateral current - stay calm and walk parallel back toward the tower." },
            { icon: "🔴", title: "At a Single Red Flag", text: "Keep children on the sand. If you are an experienced ocean swimmer and choose to enter, stay close to shore and exit immediately if you feel a current pulling you seaward." },
            { icon: "🚩", title: "At a Double Red Flag", text: "Stay out of the water, full stop. The ocean will be there tomorrow. No swim is worth a $500 fine or a rescue in dangerous surf." },
            { icon: "🟣", title: "At a Purple Flag", text: "Shuffle your feet as you enter to alert stingrays hiding in the sand. If you see jellyfish or man-of-war on the beach, they are almost certainly in the water too. Do not touch them even on shore - tentacles can still sting hours after the animal is dead." },
          ].map(item => (
            <div key={item.title} style={{ background: "var(--off-white)", borderRadius: 8, padding: 20, display: "flex", gap: 16, alignItems: "flex-start", border: "1px solid #e8ecf0" }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={s.h2}>The Question Everyone Gets Wrong: What Does a Purple Flag Mean?</h2>
        <p style={s.p}>The most commonly misunderstood flag, by a wide margin, is purple. When we teach beach safety here in West Palm Beach, the purple flag question stumps most adults in the room. A lot of people assume it means the water is very rough or polluted. Neither is correct.</p>
        <p style={s.p}>Purple specifically means dangerous marine life. Locally, this almost always means one of the following:</p>
        <ul style={{ margin: "16px 0 22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Jellyfish bloom - large numbers of moon jellies or cannonball jellyfish near shore",
            "Portuguese man-of-war - common on South Florida beaches after southeast winds",
            "Sea lice - tiny larval jellyfish that cause a stinging rash, most common in late spring and early summer",
            "Stingray activity - high numbers reported in shallow water",
            "Shark sighting or recent shark activity near the beach",
          ].map(item => <li key={item} style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.7 }}>{item}</li>)}
        </ul>

        <div style={s.tipBox}>
          <div style={s.tipLabel}>Local Tip</div>
          <p style={{ fontSize: 15, color: "var(--text)", margin: 0, lineHeight: 1.7 }}>Portuguese man-of-war wash up on South Florida beaches most often in the spring, typically following strong east or southeast winds. If you see the signature blue-purple bubbles on the sand, a purple flag is almost certainly flying nearby. Do not step on them and do not touch them, even when they look deflated or dead. The tentacles can still sting.</p>
        </div>

        <h2 style={s.h2}>How the Beach Flag System Came to Be</h2>
        <p style={s.p}>The USLA standardized beach flag warning system was developed in the late 1980s as lifeguard agencies across the country recognized that inconsistent systems were causing confusion. Before standardization, different states - and even different counties - used different flag colors with different meanings. A red flag in one state might mean rough water while in another it meant swimming prohibited.</p>
        <p style={s.p}>The USLA worked with the American Red Cross and NOAA to develop a system that could be taught nationally and recognized by beachgoers no matter where they traveled. Florida formally adopted the system and integrated it into county beach management guidelines. Today, every guarded Florida beach flies the same system.</p>
        <p style={s.p}>At The Shore Academy, we teach the flag system as part of every ocean safety session. Kids who grow up knowing what each flag means make faster, better decisions at the beach - decisions that can save their lives or someone else's.</p>

        <InlineCTA
          label="Limited Spots Every Weekend"
          headline="Parents in Palm Beach County Are Already Booking Sessions"
          body="We cap every group at 6 students to protect our 2:1 instructor ratio. That means spots go fast - especially in spring and summer when beach days are peaking. The parents who book now are the ones whose kids head into the season prepared."
          btnText="Secure Your Child's Spot"
          trust="No swim test to inquire  •  We assess readiness on your call  •  Reschedule if conditions are unsafe"
        />
      </div>
    ),
  },

  // ── CHILD READINESS ────────────────────────────────────────────────────────
  "is-my-child-ready-for-ocean-swimming": {
    title: "Is Your Child Ready for the Ocean? A Parent's Complete Guide",
    seoTitle: "Is My Child Ready for Ocean Swimming? A Parent's Honest Guide | The Shore Academy",
    seoDescription: "Pool swimming and ocean swimming are not the same thing. Learn exactly what skills, signs, and benchmarks tell you whether your child is ready for the Atlantic surf - from certified ocean lifeguard instructors.",
    author: "The Shore Academy Instructors",
    readTime: 9,
    date: "2026-04-12",
    category: "For Parents",
    image: "https://images.pexels.com/photos/1755195/pexels-photo-1755195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Young boy running happily into ocean waves at a sunny Florida beach",
    endCtaHeadline: "Build Real Ocean Confidence",
    endCtaBody: "Our junior lifeguard program in West Palm Beach teaches children ages 6 to 15 the skills that actually keep them safe in the Atlantic surf. Real ocean instructors, real South Florida beaches. Serving West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale.",
    faq: [
      { q: "What age can a child start ocean swimming?", a: "There is no single right age because ocean readiness depends on skill level and temperament, not birthdays. Children under 6 should only be in the ocean if an adult is within arm's reach at all times, in ankle-to-knee-deep water. Children 6 to 9 who pass the three swim benchmarks in this article can begin supervised ocean swimming. Children 10 and older who have ocean-specific skills can begin building greater independence." },
      { q: "What is the difference between pool swimming and ocean swimming for kids?", a: "Pool swimming happens in still, predictable water with lane lines, a shallow end, and walls to grab. Ocean swimming involves rip currents, breaking waves, shifting sand floors, limited visibility below the surface, and no walls. A child who is a strong pool swimmer has the foundational stroke mechanics, but has not been exposed to any of the variables that make the ocean different. Pool swimming is a prerequisite for ocean swimming - not a replacement for ocean-specific preparation." },
      { q: "Is it safe for my child to wear floaties at the beach?", a: "Inflatable floaties and water wings are not designed for ocean surf and can be actively dangerous in it. A wave can knock a child over and pin them face-down if they are wearing floaties, or tear the device off entirely. If a child needs floaties to be safe in water, the ocean is not the right environment yet. Build independent floating and treading ability in a pool first, then transition to ocean wading gradually without any flotation devices." },
      { q: "How do I know if my child is a strong enough swimmer for the ocean?", a: "Test three things in a pool before going to the beach: Can your child swim 25 yards continuously without stopping? Can they float on their back for 60 seconds without help? Can they tread water for 2 minutes? If all three are easy and comfortable, they have the physical baseline. Then also consider emotional readiness: Do they stay calm when water hits their face unexpectedly? Do they follow safety instructions quickly? Both matter." },
      { q: "What is a junior lifeguard program and is it right for my child?", a: "A junior lifeguard program teaches children ocean-specific safety skills that go beyond what swim lessons cover. This includes reading beach conditions, identifying and escaping rip currents, understanding beach flags, safe entry and exit through surf, body surfing, and basic self-rescue techniques. Our program at The Shore Academy in West Palm Beach is designed for children ages 6 to 15 who have basic swim skills. It is a good fit for any child who spends regular time at the beach." },
    ],
    related: [
      { slug: "how-to-escape-a-rip-current", tag: "Ocean Safety", title: "How to Escape a Rip Current: Step-by-Step Survival Guide", desc: "Rip currents cause over 80% of lifeguard rescues. Learn exactly what to do if you get caught in one." },
      { slug: "beach-flag-colors-florida", tag: "Beach Safety", title: "Beach Flag Colors Explained: What Every Flag Means in Florida", desc: "Green, yellow, red, double red, purple. Do you actually know what each flag means? Full guide from our certified instructors." },
    ],
    content: (
      <div>
        <div style={s.callout}>
          <div style={s.calloutLabel}>The Short Answer</div>
          <p style={s.calloutP}>A child who can swim 25 yards without stopping, float on their back for 60 seconds, and tread water for 2 minutes meets the physical baseline for ocean exposure. But physical ability is only part of it. Ocean swimming also requires awareness, calmness under surprise, and the ability to follow instructions quickly. If your child panics in a pool when water hits their face, they are not ready for the surf yet - regardless of their swimming level.</p>
        </div>

        <p style={s.p}>This is one of the most common questions parents ask us. And it is a good one to ask, because the answer is not always what they expect.</p>
        <p style={s.p}>Most parents come to us thinking their child is already an ocean swimmer because they can swim laps in a pool. A few minutes in real surf changes that picture quickly. The ocean is not a bigger pool. It moves, it pushes, it pulls, and it does none of this on a predictable schedule. The skills that make a child safe in the ocean overlap with pool swimming, but they are not the same thing at all.</p>

        <div style={s.statRow} className="stat-grid">
          {[{ num: "73%", label: "of child drownings happen in open water, not pools" }, { num: "3", label: "core swim benchmarks before ocean exposure" }, { num: "6-15", label: "ideal age range for junior lifeguard programs" }].map(st => (
            <div key={st.label} style={s.statBox}><span style={s.statNum}>{st.num}</span><span style={s.statLabel}>{st.label}</span></div>
          ))}
        </div>

        <h2 style={s.h2}>Why Pool Swimming Does Not Equal Ocean Readiness</h2>
        <p style={s.p}>Swim lessons are genuinely important. If your child takes swim lessons, that is a great foundation. But parents sometimes assume that because their child passed swim levels at the local Y, the ocean is a natural next step. That assumption has put a lot of kids in scary situations.</p>
        <p style={s.p}>Here is what pool swimming does not prepare you for:</p>
        <ul style={{ margin: "16px 0 22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Moving water.", text: "Pools have zero current. The ocean has rip currents, longshore currents, surge, and backwash. A child who has only ever swum in still water will be disoriented the first time a wave pushes them sideways." },
            { label: "Breaking waves.", text: "Getting caught by a shore break wave is physically jarring in a way a pool never is. Children who have not experienced this often panic, inhale water, and lose their footing in shallow water." },
            { label: "No walls to grab.", text: "In a pool, if you are tired or scared, you can touch the bottom or grab the wall. In the ocean, neither of those options may be available. Swimming to shore against even a small current requires genuine endurance." },
            { label: "Disorientation.", text: "Under a wave, salt water stings the eyes, it is impossible to see anything, and up and down are not always obvious. Children who have not been taught what to do will struggle in ways that can escalate quickly." },
            { label: "Sand bottom instability.", text: "The seafloor shifts, drops off unexpectedly, and creates channels. A child walking in knee-deep water can step into a trough that puts them chest-deep in one step." },
          ].map(item => (
            <li key={item.label} style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.7 }}><strong style={{ color: "var(--navy)" }}>{item.label}</strong> {item.text}</li>
          ))}
        </ul>
        <p style={s.p}>None of this is meant to scare you away from the beach. The ocean is one of the most wonderful, formative environments a child can grow up around. But it deserves honest preparation.</p>

        <h2 style={s.h2}>The Three Skill Benchmarks We Use at The Shore Academy</h2>
        <p style={s.p}>Before any child enters the surf zone in our programs, we confirm three baseline abilities. These come from 50-plus years of combined open-water experience from our instructors on South Florida beaches.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0" }}>
          {[
            { title: "25-Yard Continuous Swim", text: "Can your child swim the length of a standard pool without stopping, touching the bottom, or grabbing the lane line? This is roughly the distance from the shore break to outside the surf zone on a calm day. If they cannot make it that far in a pool, the surf will exhaust them faster." },
            { title: "60-Second Back Float", text: "Can your child float on their back for a full minute without any assistance? This is a survival skill, not a swim skill. If a child panics in the ocean and exhausts themselves, floating on their back is what keeps them at the surface while help arrives. If they cannot do this calmly, we work on it in the pool first." },
            { title: "2-Minute Treading Water", text: "Can your child tread water for two minutes without holding anything? Treading water in the ocean is harder than in a pool due to wave movement, so if they can comfortably manage two minutes in a pool, they have the endurance for brief ocean self-rescue situations." },
          ].map((b, i) => (
            <div key={b.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", border: "1px solid #e8ecf0", borderRadius: 8, padding: "16px 20px" }}>
              <div style={{ minWidth: 28, height: 28, background: "var(--teal)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{b.title}</h4>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{b.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={s.tipBox}>
          <div style={s.tipLabel}>Quick Home Test</div>
          <p style={{ fontSize: 15, color: "var(--text)", margin: 0, lineHeight: 1.7 }}>Take your child to a pool before your next beach trip and run all three tests. Swim 25 yards, back float for 60 seconds, tread for 2 minutes. If they pass all three easily and are calm throughout, they are physically ready for supervised ocean exposure. If any test causes significant struggle or panic, that is the area to work on first.</p>
        </div>

        <InlineCTA
          label="Your Child Just Passed the Home Test - What Comes Next?"
          headline="The Pool Is the Foundation. The Ocean Is the Real Classroom."
          body="If your child can clear those three benchmarks, they are physically ready to begin ocean training. Our certified instructors in West Palm Beach take it from here - teaching rip current identification, wave reading, and real surf entry in a structured, safe environment on actual Florida beaches."
          btnText="Book Their First Ocean Session"
          trust="Ages 6-15  •  2:1 instructor ratio  •  We assess readiness on a free phone call first"
        />

        <h2 style={s.h2}>Signs Your Child Is Not Ready Yet</h2>
        <p style={s.p}>Physical benchmarks aside, there are behavioral and emotional signals that tell us a child needs more time before the surf. These are often harder for parents to spot because they can look like excitement rather than anxiety.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0" }}>
          {[
            { title: "Panics When Water Hits Their Face Unexpectedly", text: "In the ocean, getting splashed in the face by a wave is not optional. It will happen. A child who panics or freezes when this occurs in the pool will do the same in the ocean, in a much less controlled situation. This is fixable with practice, but it needs to be fixed in the pool first." },
            { title: "Cannot or Will Not Float on Their Back", text: "Some children resist the back float because it requires them to trust the water and relax. If your child fights the float, that resistance will compound in the ocean when the stakes are higher. Building comfort in that position is a priority before ocean exposure." },
            { title: "Requires Floaties or a Flotation Device to Feel Safe", text: "Water wings and pool floaties are not rated for ocean surf. They can be pulled off by waves, and a child who depends on them for safety will be in genuine danger if they lose them. If your child cannot be in water safely without a device, the pool is the right place to build that independence first." },
            { title: "Does Not Follow Safety Instructions Quickly", text: "In the ocean, there are moments when a lifeguard or parent needs a child to respond immediately - to turn around, to stop, to swim toward them. A child who frequently ignores or delays following safety instructions needs more work on this before going into surf." },
            { title: "Has Not Experienced Open Water at All", text: "First-time ocean exposure should not happen on a big surf day. If your child has only ever been in pools, their introduction to the ocean should be gradual - starting at the shoreline, getting used to waves washing over their feet, then knees, then waist, before ever attempting to swim." },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff5f5", border: "1px solid rgba(232,93,80,0.15)", borderRadius: 8, padding: "16px 20px" }}>
              <div style={{ minWidth: 28, height: 28, background: "var(--coral)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, color: "#fff", fontWeight: 700, fontSize: 14 }}>!</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={s.h2}>Age-by-Age Guide to Ocean Exposure</h2>
        <p style={s.p}>There is no single right age to start ocean swimming, because skills matter more than birthdays. But age does inform what is reasonable to expect and how closely a child needs to be supervised:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, margin: "24px 0" }} className="stat-grid">
          {[
            { age: "Ages 3-5", title: "Shoreline and Shallow Wade Only", skills: ["Adult within arm's reach at all times", "Stay in ankle-to-knee-deep water", "Focus on comfort with water on face", "Learn to jump over small wash waves", "No swimming, even in calm conditions"] },
            { age: "Ages 6-8", title: "Supervised Surf Zone Entry", skills: ["Must pass the three swim benchmarks", "Adult within 10 feet at all times", "Swim parallel to shore in waist-deep water", "Learn to read incoming waves and duck under them", "Ideal starting point for junior lifeguard programs"] },
            { age: "Ages 9-11", title: "Building Ocean Confidence", skills: ["Swim benchmarks plus ocean-specific skills", "Begin learning rip current identification", "Body surfing in small-to-moderate surf", "Supervised ocean swims up to 50 yards offshore", "Learn what beach flags mean and how to respond"] },
            { age: "Ages 12-15", title: "Junior Lifeguard Skills", skills: ["Rip current escape techniques", "Assisting a struggling swimmer safely", "Reading conditions independently", "Longer ocean swims in supervised groups", "Rescue board and rescue tube familiarization"] },
          ].map(group => (
            <div key={group.age} style={{ background: "var(--off-white)", border: "1px solid rgba(26,111,160,0.1)", borderRadius: 8, padding: 20 }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, background: "var(--ocean)", color: "#fff", padding: "3px 10px", borderRadius: 20, marginBottom: 10, letterSpacing: "0.3px" }}>{group.age}</span>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{group.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {group.skills.map(skill => (
                  <li key={skill} style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.5, paddingLeft: 14, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--teal)" }}>&#8226;</span>{skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <InlineCTA
          label="You've Read the Age Guide. You Know Where Your Child Fits."
          headline="This Season, Let Them Train With the People Who Wrote the Guide"
          body="Our instructors have spent 50-plus years on these exact South Florida beaches. They built these benchmarks from real rescue experience, not textbooks. Weekend spots fill fast in spring and summer. The families booking now are the ones whose kids will be confident in the ocean before school's out."
          btnText="Secure Their Spot for This Season"
          trust="Max 6 students per session  •  Free reschedule if conditions are unsafe  •  West Palm Beach, Boca Raton, Delray Beach"
        />

        <h2 style={s.h2}>What Does Ocean Ready Actually Look Like?</h2>
        <p style={s.p}>Beyond the benchmarks, there is a quality we look for in kids that is harder to measure but easy to spot when you see it. The children who handle the ocean best are not always the strongest swimmers. They are the ones who stay curious instead of panicked when something unexpected happens.</p>
        <p style={s.p}>A wave knocks them down. An ocean-ready child comes up looking for what to do next. A child who is not ready yet comes up in tears or frozen.</p>
        <p style={s.p}>A current pulls them sideways a little. An ocean-ready child reads it, adjusts, walks back. A child who is not ready yet fights it or ignores it.</p>
        <p style={s.p}>This is the stuff that our junior lifeguard program in West Palm Beach is specifically designed to build. Not just swim fitness - though we work on that too. The mental composure that comes from understanding what is happening in the water around you and knowing you have a plan for it.</p>

        <h2 style={s.h2}>What Parents Can Do Right Now</h2>
        <p style={s.p}>You do not need to wait for a formal program to start building ocean awareness. Here are practical things to do on your next beach visit:</p>
        <ul style={{ margin: "16px 0 22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Always check the beach flag before entering the water.", text: "Make it a habit to identify the flag together and talk about what it means. Kids who grow up doing this check automatically are far safer." },
            { label: "Point out the lifeguard tower.", text: "Tell your child to look for the tower if they get separated from you, and to raise one arm if they need help in the water." },
            { label: "Practice the back float in the ocean shallows.", text: "Lie in 6 inches of water and let the wash come over you. This builds comfort with moving water in a safe way." },
            { label: "Walk the beach and look at the wave patterns together.", text: "Show your child where the waves are bigger and where the water looks darker or choppier. These are early lessons in reading conditions." },
            { label: "Never go in past your knees alone.", text: "Make this a firm family rule regardless of swimming ability, and especially on beach days when a lifeguard is not on duty." },
          ].map(item => (
            <li key={item.label} style={{ fontSize: 16, color: "var(--text)", lineHeight: 1.7 }}><strong style={{ color: "var(--navy)" }}>{item.label}</strong> {item.text}</li>
          ))}
        </ul>

        <h2 style={s.h2}>When to Consider a Structured Ocean Safety Program</h2>
        <p style={s.p}>If your family spends any real time at South Florida beaches - even just a few weekends a year - a structured ocean safety program is worth serious consideration. The skills your child will pick up are not niche or specialized. Knowing how to escape a rip current, read a beach flag, help a struggling swimmer, and enter and exit through surf safely are fundamental life skills for anyone living within driving distance of the Atlantic coast.</p>
        <p style={s.p}>Our junior lifeguard program at The Shore Academy runs in West Palm Beach and covers all of this in a structured, age-appropriate way. Children learn alongside peers, under the guidance of certified open-water lifeguard instructors. The program is specifically designed for ages 6 to 15, with different tracks based on skill level - not age alone.</p>
        <p style={s.p}>If your child meets the three swim benchmarks above and spends time at the beach, they are a good fit. If they do not yet meet the benchmarks, we can point you toward the right preparation steps before they start.</p>
      </div>
    ),
  },
};

// ─── GENERATE PARAMS ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const { data } = await fetchBlogPosts({ "pagination[pageSize]": "100" });
  const strapiSlugs = (data || []).map((post: any) => ({ slug: post.attributes?.slug ?? "" })).filter((p: { slug: string }) => p.slug);
  const staticSlugs = Object.keys(STATIC_CONTENT).map((slug) => ({ slug }));
  return [...staticSlugs, ...strapiSlugs];
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const staticPost = STATIC_CONTENT[slug];
  if (staticPost) {
    return { title: staticPost.seoTitle ?? staticPost.title, description: staticPost.seoDescription };
  }
  const data = await fetchBlogPost(slug);
  const post = data?.data?.[0]?.attributes;
  if (!post) return {};
  return { title: post.seoTitle ?? post.title, description: post.seoDescription };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const staticPost = STATIC_CONTENT[slug];

  // ── Strapi fallback ──
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
            <Link href="/academy-resources" style={{ color: "var(--teal)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 24 }}>
              &larr; Back to Academy Resources
            </Link>
            {post.category && <span style={{ display: "inline-block", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>{post.category}</span>}
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>{post.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{post.author} &bull; {post.readTimeMinutes} min read &bull; {new Date(post.publishedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", fontSize: 16, lineHeight: 1.8, color: "var(--text)" }}>
          <p style={{ fontSize: 18, color: "var(--text-light)", marginBottom: 32 }}>{post.excerpt}</p>
          <p style={{ color: "var(--text-light)" }}>Content available in CMS.</p>
          <div style={{ marginTop: 60, padding: "32px 40px", background: "linear-gradient(135deg, var(--navy), var(--deep-blue))", borderRadius: "var(--radius)", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Ready to Put This Knowledge Into Practice?</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>Book an ocean safety session with our certified lifeguard instructors.</p>
            <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}>Book a Session &rarr;</Link>
          </div>
        </div>
      </article>
    );
  }

  // ── Static post ──
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: staticPost.seoTitle ?? staticPost.title,
    description: staticPost.seoDescription,
    author: { "@type": "Organization", name: "The Shore Academy", url: "https://theshoreacademy.com" },
    datePublished: staticPost.date,
    dateModified: staticPost.date,
    image: staticPost.image,
    publisher: { "@type": "Organization", name: "The Shore Academy", url: "https://theshoreacademy.com", logo: { "@type": "ImageObject", url: "https://theshoreacademy.com/favicon.png" } },
    mainEntityOfPage: `https://theshoreacademy.com/academy-resources/${slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <header style={{ background: "linear-gradient(165deg, var(--navy) 0%, var(--deep-blue) 50%, var(--ocean) 100%)", padding: "140px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 80%, rgba(15,163,177,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20, flexWrap: "wrap" as const }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>&#8250;</span>
            <Link href="/academy-resources" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Academy Resources</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>&#8250;</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{staticPost.category}</span>
          </nav>
          <span style={{ display: "inline-block", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>{staticPost.category}</span>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>{staticPost.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" as const, marginTop: 20 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>By {staticPost.author}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{staticPost.readTime} min read</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{new Date(staticPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <div style={{ position: "relative", maxHeight: 480, overflow: "hidden" }}>
        <Image src={staticPost.image} alt={staticPost.imageAlt} width={1260} height={480} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} priority />
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px" }}>
        {staticPost.content}
      </div>

      {/* Author bio */}
      <div style={{ background: "var(--sand-light, #faf3e8)", borderTop: "1px solid #e8ecf0" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ minWidth: 54, height: 54, background: "linear-gradient(135deg, var(--ocean), var(--teal))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🌊</div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>Written by The Shore Academy - Certified Ocean Lifeguard Instructors</h4>
            <p style={{ fontSize: 12, color: "var(--teal)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>West Palm Beach, FL</p>
            <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.65, margin: 0 }}>The Shore Academy is South Florida's only dedicated ocean safety school. Our instructors are USLA-certified with 50-plus years of combined open-water experience on Atlantic Ocean beaches in Palm Beach County. Every guide we publish is written from direct, real-world experience - not textbooks.</p>
          </div>
        </div>
      </div>

      {/* End CTA */}
      <section style={{ background: "linear-gradient(165deg, var(--navy), var(--deep-blue), var(--ocean))", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>{staticPost.endCtaHeadline}</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 32 }}>{staticPost.endCtaBody}</p>
          <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--coral)", color: "#fff", padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 700, textDecoration: "none" }}>
            Book an Ocean Safety Session &rarr;
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--off-white)", padding: "72px 24px" }} aria-labelledby="faq-heading">
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 id="faq-heading" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px,3vw,34px)", fontWeight: 700, color: "var(--navy)", marginBottom: 32, textAlign: "center" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {staticPost.faq.map((item, i) => (
              <details key={i} style={{ background: "#fff", borderRadius: 8, border: "1px solid rgba(26,111,160,0.08)", overflow: "hidden" }} className="faq-details">
                <summary style={{ padding: "20px 24px", fontSize: 16, fontWeight: 600, color: "var(--navy)", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, userSelect: "none" as const }}>
                  <span>{item.q}</span>
                  <span style={{ fontSize: 20, color: "var(--ocean)", flexShrink: 0, lineHeight: 1 }} aria-hidden="true">+</span>
                </summary>
                <div style={{ padding: "0 24px 20px", fontSize: 15, color: "var(--text-light)", lineHeight: 1.75, borderTop: "1px solid rgba(26,111,160,0.08)", paddingTop: 16 }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* More You Might Like */}
      <section style={{ background: "#fff", padding: "72px 24px" }} aria-labelledby="related-heading">
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 id="related-heading" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "var(--navy)", marginBottom: 28 }}>
            More You Might Like
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="related-grid">
            {staticPost.related.map((r) => (
              <Link key={r.slug} href={`/academy-resources/${r.slug}`} style={{ background: "var(--off-white)", border: "1px solid rgba(26,111,160,0.1)", borderRadius: 12, padding: 24, textDecoration: "none", display: "block", transition: "all 0.2s" }} className="related-card">
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.5px", color: "var(--teal)", marginBottom: 8, display: "block" }}>{r.tag}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", lineHeight: 1.4, marginBottom: 8 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <div style={{ background: "var(--off-white)", padding: "24px", borderTop: "1px solid #e8ecf0", textAlign: "center" }}>
        <Link href="/academy-resources" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "var(--ocean)", textDecoration: "none" }}>
          &larr; Back to Academy Resources
        </Link>
      </div>

      <style>{`
        .stat-grid { }
        @media (max-width: 600px) {
          .stat-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
        .faq-details summary::-webkit-details-marker { display: none; }
        .faq-details[open] summary span:last-child { transform: rotate(45deg); display: inline-block; }
        .related-card:hover { border-color: var(--teal) !important; box-shadow: 0 4px 20px rgba(10,22,40,0.10); transform: translateY(-2px); }
      `}</style>
    </article>
  );
}
