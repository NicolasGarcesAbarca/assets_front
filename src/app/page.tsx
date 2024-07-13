import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
  redirect("/clientes")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Assets</h1>
      <Link href={"/clientes"}>Ver Clientes</Link>
    </main>
  );
}
