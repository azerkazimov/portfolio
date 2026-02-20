"use client";
import { useParams } from "next/navigation";




export default function PortfolioPost() {
    const { post } = useParams();


    return (
        <div>
            <h1>Portfolio Post Dynamically: {post}</h1>
        </div>
    )
}