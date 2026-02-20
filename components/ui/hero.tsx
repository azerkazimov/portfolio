"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const t = useTranslations("Hero");

    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const containerEl = containerRef.current;
        const titleEl = titleRef.current;

        gsap.to(titleEl,
            {
                xPercent: 0,
                duration: 4,
                ease: "none",
                repeat: -1,
                repeatRefresh: true,
            }
        )
    }, [])


    return (<>
        <section ref={containerRef} className="relative h-[972px] w-full">
            <Image src="/images/Azer_Kazimov.png" alt="Hero" fill className="object-cover object-[50%_30%] max-h-[972px] w-full grayscale-100" />
        </section>
        <div className="absolute top-1/2 -translate-y-1/2 ">
            <h1 ref={titleRef} className="text-[300px] text-white overflow-scroll whitespace-nowrap">
                {t("title")}
            </h1>
        </div>
    </>
    )
}