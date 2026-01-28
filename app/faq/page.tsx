import Link from "next/link";

export const metadata = {
  title: "FAQ | Haunters",
  description: "Frequently asked questions about Haunters attractions.",
};

const faqs = [
  {
      q: "Is Haunters suitable for kids?",
      a: "Some attractions are family-friendly, while others are designed to be intense. Check the rating badge on each attraction (e.g. 18+ / EXTREME) before booking.",
    },
  {
      q: "Do you use live actors?",
      a: "Yes — some experiences include live actors, sound/lighting effects, and interactive scares. Details are listed on each attraction page.",
    },
  {
      q: "Can I get a refund if I chicken out?",
      a: "Tickets are usually non-refundable, but some venues allow rescheduling. Check the attraction’s policy before you go.",
    },
  {
      q: "Are the attractions accessible?",
      a: "Accessibility varies. If you have mobility or sensory requirements, check the attraction page and contact the venue directly for the most accurate info.",
    },
  {
      q: "What should I wear?",
      a: "Closed shoes and comfortable clothing are best. Some attractions include tight spaces, fog, or outdoor areas.",
    },
  {
      q: "Can I take photos or record video?",
      a: "Most attractions do not allow filming inside for safety and immersion reasons. Some may offer photo spots at the exit.",
    },
];

export default function FAQPage() {
    return (
        <main className="relative">
      {/* Background vibe */}
      <div className="pointer-events-none absolute inset-0 opacity-30 mask-[radial-gradient(ellipse_at_top,black,transparent_65%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(147,51,234,0.20),transparent_60%)]" />
      </div>

      <section className="relative noise container mx-auto px-4 w-full pt-28 pb-16">
        <div className="max-w-3xl">
          <h1 className="font-(--font-heading) text-4xl md:text-5xl tracking-wide">
            FAQ
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Answers before you step into the dark.
          </p>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
                <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
                  <span className="font-(--font-heading) text-xl tracking-wide">
                    {item.q}
                  </span>
                  <span className="ml-4 text-white/70 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-0 text-white/80 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              href="/attractions"
              className="relative inline-flex items-center gap-2 font-(--font-heading) tracking-wider uppercase text-sm
              px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
              Browse Attractions
            </Link>
            <Link
              href="/"
              className="relative inline-flex items-center gap-2 font-(--font-heading) tracking-wider uppercase text-sm
              px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
 
}
