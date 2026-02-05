import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const slugParam = searchParams.get("slug") ?? "";

  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  (await draftMode()).enable();

  // Normalise slug
  const slug = slugParam.replace(/^\/+/, ""); // remove leading slash
  const pathname = slug === "" || slug === "home" ? "/" : `/${slug}`;

  // Preserve ONLY Storyblok editor params (drop secret + slug)
  const forwarded = new URLSearchParams(searchParams);
  forwarded.delete("secret");
  forwarded.delete("slug");

  const qs = forwarded.toString();
  redirect(qs ? `${pathname}?${qs}` : pathname);
}
