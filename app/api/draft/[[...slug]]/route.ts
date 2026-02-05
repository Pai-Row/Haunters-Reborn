import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  (await draftMode()).enable();

  const slugPath = (params.slug ?? []).join("/");
  const pathname = slugPath === "" || slugPath === "home" ? "/" : `/${slugPath}`;

  // forward storyblok params (but drop secret)
  const forwarded = new URLSearchParams(req.nextUrl.searchParams);
  forwarded.delete("secret");

  const qs = forwarded.toString();
  redirect(qs ? `${pathname}?${qs}` : pathname);
}
