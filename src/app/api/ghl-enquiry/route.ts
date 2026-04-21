import { createGHLContact } from "@/lib/ghl";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const nameParts = (body.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const contact = await createGHLContact({
      firstName,
      lastName,
      email: body.email,
      phone: body.phone || "",
      tags: ["Shore Academy", "Contact Form Inquiry", body.topic].filter(Boolean),
      customFields: {
        topic: body.topic || "",
        message: body.message || "",
        date_of_birth: body.dateOfBirth || "",
        age: body.age != null ? String(body.age) : "",
        source_form: "Inquiry Free Form",
      },
      source: "Inquiry Free Form",
    });

    return Response.json({ success: true, contactId: contact.id });
  } catch (err) {
    console.error("GHL enquiry error:", err);
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
