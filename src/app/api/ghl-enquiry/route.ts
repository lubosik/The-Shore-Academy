const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/jpmo5faxu2nugc0n83nharapyyoestox";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const topicContext: Record<string, string> = {
  "Session Pricing": "our session pricing and packages",
  "Junior Lifeguard Program": "our Junior Lifeguard Program",
  "Child Readiness": "whether your child is ready for ocean swimming",
  "Group Booking": "group and corporate booking options",
  "General Question": "your question",
  "Other": "your enquiry",
};

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const nameParts = (body.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const topicLabel = topicContext[body.topic] || "your enquiry";

    const emailSubject = `New Inquiry Lead${body.topic ? ` | ${body.topic}` : ""} | Shore Academy`;

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

    const confirmationEmailSubject = `We got your message, ${firstName} | Shore Academy`;

    const confirmationEmailHtml = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f0e6d3;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0e6d3;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Logo header -->
      <tr><td style="background:#0a1628;padding:30px 40px;text-align:center;border-radius:12px 12px 0 0;">
        <img src="https://theshoreacademy.com/logo.png" alt="The Shore Academy" height="52" style="height:52px;width:auto;display:block;margin:0 auto;" />
      </td></tr>

      <!-- Coral accent bar -->
      <tr><td style="background:#e05c3a;height:4px;font-size:0;line-height:0;"> </td></tr>

      <!-- Body -->
      <tr><td style="background:#ffffff;padding:40px 40px 32px;">
        <h1 style="margin:0 0 18px;font-size:26px;font-weight:700;color:#0a1628;line-height:1.3;">Hey ${esc(firstName)}, we got your message.</h1>
        <p style="margin:0 0 18px;font-size:16px;color:#1a2332;line-height:1.75;">
          Thanks for getting in touch about <strong>${esc(topicLabel)}</strong>. Someone from our team will be back with you within <strong style="color:#e05c3a;">24 hours</strong> to go over everything.
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#5a6a7a;line-height:1.7;">Here is what you sent us:</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f0e6d3;width:140px;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Topic</td>
            <td style="padding:12px 0;border-bottom:1px solid #f0e6d3;font-size:15px;color:#0a1628;">${esc(body.topic || "General Question")}</td>
          </tr>
          ${body.dateOfBirth ? `<tr>
            <td style="padding:12px 0;border-bottom:1px solid #f0e6d3;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Age</td>
            <td style="padding:12px 0;border-bottom:1px solid #f0e6d3;font-size:15px;color:#0a1628;">${esc(body.age)} years old</td>
          </tr>` : ""}
          <tr>
            <td style="padding:12px 0;font-size:13px;font-weight:700;color:#1a6fa0;vertical-align:top;">Your message</td>
            <td style="padding:12px 0;font-size:15px;color:#0a1628;line-height:1.65;">${esc(body.message)}</td>
          </tr>
        </table>

        <!-- What happens next — sand box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0e6d3;border-radius:10px;margin-bottom:32px;">
          <tr><td style="padding:24px 28px;">
            <p style="margin:0 0 18px;font-size:11px;font-weight:700;color:#0a1628;text-transform:uppercase;letter-spacing:2px;">What happens next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:30px;vertical-align:top;padding-top:2px;">
                  <div style="width:24px;height:24px;background:#e05c3a;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:24px;">1</div>
                </td>
                <td style="padding:0 0 14px 12px;font-size:14px;color:#1a2332;line-height:1.65;">We look over your message and put together a response that actually answers your question.</td>
              </tr>
              <tr>
                <td style="width:30px;vertical-align:top;padding-top:2px;">
                  <div style="width:24px;height:24px;background:#e05c3a;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:24px;">2</div>
                </td>
                <td style="padding:0 0 14px 12px;font-size:14px;color:#1a2332;line-height:1.65;">Someone from the team reaches out within 24 hours by email or phone to chat through ${esc(topicLabel)} with you.</td>
              </tr>
              <tr>
                <td style="width:30px;vertical-align:top;padding-top:2px;">
                  <div style="width:24px;height:24px;background:#e05c3a;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:24px;">3</div>
                </td>
                <td style="padding:0 0 0 12px;font-size:14px;color:#1a2332;line-height:1.65;">If you want to go ahead and book, we walk you through exactly how to get your session sorted.</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <p style="margin:0 0 24px;font-size:15px;color:#1a2332;line-height:1.75;">
          Any questions before then? Just reply to this email and we will get back to you.
        </p>
        <p style="margin:0;font-size:15px;color:#1a2332;line-height:1.75;">
          Talk soon,<br />
          <strong style="color:#0a1628;">The Shore Academy Team</strong>
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#0a1628;padding:28px 40px;text-align:center;border-radius:0 0 12px 12px;">
        <img src="https://theshoreacademy.com/logo.png" alt="The Shore Academy" height="36" style="height:36px;width:auto;display:block;margin:0 auto 14px;" />
        <p style="margin:0 0 6px;font-size:13px;color:#7dd3fc;">info@theshoreacademy.com &middot; South Florida</p>
        <p style="margin:0;font-size:12px;color:#4a6a8a;">theshoreacademy.com</p>
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
      confirmationEmailTo: body.email,
      confirmationEmailSubject,
      confirmationEmailHtml,
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
