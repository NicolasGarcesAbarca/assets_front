import NavBar from "@/components/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen w-full flex-col">
            <NavBar />
            {children}
        </main>
    );
}