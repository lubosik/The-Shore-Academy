import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = {
  title: "Ocean Safety School South Florida | Rip Current Training for All Ages | The Shore Academy",
  description:
    "The Shore Academy is South Florida's only dedicated ocean safety school. Rip current training, wave navigation, and beach safety for children, teens, and adults in West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do you need to already know how to swim to join The Shore Academy?", acceptedAnswer: { "@type": "Answer", text: "Yes, absolutely. The Shore Academy is an ocean navigation and safety program for anyone who already swims independently. Every student must be able to swim confidently in a pool, tread water comfortably, and be at ease in water over their head." } },
    { "@type": "Question", name: "Where are ocean safety sessions held?", acceptedAnswer: { "@type": "Answer", text: "We operate on Atlantic Ocean beaches across South Florida, serving West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale. The exact beach location is confirmed during your pre-session phone consultation." } },
    { "@type": "Question", name: "Do you work with adults and teenagers, not just kids?", acceptedAnswer: { "@type": "Answer", text: "Yes - The Shore Academy is for everyone, not just children. Group ocean safety sessions are open to anyone ages 6 and up who already swims: kids, teenagers, and adults alike." } },
    { "@type": "Question", name: "How do I escape a rip current?", acceptedAnswer: { "@type": "Answer", text: "Never swim directly against a rip current - it will exhaust you. Swim parallel to shore until you are out of the current, then angle back to the beach at a diagonal. If you cannot escape, float, conserve energy, and signal for help." } },
    { "@type": "Question", name: "What is the Junior Lifeguard Program in Florida?", acceptedAnswer: { "@type": "Answer", text: "Our Junior Lifeguard Program is a quarterly, 4-week intensive for elite-level swimmers who want to train toward becoming certified ocean lifeguards. It runs on Saturdays and covers intensive physical training, expert rescue skills, USLA lifeguard competition prep, and real-world certification readiness." } },
  ],
};

