import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const slugParam = searchParams.get("slug") ?? "";

  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // ✅ Next 16: draftMode() is async
  const dm = await draftMode();
  dm.enable();

  // ✅ Prevent // (scheme-relative) + map home -> /
  const cleaned = slugParam.replace(/^\/+/, "");
  const path = cleaned === "" || cleaned === "home" ? "/" : `/${cleaned}`;

  // never forward the secret
  searchParams.delete("secret");
  const qs = searchParams.toString();

  redirect(qs ? `${path}?${qs}` : path);
}
