'use client'

import { useState } from "react";
import { Button } from "../ui/button";

export default function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    return (
        <div className="flex items-center gap-4">
            <Button variant="outline" onClick={increment}>Increment</Button>
            <p>Count: {count}</p>
            <Button onClick={decrement}>Decrement</Button>
        </div>
    )
}