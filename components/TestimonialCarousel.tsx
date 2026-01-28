"use client";

import { PropsWithChildren, useEffect, useRef, useState, Children } from "react";

export default function TestimonialCarousel({ children }: PropsWithChildren) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [snapEnabled, setSnapEnabled] = useState(false);
  // pause only when user is actively interacting (dragging/clicking),
  // not just because the mouse is hovering over it
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const resetIfNeeded = (el: HTMLDivElement) => {
    const resetPoint = el.scrollWidth / 2;
    if (resetPoint <= 0) return;
    if (el.scrollLeft >= resetPoint) el.scrollLeft -= resetPoint;
    if (el.scrollLeft < 0) el.scrollLeft += resetPoint;
  };

  const SPEED_PX_PER_SEC = 18; // tweak
  const STEP_FACTOR = 0.9;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const stepMs = 33;
    const stepPx = (SPEED_PX_PER_SEC * stepMs) / 1000;

    const id = window.setInterval(() => {
      if (isInteractingRef.current) return;

      const resetPoint = el.scrollWidth / 2;
      if (resetPoint <= 0) return; // not overflowing -> nothing to scroll

      const next = el.scrollLeft + stepPx;
      el.scrollLeft = next >= resetPoint ? next - resetPoint : next;
    }, stepMs);

    return () => window.clearInterval(id);
  }, []);

  const scrollByViewport = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;

    isInteractingRef.current = true;
    setSnapEnabled(false);

    const amount = el.clientWidth * STEP_FACTOR * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });

    window.setTimeout(() => {
      resetIfNeeded(el);
      isInteractingRef.current = false;
    }, 800);
  };

  const slides = Children.toArray(children);
  const loopedSlides = slides.concat(slides);

  return (
    <div className="relative">
      {/* Fog / mist overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="grave-fog grave-fog--one" />
        <div className="grave-fog grave-fog--two" />
      </div>

      {/* Creepy arrows */}
      <button
        type="button"
        onClick={() => scrollByViewport(-1)}
        aria-label="Previous testimonials"
        className={[
          "group absolute left-2 top-1/2 -translate-y-1/2 z-20",
          "h-11 w-11 rounded-full",
          "border border-white/15 bg-black/50 backdrop-blur",
          "shadow-[0_10px_30px_rgba(0,0,0,0.6)]",
          "transition hover:scale-105 hover:border-white/30 active:scale-95",
        ].join(" ")}
      >
        <span className="block text-white/80 group-hover:text-white transition">
          {"\u276E"}
        </span>
      </button>

      <button
        type="button"
        onClick={() => scrollByViewport(1)}
        aria-label="Next testimonials"
        className={[
          "group absolute right-2 top-1/2 -translate-y-1/2 z-20",
          "h-11 w-11 rounded-full",
          "border border-white/15 bg-black/50 backdrop-blur",
          "shadow-[0_10px_30px_rgba(0,0,0,0.6)]",
          "transition hover:scale-105 hover:border-white/30 active:scale-95",
        ].join(" ")}
      >
        <span className="block text-white/80 group-hover:text-white transition">
          {"\u276F"}
        </span>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className={[
          "relative z-0",
          "overflow-x-auto",
          "no-scrollbar",
          "select-none",
          "px-0",
          snapEnabled ? "snap-x snap-mandatory" : "snap-none",
        ].join(" ")}
        style={{ scrollBehavior: "auto" }}
        onPointerDown={(event) => {
          const el = trackRef.current;
          if (!el) return;
          isInteractingRef.current = true;
          isDraggingRef.current = true;
          dragStartXRef.current = event.clientX;
          dragStartScrollRef.current = el.scrollLeft;
          el.setPointerCapture(event.pointerId);
          setSnapEnabled(false);
        }}
        onPointerMove={(event) => {
          if (!isDraggingRef.current) return;
          const el = trackRef.current;
          if (!el) return;
          const dx = event.clientX - dragStartXRef.current;
          el.scrollLeft = dragStartScrollRef.current - dx;
          resetIfNeeded(el);
        }}
        onPointerUp={(event) => {
          const el = trackRef.current;
          if (el) el.releasePointerCapture(event.pointerId);
          isDraggingRef.current = false;
          isInteractingRef.current = false;
          window.setTimeout(() => setSnapEnabled(false), 700);
        }}
        onPointerCancel={(event) => {
          const el = trackRef.current;
          if (el) el.releasePointerCapture(event.pointerId);
          isDraggingRef.current = false;
          isInteractingRef.current = false;
          setSnapEnabled(false);
        }}
        onMouseEnter={() => {
          isInteractingRef.current = true;
        }}
        onMouseLeave={() => {
          if (!isDraggingRef.current) isInteractingRef.current = false;
        }}
      >
        <div className="flex gap-6 w-max">
          {loopedSlides.map((child, i) => (
            <div
              key={i}
              className={[
                "shrink-0",
                "w-[70%] sm:w-[45%] lg:w-[33.333%] max-w-[520px]",
                snapEnabled ? "snap-start" : "",
              ].join(" ")}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Edge mist */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black/70 via-black/20 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black/70 via-black/20 to-transparent z-10" />

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/40 to-transparent z-10" />
    </div>
  );
}



