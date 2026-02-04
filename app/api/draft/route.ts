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

  // normalize path
  let path = slug.trim();
  if (!path || path === "home") path = "/";
  else if (!path.startsWith("/")) path = `/${path}`;

  const base = process.env.PUBLIC_SITE_URL ?? url.origin; // fallback if missing
  return NextResponse.redirect(new URL(path, base));
}
