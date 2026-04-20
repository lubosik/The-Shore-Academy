"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--off-white)", padding: "24px" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 32, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>Something went wrong</h2>
        <p style={{ fontSize: 15, color: "var(--text-light)", lineHeight: 1.7, marginBottom: 28 }}>
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button onClick={reset} style={{ background: "var(--ocean)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 28px", borderRadius: 50, border: "none", cursor: "pointer" }}>
          Try Again
        </button>
      </div>
    </div>
  );
}
