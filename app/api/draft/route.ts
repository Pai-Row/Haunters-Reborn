import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slugParam = url.searchParams.get("slug") ?? "";

  // ✅ protect the endpoint
  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // ✅ enable draft mode (Next 15/16: draftMode() is async)
  const draft = await draftMode();
  draft.enable();

  // ✅ normalize slug
  const slug = slugParam.replace(/^\/+|\/+$/g, "");
  const path = slug === "" || slug === "home" ? "/" : `/${slug}`;

  // ✅ don’t leak secret/slug into the redirected URL
  url.searchParams.delete("secret");
  url.searchParams.delete("slug");
  const qs = url.searchParams.toString();

  redirect(qs ? `${path}?${qs}` : path);
}
