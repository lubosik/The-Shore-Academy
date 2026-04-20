import { createGHLContact } from "@/lib/ghl";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const contact = await createGHLContact({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      tags: ["Shore Academy", "Booking Requested", body.package].filter(Boolean),
      customFields: {
        preferred_date: body.preferredDate ?? "",
        preferred_time: body.preferredTime ?? "",
        package_selected: body.package ?? "",
        num_students: String(body.numStudents ?? 1),
        student_info: body.studentInfo ?? "",
        additional_notes: body.additionalNotes ?? "",
      },
      source: "Website Booking Form",
    });
    return Response.json({
      success: true,
      contactId: contact.id,
      depositUrl: process.env.GHL_DEPOSIT_PAYMENT_URL,
    });
  } catch (err) {
    console.error("GHL booking error:", err);
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