const FAQS = [
  { q: "Do you need to already know how to swim?", a: "Yes, absolutely. The Shore Academy is an ocean navigation and safety program for anyone - children, teenagers, or adults - who already swims independently. Every student must be able to swim confidently in a pool, tread water comfortably, and be at ease in water over their head. If you or your child are still learning to swim, complete pool lessons first and then join us. We are not a learn-to-swim program. We are an ocean mastery program." },
  { q: "Where are sessions held - West Palm Beach, Boca Raton, Delray Beach, Miami, or Fort Lauderdale?", a: "We operate on the Atlantic Ocean beaches across South Florida, serving West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale. The exact beach location for your session is confirmed during your pre-session phone consultation based on conditions and your location." },
  { q: "Do you work with adults and teenagers, not just kids?", a: "Yes - The Shore Academy is for everyone, not just children. Group ocean safety sessions are open to anyone ages 6 and up who already swims: kids, teenagers, and adults alike. Many of our students are adults who spend time on South Florida beaches and want to genuinely understand rip currents, read the surf, and feel safe in the Atlantic. Private 1:1 sessions can accommodate ages 5+ after consultation." },
  { q: "How do I escape a rip current?", a: "Never swim directly against a rip current - it will exhaust you. Swim parallel to shore until you are out of the current, then angle back to the beach at a diagonal. If you cannot escape, float, conserve energy, and signal for help. This is one of the core skills we teach in every Shore Academy session." },
  { q: "What happens during the pre-session phone consultation?", a: "One of our coaches calls you to discuss your child's swimming background, comfort level in the ocean, personality, any fears or concerns, medical conditions, and what to expect. This helps us tailor instruction and confirm the beach location for your session." },
  { q: "What if you determine my child isn't ready for ocean instruction?", a: "Safety first. If during our consultation or initial beach assessment we determine your child isn't ready, we will provide a full deposit refund and recommend pool programs to build their foundation. We want every student to succeed, and sometimes that means building a stronger base first." },
  { q: "What is the Junior Lifeguard Program in Florida?", a: "Our Junior Lifeguard Program is a quarterly, 4-week intensive for elite-level swimmers who want to train toward becoming certified ocean lifeguards. It runs on Saturdays and covers intensive physical training, expert rescue skills, USLA lifeguard competition prep, and real-world certification readiness. Graduates are prepared to pass ocean lifeguard tests nationwide. Cohorts are limited to 6 students." },
  { q: "What happens in bad weather?", a: "We monitor conditions closely. If ocean conditions are unsafe (red flags, lightning, severe storms), we will reschedule your session at no charge. Light rain and moderate surf are part of the ocean experience and sessions may still proceed. We communicate any changes via text and email the morning of your session." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ═══ HERO ═══ */}
      <section id="home" aria-label="Hero" style={{ background: "linear-gradient(165deg, var(--navy) 0%, #0d2040 40%, #0a1f3c 70%, var(--deep-blue) 100%)", position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 60% 40%, rgba(15,163,177,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(26,111,160,0.1) 0%, transparent 50%)" }} aria-hidden="true" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 20px", marginBottom: 32, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
            <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Now Enrolling - West Palm Beach &bull; Boca Raton &bull; Delray Beach &bull; Miami &bull; Fort Lauderdale
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-1px" }}>
            Respect the Water.<br />
            <em style={{ color: "var(--teal)", fontStyle: "italic" }}>Rule the Shore.</em>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.75)", maxWidth: 640, lineHeight: 1.7, marginBottom: 40 }}>
            South Florida&apos;s only dedicated ocean safety school. Our certified lifeguard instructors teach children, teens, and adults how to navigate rip currents, read waves, and move confidently through the open ocean - with a strict 2:1 student-to-instructor ratio on every session. You must already know how to swim.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/book-a-session" className="btn-coral">Book a Session →</Link>
            <Link href="/#curriculum" className="btn-outline-white">See Curriculum</Link>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
            {[{ num: "50+", label: "Years Combined Experience" }, { num: "100s", label: "Ocean Rescues" }, { num: "2:1", label: "Student to Instructor Ratio" }].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6, letterSpacing: "0.3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 80 }} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120Z" fill="#f8f9fa" opacity="0.6" />
          <path d="M0,80 C320,30 640,100 960,60 C1200,30 1360,50 1440,40 L1440,120 L0,120Z" fill="#f8f9fa" />
        </svg>
      </section>

      {/* ═══ DISCLAIMER BANNER ═══ */}
      <div role="alert" style={{ background: "linear-gradient(135deg, #0d2040, var(--ocean))", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>⚠ Important: Students must already know how to swim at a high level before enrolling</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>
          The Shore Academy is an ocean navigation and safety program, not a learn-to-swim school. Pool swimming proficiency is a mandatory prerequisite.{" "}
          <a href="#prereqs" style={{ color: "#fff", textDecoration: "underline" }}>Read full requirements ↓</a>
        </p>
      </div>

      {/* ═══ ABOUT ═══ */}
      <section id="about" aria-labelledby="about-title" style={{ padding: "100px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Why The Shore Academy</span>
          <h2 id="about-title" className="section-title" style={{ maxWidth: 700 }}>The Only Dedicated Ocean Safety School in South Florida</h2>
          <p className="section-desc">Every year, hundreds of drownings happen in open water because people don&apos;t understand the ocean. Rip currents alone claim over 100 lives annually in the U.S. We&apos;re changing that - one student at a time in West Palm Beach, Boca Raton, and Delray Beach.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", marginTop: 60 }} className="about-grid">
            <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <Image src="/hero-image.png" alt="Certified ocean lifeguard instructor teaching children ocean safety skills in the Atlantic Ocean surf at a West Palm Beach Florida beach" width={600} height={420} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { icon: "🌊", title: "Real Ocean, Real Skills - Not a Pool", text: "No pools. No simulations. Students train in actual ocean conditions alongside lifeguards who have performed hundreds of real rescues on South Florida beaches." },
                { icon: "💪", title: "Life-Saving Ocean Knowledge", text: "Rip currents, wave patterns, beach flag systems, rescue techniques, and distress signals. Skills that can save your child's life and the lives of others in the Atlantic Ocean." },
                { icon: "🏆", title: "2:1 Ratio - Every Single Session", text: "We maintain a strict 2:1 student-to-instructor ratio on every session. Every team member is a certified ocean lifeguard with CPR/AED and American Red Cross certifications. Even our media director is a certified lifeguard in the water with your child." },
                { icon: "📸", title: "Professional Media Captured Every Session", text: "Professional photography and video of every session. Watch your child grow in confidence. A keepsake of an incredible and unique ocean safety experience." },
              ].map((p) => (
                <div key={p.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{p.title}</h4>
                    <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6 }}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CURRICULUM ═══ */}
      <section id="curriculum" aria-labelledby="curriculum-title" style={{ padding: "100px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">What They&apos;ll Learn</span>
          <h2 id="curriculum-title" className="section-title">A Complete Ocean Safety Education</h2>
          <p className="section-desc">Every session builds real-world ocean competency. These aren&apos;t classroom lessons - students are coached by certified lifeguard experts in the Atlantic Ocean.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 50 }} className="three-col-grid">
            {[
              { icon: "🌊", title: "Rip Current Identification & Escape", text: "How to spot, avoid, and escape rip currents - the #1 cause of ocean drownings in the U.S. Students learn to read the water, stay calm under pressure, and swim parallel to shore to safety.", tag: "Critical Safety" },
              { icon: "🚩", title: "Beach Flag System", text: "What every beach flag color means: green, yellow, red, purple, and double red. Understanding ocean conditions before you step into the water. Mandatory knowledge for every Florida beachgoer.", tag: "Awareness" },
              { icon: "🏄", title: "Wave Navigation & Body Surfing", text: "How to read, time, and ride waves safely. Proper ocean entry and exit techniques. Body positioning for different wave types and how to avoid getting caught inside a break.", tag: "Core Skill" },
              { icon: "👀", title: "Ocean Reading & Awareness", text: "Understanding tides, currents, sandbars, and how the ocean floor affects surface conditions. Turning students into ocean-literate swimmers who can assess conditions before entering.", tag: "Knowledge" },
              { icon: "🙌", title: "Distress Signaling", text: "How to signal a lifeguard when in trouble. How to call for help effectively in the water. What to do if you see another swimmer in distress. Critical skills every ocean swimmer needs.", tag: "Emergency" },
              { icon: "🧜", title: "Rescue Basics", text: "How to safely assist someone in the water without putting yourself at risk. Reach, throw, row, go. Turning students into water safety assets who can help in an emergency.", tag: "Advanced" },
            ].map((c) => (
              <div key={c.title} className="hover-lift" style={{ background: "var(--off-white)", borderRadius: "var(--radius)", padding: "32px 28px", border: "1px solid transparent" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, var(--ocean), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6 }}>{c.text}</p>
                <span style={{ display: "inline-block", marginTop: 14, padding: "4px 12px", borderRadius: 20, background: "rgba(26,111,160,0.08)", color: "var(--ocean)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section id="team" aria-labelledby="team-title" style={{ padding: "100px 24px", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", marginBottom: 12 }}>Meet Your Coaches</span>
          <h2 id="team-title" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>50+ Years of Open Water Experience</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>Every member of our team has spent years protecting lives in the ocean. This isn&apos;t a side job. It&apos;s who we are - certified ocean lifeguards serving the South Florida coast.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 50 }}>
            {["Ocean Lifeguard Certified", "CPR / AED Certified", "American Red Cross Certified", "Collegiate Athletes & Swimmers", "Hundreds of Ocean Rescues", "Strict 2:1 Student-to-Instructor Ratio"].map((cert) => (
              <div key={cert} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "10px 20px", fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                <span style={{ color: "var(--teal)", fontWeight: 700 }}>✓</span> {cert}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="three-col-grid">
            {[
              { name: "Dominick", role: "Founder & Head Coach", bio: "Fire Island, NY ocean lifeguard veteran with hundreds of real-water saves. Founded The Shore Academy to bring professional ocean safety education to every family in South Florida. His passion for water safety was cemented after personally saving two lives on the same weekend - and realizing there was no school teaching people how to survive the ocean." },
              { name: "Dean", role: "Instructor", bio: "Collegiate swimmer and certified ocean lifeguard with years of experience on South Florida beaches. Dean's patient, detail-oriented coaching style makes him especially effective with younger students. He is our rip current and wave navigation specialist, breaking down complex ocean behavior into skills that stick." },
              { name: "Chris", role: "Certified Lifeguard & Media Director", bio: "A certified ocean lifeguard and professional-grade photographer and videographer. Chris is in the water with every session providing active safety coverage - while simultaneously capturing the kind of professional media that families treasure forever. Every great shot you see from The Shore Academy has Chris behind it." },
            ].map((member) => (
              <div key={member.name} className="hover-team-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius)", padding: "28px 24px" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 16, border: "3px solid rgba(255,255,255,0.1)" }}>{member.name[0]}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{member.name}</h4>
                <div style={{ color: "var(--teal)", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{member.role}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" aria-labelledby="testimonials-title" style={{ padding: "100px 24px", background: "var(--sand-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Parent Reviews</span>
          <h2 id="testimonials-title" className="section-title">What South Florida Parents Are Saying</h2>
          <p className="section-desc">Real families from West Palm Beach, Boca Raton, and Delray Beach share their experience at The Shore Academy.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 50 }} className="three-col-grid">
            {[
              { initial: "S", name: "Sarah M.", location: "West Palm Beach, FL", quote: "My 9-year-old was terrified of waves. After just two sessions with The Shore Academy, she was reading the water and navigating the surf on her own. The 2:1 instructor ratio makes all the difference. Absolutely world-class." },
              { initial: "M", name: "Michael T.", location: "Boca Raton, FL", quote: "We live in Boca Raton and go to the beach every weekend. I never knew how little my kids understood about rip currents until this course. Now they know exactly what to do. This program should be mandatory for every Florida kid." },
              { initial: "J", name: "Jessica R.", location: "Delray Beach, FL", quote: "The professional photos and video alone are worth it. But what really blew us away was how much our son grew in just one session. Dominick and the team are incredible instructors. We're already booked for the 6-session mastery course." },
            ].map((t) => (
              <div key={t.name} className="hover-lift" style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "32px 28px", boxShadow: "var(--shadow)" }}>
                <div style={{ color: "#f59e0b", fontSize: 18, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                <blockquote style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-light)" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 40, justifyContent: "center", flexWrap: "wrap" }}>
            {["★ 5.0 Google Rating", "✓ Verified South Florida Families", "📷 Professional Media Every Session"].map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--white)", borderRadius: 50, padding: "10px 20px", boxShadow: "var(--shadow)", fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" aria-labelledby="gallery-title" style={{ padding: "100px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">In Action</span>
          <h2 id="gallery-title" className="section-title">Moments That Last a Lifetime</h2>
          <p className="section-desc">Professional photography and video of every ocean safety session. Your child&apos;s ocean journey, captured beautifully on the beaches of South Florida.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 200px)", gap: 16, marginTop: 50 }} className="gallery-grid">
            <div style={{ gridColumn: "span 2", gridRow: "span 2", borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
              <Image src="/gallery-hero.png" alt="Children and certified ocean lifeguard instructors from The Shore Academy navigating waves together on a South Florida beach" fill style={{ objectFit: "cover" }} loading="lazy" />
            </div>
            {[
              { src: "https://images.pexels.com/photos/15282267/pexels-photo-15282267.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Miami Beach lifeguard tower with yellow warning flags flying - teaching children to identify beach flag colors and safety signals in South Florida" },
              { src: "https://images.pexels.com/photos/4319752/pexels-photo-4319752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Aerial view of multiple surfers riding ocean waves together - wave navigation and body surfing technique training at The Shore Academy" },
              { src: "https://images.pexels.com/photos/29851089/pexels-photo-29851089.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Group of children enjoying a sunny beach day - group ocean safety session with The Shore Academy in West Palm Beach Florida" },
              { src: "https://images.pexels.com/photos/3560453/pexels-photo-3560453.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Aerial view of swimmers and surfers training together in open ocean water - rescue technique and open water safety practice" },
            ].map((img) => (
              <div key={img.src} style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} loading="lazy" />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: "20px 24px", background: "var(--white)", borderRadius: "var(--radius-sm)", borderLeft: "4px solid var(--teal)", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>📸</span>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>Professional Photography & Video Included Free With Every Session</h4>
              <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.6 }}>Every session is professionally photographed and filmed by our media director - a certified ocean lifeguard who provides additional in-water safety coverage while capturing your child&apos;s experience. You&apos;ll receive high-quality photos and video as a complimentary value-add. <strong>Opt-out is available</strong> if you prefer your child not be photographed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PREREQUISITES ═══ */}
      <section id="prereqs" aria-labelledby="prereqs-title" style={{ padding: "80px 24px", background: "linear-gradient(135deg, #fff5f5, #fff0ee)", borderTop: "4px solid var(--coral)", borderBottom: "4px solid var(--coral)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>⚠️</div>
          <h2 id="prereqs-title" style={{ fontFamily: "var(--font-playfair), serif", fontSize: 32, fontWeight: 700, color: "var(--coral)", marginBottom: 16 }}>Prerequisites Before Enrolling</h2>
          <p style={{ fontSize: 16, color: "var(--text)", maxWidth: 600, margin: "0 auto" }}>The Shore Academy is an advanced ocean safety program for anyone who already knows how to swim. To ensure everyone&apos;s safety, the following are <strong>mandatory</strong> before signing up:</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, margin: "30px auto", maxWidth: 600, textAlign: "left" }}>
            {[
              { icon: "🏊", text: <><strong>You must already know how to swim.</strong> Every student - child, teen, or adult - must be a confident, independent pool swimmer before ocean instruction begins.</> },
              { icon: "💧", text: <><strong>Comfortable in deep water.</strong> Students will be in water over their head. You must be able to tread water comfortably without assistance.</> },
              { icon: "📚", text: <><strong>Prior swim lessons completed.</strong> Pool-based swimming instruction is a mandatory prerequisite for all Shore Academy programs.</> },
              { icon: "👤", text: <><strong>Age 6+.</strong> Group ocean safety sessions are open to ages 6 and up - children, teenagers, and adults are all welcome.</> },
              { icon: "💬", text: <><strong>Pre-session phone consultation.</strong> We call before your session to discuss your swimming background, comfort level in the ocean, and confirm readiness.</> },
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 20px", background: "var(--white)", borderRadius: "var(--radius-sm)", fontSize: 15, fontWeight: 500, color: "var(--text)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 24, fontSize: 14, color: "var(--text-light)", fontStyle: "italic", lineHeight: 1.6 }}>We take safety extremely seriously. If during our consultation or initial assessment we determine a student is not yet ready for ocean instruction, we will recommend pool swim programs and offer a full deposit refund. No exceptions.</p>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" aria-labelledby="pricing-title" style={{ padding: "100px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Investment</span>
          <h2 id="pricing-title" className="section-title">Ocean Safety Programs & Pricing</h2>
          <p className="section-desc">This isn&apos;t a swim lesson. It&apos;s real ocean mastery for anyone who already swims - children, teens, and adults who want to genuinely understand South Florida&apos;s Atlantic waters.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 50 }} className="three-col-grid">
            {[
              { title: "1 Session", sub: "Try it out - perfect first step", price: "$175", priceSub: "per student / 60 minutes", featured: false, features: ["1 hour ocean safety session", "Max 6 students, 3 certified lifeguard instructors", "Strict 2:1 student-to-instructor ratio", "Professional photos & video included", "Pre-session phone consultation"] },
              { title: "3-Session Course", sub: "Complete ocean safety foundation", price: "$150", priceSub: "per student / session • $450 total", featured: true, features: ["3 hours of ocean safety instruction", "Full rip current & wave navigation curriculum", "Strict 2:1 student-to-instructor ratio", "Professional photos & video included", "Pre-session consultation", "14% savings vs. single session"] },
              { title: "6-Session Mastery", sub: "Full ocean confidence & rescue skills", price: "$125", priceSub: "per student / session • $750 total", featured: false, features: ["6 hours of ocean training", "Advanced skills including rescue basics", "Strict 2:1 student-to-instructor ratio", "Professional photos & video included", "Pre-session consultation", "29% savings vs. single session"] },
            ].map((pkg) => (
              <div key={pkg.title} style={{ background: pkg.featured ? "var(--white)" : "var(--off-white)", borderRadius: "var(--radius)", padding: "36px 28px", border: `2px solid ${pkg.featured ? "var(--ocean)" : "transparent"}`, boxShadow: pkg.featured ? "var(--shadow-lg)" : "none", position: "relative" }}>
                {pkg.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--ocean)", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{pkg.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 0 }}>{pkg.sub}</p>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 42, fontWeight: 700, color: "var(--navy)", margin: "16px 0 4px" }}>{pkg.price}</div>
                <div style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>{pkg.priceSub}</div>
                <ul style={{ listStyle: "none", marginBottom: 28 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ padding: "8px 0", fontSize: 14, color: "var(--text-light)", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ color: "var(--teal)", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book-a-session" className="btn-ocean-block">Book Now</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24, padding: 16, background: "rgba(26,111,160,0.06)", borderRadius: "var(--radius-sm)" }}>
            <p style={{ fontSize: 13, color: "var(--text-light)" }}><strong style={{ color: "var(--ocean)" }}>$50 deposit required to reserve your spot.</strong> Deposit is applied to your session total. Remaining balance due before your first session. Full refund if we determine your child is not yet ready during our pre-session consultation.</p>
          </div>
        </div>
      </section>

      {/* ═══ JUNIOR LIFEGUARD PROGRAM ═══ */}
      <section id="jlp" aria-labelledby="jlp-title" style={{ padding: "100px 24px", background: "linear-gradient(165deg, var(--navy) 0%, #0d1f3c 50%, var(--deep-blue) 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(212,164,76,0.1) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(15,163,177,0.08) 0%, transparent 50%)" }} aria-hidden="true" />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, rgba(212,164,76,0.15), rgba(212,164,76,0.05))", border: "1px solid rgba(212,164,76,0.3)", borderRadius: 50, padding: "10px 24px", marginBottom: 24, fontSize: 13, color: "var(--gold)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
            ★ Elite Training Program - West Palm Beach, FL
          </div>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", marginTop: 16, marginBottom: 12 }}>Junior Lifeguard Program Florida</span>
          <h2 id="jlp-title" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", marginBottom: 8 }}>The Next Generation of Lifeguards Starts Here</h2>
          <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600, color: "var(--gold)", fontStyle: "italic", marginBottom: 16 }}>&ldquo;Respect the Water. Rule the Shore.&rdquo;</p>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 650, lineHeight: 1.7, marginBottom: 56 }}>A quarterly, 4-week intensive junior lifeguard program in South Florida that transforms elite swimmers into future certified lifeguards. Physical training, expert-level rescue skills, USLA competition prep, and a streamlined path to ocean lifeguard employment. The most advanced youth ocean program in Florida.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="jlp-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "⚡", title: "Intensive Physical Training", text: "Build the endurance, speed, and ocean strength required to perform at the lifeguard level. Open water distance swims, timed sprints, board paddling, and beach runs in South Florida conditions." },
                { icon: "⛑", title: "Expert Life-Saving & Rescue Skills", text: "Learn real rescue techniques from instructors with hundreds of open water rescues. Victim recognition, approach strokes, rescue tube deployment, and spinal management in the Atlantic Ocean." },
                { icon: "🏆", title: "USLA Lifeguard Competition Prep", text: "Train for USLA-sanctioned events. Surf swims, paddleboard races, rescue relays, beach flags, and ironman/ironwoman events. Compete at regional and national level from South Florida." },
                { icon: "💼", title: "Streamlined Path to Lifeguard Employment", text: "Junior lifeguard program graduates are fully prepped for ocean lifeguard certification tests nationwide. Our alumni pass rates are among the highest in the country. Your career starts here." },
                { icon: "📋", title: "High Certification Pass Rate", text: "Our curriculum is built around the exact skills and physical standards tested by agencies across the U.S. When you walk into a lifeguard test, you will already know the drill." },
              ].map((f) => (
                <div key={f.title} className="hover-jlp-feature" style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, var(--gold), #b8862d)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{f.title}</h4>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background: "linear-gradient(135deg, rgba(212,164,76,0.08), rgba(212,164,76,0.02))", border: "2px solid rgba(212,164,76,0.25)", borderRadius: "var(--radius)", padding: "40px 32px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, var(--gold), #b8862d)", color: "var(--navy)", padding: "5px 20px", borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", whiteSpace: "nowrap" }}>ELITE PROGRAM</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Junior Lifeguard Cohort</h3>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "16px 0 20px", flexWrap: "wrap" }}>
                  {[{ label: "Q4 2026", next: true }, { label: "Q1 2027", next: false }, { label: "Q2 2027", next: false }, { label: "Q3 Off", off: true }].map((q) => (
                    <span key={q.label} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", background: q.next ? "rgba(212,164,76,0.15)" : "rgba(255,255,255,0.06)", border: q.next ? "1px solid rgba(212,164,76,0.3)" : "1px solid rgba(255,255,255,0.1)", color: q.next ? "var(--gold)" : "rgba(255,255,255,0.6)", textDecoration: (q as { label: string; next?: boolean; off?: boolean }).off ? "line-through" : "none", opacity: (q as { label: string; next?: boolean; off?: boolean }).off ? 0.4 : 1 }}>{q.label}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 48, fontWeight: 700, color: "var(--gold)", margin: "20px 0 4px" }}>$1,499</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>per student / 4-week cohort</div>
                <ul style={{ listStyle: "none", textAlign: "left", marginBottom: 28 }}>
                  {["4 Saturdays, 1.5 hours per session (6 total hours)", "Max 6 students per cohort - limited spots", "Certified ocean lifeguard instructors only", "Rescue equipment and training aids provided", "USLA competition-level skill development", "Certificate of completion", "Professional photos and video of every training session"].map((f) => (
                    <li key={f} style={{ padding: "8px 0", fontSize: 14, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "var(--gold)", fontSize: 12 }}>★</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book-a-session" className="btn-gold-block">Apply for Next Cohort →</Link>
                <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(255,255,255,0.04)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--gold)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, textAlign: "left" }}>
                  <strong style={{ color: "rgba(255,255,255,0.8)" }}>Prerequisite:</strong> We strongly recommend completing The Shore Academy ocean safety course before enrolling in the Junior Lifeguard Program. Students must be confident ocean swimmers. A pre-program assessment is required for all applicants.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICE AREAS ═══ */}
      <section id="service-areas" aria-labelledby="areas-title" style={{ padding: "100px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Where We Operate</span>
          <h2 id="areas-title" className="section-title">Ocean Safety Sessions Across South Florida</h2>
          <p className="section-desc">The Shore Academy serves families across the entire South Florida coastline. Weekend sessions run year-round on the Atlantic Ocean beaches from Miami to Palm Beach County.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 50 }} className="three-col-grid">
            {[
              { title: "West Palm Beach", text: "Ocean safety sessions, junior lifeguard training, and rip current education on the beautiful beaches of West Palm Beach and Palm Beach Island.", beaches: "Beaches: Phipps Ocean Park • Lake Worth Beach area", href: "/locations/west-palm-beach" },
              { title: "Boca Raton", text: "Kids ocean safety classes and junior lifeguard programs on Boca Raton's crystal-clear Atlantic beaches. Weekend sessions available throughout the year.", beaches: "Beaches: South Beach Park • Red Reef Park • Spanish River Park", href: "/locations/boca-raton" },
              { title: "Delray Beach", text: "Ocean navigation and wave safety instruction on Delray Beach's award-winning shoreline. Conveniently located for families across South Palm Beach County.", beaches: "Beaches: Delray Municipal Beach • Atlantic Dunes Park", href: "/locations/delray-beach" },
              { title: "Miami", text: "Ocean safety education and junior lifeguard training on Miami's world-famous Atlantic beaches. Sessions serve families throughout Miami-Dade County and surrounding areas.", beaches: "Beaches: Miami Beach • Crandon Park Beach • Haulover Beach", href: "/locations/miami" },
              { title: "Fort Lauderdale", text: "Rip current training, wave navigation, and ocean safety programs on Fort Lauderdale's stunning Broward County beaches. Weekend sessions for families throughout the Fort Lauderdale area.", beaches: "Beaches: Fort Lauderdale Beach • Pompano Beach • Deerfield Beach", href: "/locations/fort-lauderdale" },
            ].map((area) => (
              <div key={area.title} className="hover-border-lift" style={{ background: "var(--off-white)", borderRadius: "var(--radius)", padding: "32px 28px", textAlign: "center", border: "2px solid transparent" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🌊</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{area.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, marginBottom: 12 }}>{area.text}</p>
                <div style={{ fontSize: 12, color: "var(--ocean)", fontWeight: 600, marginBottom: 16 }}>{area.beaches}</div>
                <Link href={area.href} style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: "var(--ocean)", textDecoration: "none" }}>View {area.title} page →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESOURCES TEASER ═══ */}
      <section id="resources" aria-labelledby="resources-title" style={{ padding: "100px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Ocean Safety Knowledge</span>
          <h2 id="resources-title" className="section-title">Learn Before You Hit the Water</h2>
          <p className="section-desc">Free guides from our certified ocean lifeguard instructors. The knowledge that saves lives on South Florida beaches every summer.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 50 }} className="three-col-grid">
            {[
              { img: "https://images.pexels.com/photos/6970903/pexels-photo-6970903.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Powerful ocean waves crashing on a Florida beach - dangerous surf conditions that produce rip currents", tag: "Safety Guide", title: "How to Escape a Rip Current: A Step-by-Step Survival Guide", excerpt: "Rip currents cause over 80% of all lifeguard rescues in the U.S. This guide teaches you exactly what to do if you get caught in one - and how to spot them before you enter the water.", href: "/academy-resources/how-to-escape-a-rip-current" },
              { img: "https://images.pexels.com/photos/1199182/pexels-photo-1199182.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Red and yellow beach warning flag on a pole in front of the ocean at a Florida beach", tag: "Know the Flags", title: "Beach Flag Colors Explained: What Every Flag Means at a Florida Beach", excerpt: "Most beachgoers can't explain what a purple flag means. Or a double red. Understanding the beach flag system is the first layer of ocean safety - and it takes five minutes to learn.", href: "/academy-resources/beach-flag-colors-florida" },
              { img: "https://images.pexels.com/photos/1755195/pexels-photo-1755195.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1", alt: "Young boy running into ocean waves at a sunny Florida beach", tag: "For Parents", title: "Is Your Child Ready for the Ocean? A Parent's Complete Guide", excerpt: "Strong pool swimmers still drown in the ocean. This guide explains the critical differences between pool and ocean swimming, and gives parents a clear checklist for ocean readiness.", href: "/academy-resources/is-my-child-ready-for-ocean-swimming" },
            ].map((r) => (
              <article key={r.href} className="hover-blog-card" style={{ background: "var(--white)", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid transparent" }}>
                <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                  <Image src={r.img} alt={r.alt} fill style={{ objectFit: "cover" }} loading="lazy" />
                  <span style={{ position: "absolute", top: 12, left: 12, background: "var(--teal)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase" }}>{r.tag}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 10, lineHeight: 1.3 }}>{r.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.6, marginBottom: 16 }}>{r.excerpt}</p>
                  <Link href={r.href} style={{ fontSize: 13, fontWeight: 600, color: "var(--ocean)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>Read the full guide →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOKING ═══ */}
      <section id="booking" aria-labelledby="booking-title" style={{ padding: "100px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Get Started</span>
          <h2 id="booking-title" className="section-title">Book Your Ocean Safety Session</h2>
          <p className="section-desc">Fill in the form, pay your deposit to reserve your spot, and our team will call to make sure your child is ready. Serving West Palm Beach, Boca Raton, Delray Beach, Miami & Fort Lauderdale.</p>
          <div style={{ marginTop: 40 }}>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" aria-labelledby="faq-title" style={{ padding: "100px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Questions</span>
          <h2 id="faq-title" className="section-title">Frequently Asked Questions</h2>
          <div style={{ marginTop: 40 }}>
            <FaqList faqs={FAQS} />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section aria-label="Call to action" style={{ background: "linear-gradient(165deg, var(--navy), var(--deep-blue), var(--ocean))", padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, rgba(15,163,177,0.15), transparent 70%)" }} aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>The Ocean Isn&apos;t Going Anywhere. Prepare Your Kids.</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>Give your child the confidence and skills to enjoy the ocean safely for the rest of their life. Weekend sessions in West Palm Beach, Boca Raton, Delray Beach, Miami & Fort Lauderdale. Spaces are limited.</p>
          <Link href="/book-a-session" className="btn-coral">Book a Session →</Link>
        </div>
      </section>

      <style>{`
        .section-label { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ocean); margin-bottom: 12px; }
        .section-title { font-family: var(--font-playfair), serif; font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: var(--navy); margin-bottom: 16px; }
        .section-desc { font-size: 17px; color: var(--text-light); max-width: 680px; line-height: 1.7; margin-bottom: 0; }
        .btn-coral { display: inline-flex; align-items: center; gap: 8px; background: var(--coral); color: #fff; font-weight: 700; font-size: 16px; padding: 16px 36px; border-radius: 50px; text-decoration: none; transition: background 0.2s; }
        .btn-coral:hover { background: var(--coral-dark); }
        .btn-outline-white { display: inline-flex; align-items: center; gap: 8px; border: 2px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.9); font-weight: 600; font-size: 16px; padding: 14px 32px; border-radius: 50px; text-decoration: none; transition: border-color 0.2s; }
        .btn-outline-white:hover { border-color: rgba(255,255,255,0.7); }
        .btn-ocean-block { display: flex; align-items: center; justify-content: center; background: var(--ocean); color: #fff; font-weight: 700; font-size: 14px; padding: 14px 24px; border-radius: 50px; text-decoration: none; }
        .btn-ocean-block:hover { background: var(--ocean-light); }
        .btn-gold-block { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 36px; border-radius: 50px; width: 100%; font-size: 15px; font-weight: 700; text-decoration: none; background: linear-gradient(135deg, var(--gold), #b8862d); color: var(--navy); }
        .pulse-dot { animation: pulse-anim 2s infinite; }
        @keyframes pulse-anim { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .about-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; gap: 32px !important; } }
        .three-col-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } }
        .jlp-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; gap: 32px !important; } }
        .gallery-grid { @media (max-width:768px) { grid-template-columns: 1fr 1fr !important; grid-template-rows: repeat(3,180px) !important; } @media (max-width:600px) { grid-template-columns: 1fr !important; grid-template-rows: none !important; } }
      `}</style>
    </>
  );
}
