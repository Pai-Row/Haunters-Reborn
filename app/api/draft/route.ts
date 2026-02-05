import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "home";

  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  draftMode().enable();

  // Storyblok sends "home" for homepage; your route is "/"
  const path = slug === "home" ? "/" : `/${slug.replace(/^\/+/, "")}`;

  redirect(path);
}
