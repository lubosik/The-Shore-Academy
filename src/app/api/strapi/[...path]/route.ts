export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathStr = path.join("/");
  const url = new URL(req.url);
  const strapiUrl = process.env.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;
  if (!strapiUrl || !token) {
    return Response.json({ data: [] });
  }
  const res = await fetch(`${strapiUrl}/api/${pathStr}${url.search}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return Response.json(data);
}
