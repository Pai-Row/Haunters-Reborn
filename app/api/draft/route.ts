import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const secret = url.searchParams.get("secret");
  const slugParam = url.searchParams.get("slug") ?? "";

  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();

  // ✅ Normalize Storyblok’s "home" to your actual homepage route "/"
  let path = slugParam.trim();
  if (!path || path === "home") path = "/";
  else if (!path.startsWith("/")) path = `/${path}`;

  // ✅ Keep Storyblok’s params but remove secret + slug
  url.searchParams.delete("secret");
  url.searchParams.delete("slug");

  const qs = url.searchParams.toString();
  const destination = qs ? `${path}?${qs}` : path;

  const base = process.env.PUBLIC_SITE_URL ?? url.origin;
  return NextResponse.redirect(new URL(destination, base));
}
