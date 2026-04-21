const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/jpmo5faxu2nugc0n83nharapyyoestox";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const nameParts = (body.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      contactType: "inquiry",
      firstName,
      lastName,
      email: body.email,
      phone: body.phone || "",
      source: "Inquiry Free Form",
      timezone: "America/New_York",
      tags: ["Shore Academy", "Contact Form Inquiry", body.topic].filter(Boolean),
      topic: body.topic || "",
      message: body.message || "",
      dateOfBirth: body.dateOfBirth || "",
      age: body.age != null ? String(body.age) : "",
      notes: [
        `=== INQUIRY FORM ===`,
        `Name: ${firstName} ${lastName}`,
        `Email: ${body.email}`,
        body.phone ? `Phone: ${body.phone}` : "",
        `Topic: ${body.topic || "General"}`,
        body.dateOfBirth ? `Date of Birth: ${body.dateOfBirth} (Age: ${body.age})` : "",
        ``,
        `=== MESSAGE ===`,
        body.message || "",
      ].filter((l) => l !== undefined).join("\n").trim(),
    };

    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Make.com webhook error ${res.status}: ${text}`);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("GHL enquiry webhook error:", err);
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
