"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const t = useTranslations("Hero");
  const titleTop = t("titleTop");
  const titleBottom = t("titleBottom");

  const containerRef = useRef<HTMLDivElement>(null);
  const titleTopRef = useRef<HTMLSpanElement>(null);
  const titleBottomRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const imageEl = imageRef.current;
        const overlayEl = overlayRef.current;
        const topEl = titleTopRef.current;
        const bottomEl = titleBottomRef.current;

        // Hero image: scale up + fade in
        gsap.fromTo(
          imageEl,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
          }
        );

        // Overlay fade out (reveal image)
        gsap.to(overlayEl, {
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.inOut",
        });

        // Title top: come from down (animate from below → to center)
        gsap.fromTo(
          topEl,
          { opacity: 0, y: 120 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.5,
            ease: "power3.out",
          }
        );

        // Title bottom: come from top (animate from above → to center)
        gsap.fromTo(
          bottomEl,
          { opacity: 0, y: -120 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.65,
            ease: "power3.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    [titleTop, titleBottom]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[972px] w-full overflow-hidden"
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 opacity-0">
        <Image
          src="/images/Azer_Kazimov.png"
          alt="Hero"
          fill
          className="object-cover object-[50%_30%] max-h-[972px] w-full grayscale"
          priority
          sizes="100vw"
        />
      </div>

      {/* Top-edge vignette overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/40 opacity-100"
        aria-hidden
      />

      {/* Title: top line + bottom line */}
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 px-4 md:px-8">
        <h1 className="flex flex-col items-center text-center">
          <span
            ref={titleTopRef}
            className="block text-[180px] font-bold leading-[0.9] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-[clamp(4rem,18vw,220px)]"
            style={{ opacity: 0 }}
          >
            {titleTop}
          </span>
          <span
            ref={titleBottomRef}
            className="block text-[clamp(3rem,14vw,220px)] font-bold leading-[0.9] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-[clamp(4rem,18vw,280px)]"
            style={{ opacity: 0 }}
          >
            {titleBottom}
          </span>
        </h1>
      </div>
    </section>
  );
}
