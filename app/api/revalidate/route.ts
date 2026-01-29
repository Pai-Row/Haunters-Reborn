import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // minimal: refresh homepage + attractions listing
  revalidatePath("/");
  revalidatePath("/attractions");

  return NextResponse.json({ ok: true, revalidated: true });
}
