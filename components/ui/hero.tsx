import Image from "next/image";

export default function Hero() {
    return (
        <section>
            <Image src="/images/Azer_Kazimov.png" alt="Hero" fill className="object-cover object-[50%_30%] max-h-[972px] w-full grayscale-100"   />
        </section>
    )
}