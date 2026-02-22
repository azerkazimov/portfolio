"use client"
import { Button } from "@/components/ui/button";
import { Service } from "@/types/services";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    }

    const [serverData, setServerData] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
            const data = await response.json();
            setServerData(data);
        }
        fetchData();
    }, [])
    return (
        <div className="container mx-auto">

            <h1>Dashboard</h1>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serverData.map((service: Service) => (
                    <div key={service._id} className="border p-4 rounded-md">
                        <h2>{service.name.az}</h2>
                        <p>{service.description.az}</p>
                    </div>
                ))}
            </div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}