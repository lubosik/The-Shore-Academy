const GHL_API_KEY = process.env.GHL_API_KEY ?? "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID ?? "";

interface GHLContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
  customFields?: Record<string, string>;
  source?: string;
}

export async function createGHLContact(payload: GHLContactPayload) {
  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: "2021-07-28",
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      tags: payload.tags,
      customFields: payload.customFields
        ? Object.entries(payload.customFields).map(([key, value]) => ({ key, field_value: value }))
        : [],
      source: payload.source,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL API error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.contact ?? data;
}
