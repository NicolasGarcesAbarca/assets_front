import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface IProps {
    message: string
}

export default function ErrorPage({ message }: IProps) {
    return <div className="flex flex-col min-h-screen w-full justify-center items-center gap-4">
        <p className="text-lg font-semibold">{message}</p>
        <Link href={"/"} className={buttonVariants({ variant: "outline" })}>Click here</Link>
    </div>
}