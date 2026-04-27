import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Virtual section paths that all serve the homepage
const SECTION_PATHS = new Set(["/home", "/about", "/curriculum", "/team", "/pricing"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SECTION_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/about", "/curriculum", "/team", "/pricing"],
};
