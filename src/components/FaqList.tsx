"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{ background: "var(--white)", borderRadius: "var(--radius-sm)", marginBottom: 12, boxShadow: "var(--shadow)", overflow: "hidden" }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{ width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, fontWeight: 600, color: openIndex === i ? "var(--ocean)" : "var(--navy)", background: "none", border: "none", cursor: "pointer", textAlign: "left", minHeight: 44, transition: "color 0.2s", gap: 16 }}
            aria-expanded={openIndex === i}
          >
            <span>{faq.q}</span>
            <span style={{ fontSize: 20, color: "var(--ocean)", transition: "transform 0.25s", transform: openIndex === i ? "rotate(180deg)" : "none", flexShrink: 0 }}>▾</span>
          </button>
          {openIndex === i && (
            <div style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--text-light)", lineHeight: 1.7 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
