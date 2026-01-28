export function Testimonial({ blok }: any) {
  return (
    <div className="relative pt-5">
      <figure
        className={[
          "relative overflow-hidden",
          "rounded-t-[5.5rem] rounded-b-[1.75rem]",
          "border border-white/12",
          "bg-linear-to-b from-white/10 to-white/5",
          "shadow-[0_30px_70px_rgba(0,0,0,0.55)]",
          "backdrop-blur-md",
          "transition-transform duration-300 hover:-translate-y-1",
          "bg-linear-to-b from-slate-700/40 via-slate-900/70 to-black/60",
          "outline outline-white/5",
        ].join(" ")}
      >
        {/* Tombstone cap */}
        <div className="pointer-events-none absolute -top-7 left-1/2 h-14 w-[82%] -translate-x-1/2 rounded-full border border-white/10 bg-slate-900/70 shadow-[0_16px_45px_rgba(0,0,0,0.5)]" />
        {/* Inner arch highlight */}
        <div className="pointer-events-none absolute top-2 left-1/2 h-14 w-[78%] -translate-x-1/2 rounded-b-[999px] bg-white/5 shadow-[inset_0_-8px_18px_rgba(0,0,0,0.55)]" />
        {/* Stone texture */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(0,0,0,0.35),transparent_55%)]" />
        </div>

        {/* Moss hint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-6 h-10 w-28 rounded-full blur-xl opacity-35 bg-emerald-400/40"
        />

        {/* Engraved inset */}
        <div className="relative px-6 pb-10 pt-12">
          <div className="rounded-2xl border border-white/10 bg-black/25 shadow-[inset_0_2px_18px_rgba(0,0,0,0.65)] p-6">
            <blockquote className="text-white/85 leading-relaxed">
              <p className="text-base md:text-lg">“{blok?.comment}”</p>
            </blockquote>

            <figcaption className="mt-6 flex items-center justify-between">
              <span className="font-(--font-heading) tracking-wide text-white/90">
                {blok?.name}
              </span>

              <span className="text-xs uppercase tracking-[0.24em] text-white/60 border border-white/10 rounded-lg px-2 py-1 bg-white/5">
                RIP
              </span>
            </figcaption>
          </div>

          {/* crack */}
          <div className="pointer-events-none absolute left-8 top-6 h-20 w-px bg-white/15 rotate-12" />
          <div className="pointer-events-none absolute right-10 bottom-10 h-16 w-px bg-white/10 -rotate-12" />
        </div>
      </figure>

      {/* Base slab */}
      <div className="mx-auto -mt-2 h-4 w-[92%] rounded-b-[1.75rem] border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.45)]" />
    </div>
  );
}
