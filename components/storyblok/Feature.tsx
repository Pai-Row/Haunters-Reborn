import Image from "next/image";

export function Feature({ blok }: any) {
  return (
    <article
      className="
        group relative aspect-2/3 overflow-hidden rounded-2xl
        border border-white/10 bg-black
        shadow-[0_25px_60px_rgba(0,0,0,0.7)]
        transition duration-500
        hover:-translate-y-1 hover:border-white/25
      "
    >
      {/* Background Image (poster) */}
      {blok.image?.filename && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt ?? blok.headline}
          fill
          className="
            object-cover
            transition duration-700
            group-hover:scale-110
          "
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      {/* Fog / glow on hover */}
      <div className="
        pointer-events-none absolute inset-0
        opacity-0 transition-opacity duration-500
        group-hover:opacity-100
        bg-[radial-gradient(circle_at_50%_80%,rgba(147,51,234,0.25),transparent_60%)]
      " />

      {/* Title (single line) */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3
          className="
            font-(--font-heading)
            text-xl tracking-wide
            uppercase
            truncate
          "
          title={blok.headline}
        >
          {blok.headline}
        </h3>
      </div>

      {blok.content && (
  <p
    className="
      mt-2 text-lg text-white/80 text-center px-1 py-3 font-bold bg-gray-900/60
      opacity-0 translate-y-2
      transition duration-500
      group-hover:opacity-100 group-hover:translate-y-0
    "
  >
    {blok.content}
  </p>
)}

    </article>
  );
}
