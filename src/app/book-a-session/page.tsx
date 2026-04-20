import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book an Ocean Safety Session | The Shore Academy",
  description: "Book your ocean safety session with The Shore Academy. West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale. $50 deposit to reserve your spot.",
};

export default function BookASessionPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(165deg, var(--navy), var(--deep-blue))", padding: "140px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", marginBottom: 16 }}>Get Started</span>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
            Book Your Ocean Safety Session
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            Fill in the form, pay your $50 deposit, and our team will call to confirm readiness. Serving West Palm Beach, Boca Raton, Delray Beach, Miami & Fort Lauderdale.
          </p>
        </div>
      </section>

      <div style={{ background: "var(--off-white)", padding: "12px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "var(--text-light)" }}>
          <Link href="/" style={{ color: "var(--ocean)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Book a Session</span>
        </div>
      </div>

      <section style={{ padding: "80px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
