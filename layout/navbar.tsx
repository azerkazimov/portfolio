import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

export function Navbar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="text-white size-6" />
            </SheetTrigger>

            <SheetContent
                side="top"
                className="bg-white/20 backdrop-blur-md shadow-md w-full h-full"
            >
                {/* Custom Close Button */}
                <SheetClose asChild>
                    <button className="absolute top-4 right-4 text-white">
                        <X className="size-6" />
                    </button>
                </SheetClose>

                <SheetHeader>
                    <SheetTitle />
                    <SheetDescription />
                </SheetHeader>

                <SheetFooter />
            </SheetContent>
        </Sheet>

    )
}
