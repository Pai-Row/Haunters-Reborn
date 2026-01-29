import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function isValid(secret: string | null) {
  return !!secret && secret === process.env.REVALIDATE_SECRET;
}

// Storyblok usually calls POST
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!isValid(secret)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // Optional: read payload (Storyblok sends JSON)
  // const body = await req.json().catch(() => null);

  revalidatePath("/");
  revalidatePath("/attractions");
  // If you want to revalidate *everything* on publish:
  // revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, revalidated: true });
}

// Keep GET too so you can test in browser/curl
export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!isValid(secret)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/attractions");
  return NextResponse.json({ ok: true, revalidated: true });
}
