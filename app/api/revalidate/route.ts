import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function isAllowed(secret: string | null) {
  return !!secret && secret === process.env.REVALIDATE_SECRET;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!isAllowed(secret)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/attractions");

  return NextResponse.json({ ok: true, method: "GET", revalidated: true });
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!isAllowed(secret)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // Storyblok sends JSON payload like:
  // { action, full_slug, ... }
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    // ok if no JSON
  }

  const fullSlug = body?.full_slug as string | undefined;

  // Always safe defaults
  revalidatePath("/");
  revalidatePath("/attractions");

  // Revalidate the specific page if we can infer it
  if (fullSlug) {
    // home page
    if (fullSlug === "home") revalidatePath("/");

    // attraction detail pages (adjust if your Storyblok structure differs)
    // If Storyblok full_slug is already "attractions/the-harvest-haunt":
    if (fullSlug.startsWith("attractions/")) {
      revalidatePath(`/${fullSlug}`);
    }
  }

  return NextResponse.json({
    ok: true,
    method: "POST",
    revalidated: true,
    received: { full_slug: fullSlug, action: body?.action },
  });
}
