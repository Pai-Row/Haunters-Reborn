import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slugParam = url.searchParams.get("slug") || "";

  // 🔐 protect draft mode
  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json(
      { ok: false, message: "Invalid secret" },
      { status: 401 }
    );
  }

  // ✅ ENABLE DRAFT MODE (async in your Next version)
  const dm = await draftMode();
  dm.enable();

  // normalize slug
  let path = slugParam.trim();
  if (!path || path === "home") path = "/";
  else if (!path.startsWith("/")) path = `/${path}`;

  return NextResponse.redirect(new URL(path, request.url));
}
