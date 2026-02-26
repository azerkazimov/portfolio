import { Service } from "@/features/services/types/services";

export default async function Portfolio() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
    const services = await response.json();

    return (
        <div className="container mx-auto">
            <h1>Portfolio</h1>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service: Service) => (
                    <div key={service._id} className="border p-4 rounded-md">
                        <h2>{service.name.az}</h2>
                        <p>{service.description.az}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}