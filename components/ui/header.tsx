"use client";
import { useTablet } from "@/components/hooks/use-tablet";
import { Navbar } from "@/layout/navbar";
import Link from "next/link";
import { useMobile } from "../hooks/use-mobile";
import { useTranslations } from "next-intl";


export default function Header() {
    const isMobile = useMobile();
    const isTablet = useTablet();
    const t = useTranslations("Header");

    if (isMobile || isTablet) {
        return (
            <header className="absolute top-10 left-24 right-0 z-50">
                <Navbar />
            </header>
        )
    }
    return (
        <header className="absolute top-10 left-0 right-0 z-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-start">
                    <Link className="text-xl text-white font-handjet" href="https://www.linkedin.com/in/azer-kazimov-8b06bb12a/">{t("title")}</Link>
                    <span className="text-white text-lg max-w-[600px] text-right">
                        {t("description")}
                    </span>
                </div>
            </div>
        </header>
    )
}