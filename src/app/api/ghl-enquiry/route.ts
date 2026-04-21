const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/jpmo5faxu2nugc0n83nharapyyoestox";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const nameParts = (body.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const emailSubject = `New Inquiry Lead${body.topic ? ` — ${body.topic}` : ""} | Shore Academy`;

    const emailHtml = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f1f5f9;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr><td style="background:#1a3a5c;padding:28px 36px;border-radius:10px 10px 0 0;">
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">New Lead</p>
        <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff;">Inquiry Form Submission</h1>
      </td></tr>

      <tr><td style="background:#ffffff;padding:32px 36px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;width:160px;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Full Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#1a1a2e;">${esc(firstName)} ${esc(lastName)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#1a1a2e;"><a href="mailto:${esc(body.email)}" style="color:#1a6fa0;">${esc(body.email)}</a></td>
          </tr>
          ${body.phone ? `<tr>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Phone</td>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#1a1a2e;">${esc(body.phone)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Topic</td>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#1a1a2e;">${esc(body.topic || "General")}</td>
          </tr>
          ${body.dateOfBirth ? `<tr>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Date of Birth</td>
            <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#1a1a2e;">${esc(body.dateOfBirth)} <span style="color:#64748b;font-size:13px;">(Age: ${esc(body.age)})</span></td>
          </tr>` : ""}
        </table>

        <div style="margin-top:24px;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#1a6fa0;text-transform:uppercase;letter-spacing:1px;">Message</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1a6fa0;border-radius:6px;padding:18px 20px;font-size:15px;color:#1a1a2e;line-height:1.7;white-space:pre-wrap;">${esc(body.message)}</div>
        </div>

      </td></tr>

      <tr><td style="background:#f8fafc;padding:20px 36px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">Submitted via Shore Academy inquiry form &middot; Reply directly to the lead&apos;s email above</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

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
      emailSubject,
      emailHtml,
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
