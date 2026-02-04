import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug") ?? "";

  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();

  // Normalize path
  let path = slug.trim();
  if (!path || path === "home") path = "/";
  else if (!path.startsWith("/")) path = `/${path}`;

  // Redirect WITHOUT forwarding secret params
  return NextResponse.redirect(new URL(path, request.url));
}
