import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

export function Hero({ blok }: any) {
  const bg = blok?.image?.filename;

  return (
    <section 
      {...storyblokEditable(blok)}
      className="relative overflow-hidden">
      {/* Background */}
      {bg && (
        <div className="absolute inset-0">
          <Image
            src={bg}
            alt={blok?.image?.alt ?? "Hero background"}
            fill
            priority
            className="object-cover object-center opacity-70"
          />
          {/* Dark overlay + subtle color tint */}
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-slate-950/70 to-slate-950" />
          {/* Vignette */}
          <div className="absolute inset-0 [box-shadow:inset_0_0_180px_rgba(0,0,0,0.85)]" />
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 w-full pt-28 pb-20 md:pt-36 md:pb-28 text-center">
        <h1 className="font-(--font-heading) text-4xl md:text-6xl tracking-wide">
          {blok?.headline}
        </h1>

        {blok?.content && (
          <p className="mt-6 max-w-5xl mx-auto text-base md:text-lg text-white/90 leading-relaxed">
            {blok.content}
          </p>
        )}

        {/* optional spooky accent line */}
        <div className="mt-10 mx-auto h-px w-40 bg-linear-to-r from-transparent via-blue-300/50 to-transparent" />
      </div>
    </section>
  );
}
