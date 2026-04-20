const STRAPI_URL = process.env.STRAPI_URL ?? "";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

export async function fetchBlogPosts(params?: Record<string, string>) {
  if (!STRAPI_URL) return { data: [] };
  const query = new URLSearchParams({
    populate: "coverImage",
    sort: "publishedDate:desc",
    "pagination[pageSize]": "20",
    ...params,
  });
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-posts?${query}`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export async function fetchBlogPost(slug: string) {
  if (!STRAPI_URL) return null;
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
      { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }, next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchActiveSlots() {
  if (!STRAPI_URL) return { data: [] };
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/session-slots?filters[isActive][$eq]=true&sort=dateTime:asc`,
      { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }, next: { revalidate: 30 } }
    );
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}
