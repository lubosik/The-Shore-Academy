interface Props {
  spotsLeft: number; // always 1 or 2
}

export function ScarcityBadge({ spotsLeft }: Props) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 14,
        fontWeight: 700,
        color: spotsLeft === 1 ? "var(--coral)" : "#d97706",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: spotsLeft === 1 ? "var(--coral)" : "#d97706",
          display: "inline-block",
          animation: "pulse 2s infinite",
        }}
      />
      Only {spotsLeft} spot{spotsLeft === 1 ? "" : "s"} left
    </span>
  );
}
