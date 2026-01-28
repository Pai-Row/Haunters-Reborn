import Link from "next/link";

export function RecommendedAttraction(props: any) {
  const story = props.story;
  const c = story?.content ?? {};

  const title = c?.name ?? story?.name ?? "Attraction";
  const intro = c?.introduction ?? c?.description ?? "";
  const imageUrl = c?.main_image?.filename;
  const slug =
    story?.slug ?? (story?.full_slug ? story.full_slug.split("/").pop() : "");

  const price = c?.price;
  const priceText =
    price !== undefined && price !== null && String(price).trim() !== ""
      ? Number(price).toLocaleString("en-NZ", {
          style: "currency",
          currency: "NZD",
          minimumFractionDigits: 0,
        })
      : null;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-black/55">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.18),transparent_60%)]" />
      </div>

      {/* image */}
      {imageUrl ? (
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.06] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
        </div>
      ) : (
        <div className="relative h-14">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/10 to-transparent" />
        </div>
      )}

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-(--font-heading) text-xl tracking-wide text-white">
            {title}
          </h3>

          {priceText && (
            <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
              {priceText}
            </span>
          )}
        </div>

        {intro && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">
            {intro}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/attractions/${slug}`}
            className="group/link relative inline-flex items-center gap-2 font-(--font-heading) text-sm tracking-widest text-blue-300"
          >
            <span className="relative">
              VIEW ATTRACTION
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-300/80 transition-all duration-300 group-hover/link:w-full" />
            </span>
            <span className="opacity-70 transition-opacity group-hover/link:opacity-100 group-hover/link:animate-[flicker_2.6s_infinite]">
              ↗
            </span>
          </Link>

          <span className="text-xs text-slate-400 opacity-70 transition-opacity group-hover:opacity-100">
            Enter if you dare →
          </span>
        </div>
      </div>
    </article>
  );
}
