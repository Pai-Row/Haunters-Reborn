"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import NavLink from "@/components/NavLink";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function SpookyHeader() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
  <div className="fog-layer" />
  <div className="fog-layer fog-layer--slow" />
  <div className="fog-grain" />
  </div>

  // intensity ramps from 0 at top → 1 around 420px (tweak)
  const fog = useMemo(() => clamp01(scrollY / 420), [scrollY]);
  const scrolled = scrollY > 8;

  return (
    <header
      style={{
        ["--fog" as any]: String(fog),
      }}
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        "relative overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-x-0 before:-bottom-6 before:h-6",
        "before:bg-linear-to-b before:from-black/40 before:to-transparent",
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
          : "bg-black/50 backdrop-blur-md border-b border-white/10",
      ].join(" ")}
    >
      {/* Fog overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="fog-layer" />
        <div className="fog-layer fog-layer--slow" />
      </div>

      <nav className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="[font-family:var(--font-heading)] text-xl tracking-widest text-blue-300 hover:text-blue-400 transition"
        >
          HAUNTERS
        </Link>

        <div className="flex gap-8 text-sm uppercase tracking-wider">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/attractions">Attractions</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </div>
      </nav>
    </header>
  );
}
