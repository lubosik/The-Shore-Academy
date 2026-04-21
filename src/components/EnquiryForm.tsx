"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "dad22fec-f7dc-4d42-978f-bcc6fcaad397",
          subject: "New Shore Academy Enquiry",
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          topic: form.topic || "General",
          message: form.message,
          redirect: false,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 15,
    color: "var(--text)",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--navy)",
    marginBottom: 8,
    letterSpacing: "0.3px",
  };

  if (status === "success") {
    return (
      <div style={{ background: "#f0fdf4", border: "2px solid #22c55e", borderRadius: "var(--radius)", padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 26, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
          Message Received!
        </h3>
        <p style={{ fontSize: 16, color: "var(--text-light)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
          Thank you for reaching out. A member of The Shore Academy team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "var(--radius)", padding: "48px 40px", boxShadow: "var(--shadow-lg)" }} className="enquiry-form">
      <div style={{ marginBottom: 32 }}>
        <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ocean)", marginBottom: 10 }}>Get In Touch</span>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: "var(--navy)", margin: "0 0 10px" }}>
          Send Us an Enquiry
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-light)", margin: 0, lineHeight: 1.6 }}>
          Have a question about our programs, pricing, or whether your child is ready? Fill in below and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="enquiry-row">
        <div>
          <label style={labelStyle}>Full Name <span style={{ color: "var(--coral)" }}>*</span></label>
          <input
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email Address <span style={{ color: "var(--coral)" }}>*</span></label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="enquiry-row">
        <div>
          <label style={labelStyle}>Phone Number <span style={{ color: "var(--text-light)", fontWeight: 400 }}>(optional)</span></label>
          <input
            name="phone"
            type="tel"
            placeholder="(561) 555-0000"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Topic <span style={{ color: "var(--coral)" }}>*</span></label>
          <select
            name="topic"
            required
            value={form.topic}
            onChange={handleChange}
            style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23667eea' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40, cursor: "pointer" }}
          >
            <option value="">Select a topic…</option>
            <option value="General Question">General Question</option>
            <option value="Session Pricing">Session Pricing</option>
            <option value="Junior Lifeguard Program">Junior Lifeguard Program</option>
            <option value="Child Readiness">Child Readiness / Prerequisites</option>
            <option value="Group Booking">Group / Corporate Booking</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>Message <span style={{ color: "var(--coral)" }}>*</span></label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us what you'd like to know…"
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#ef4444", fontSize: 14, marginBottom: 16, padding: "12px 16px", background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca" }}>
          Something went wrong. Please try again or email us directly at info@theshoreacademy.com
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{ width: "100%", background: status === "submitting" ? "#94a3b8" : "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 32px", borderRadius: 50, border: "none", cursor: status === "submitting" ? "not-allowed" : "pointer", letterSpacing: "0.3px", transition: "background 0.2s" }}
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry →"}
      </button>

      <style>{`
        @media (max-width: 640px) {
          .enquiry-form { padding: 32px 20px !important; }
          .enquiry-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
