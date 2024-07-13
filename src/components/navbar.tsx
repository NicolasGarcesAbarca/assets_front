import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Baseline } from "lucide-react";
import Link from "next/link";
export default function NavBar() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 bg-primary px-4 md:px-8">
            <nav className="flex justify-between items-center w-full">
                <Link href="/">
                    <Baseline color="white" />
                </Link>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </header>
    );
}
