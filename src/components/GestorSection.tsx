import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "./ui/card";
import { ArrowUpRight } from "lucide-react";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "./ui/table";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Payment from "@/types/payments";
import useSWR from "swr";
import { idGestores } from "@/lib/payments";
import Gestor from "@/types/gestor";
import { abonoTotalByGestor, avatarName, email, gestorById } from "@/lib/gestor";
import { fetchGestores } from "@/lib/fetcher";

interface IProps {
    pagos: Payment[]
}

export default function GestorSection({ pagos }: IProps) {
    const { data: gestores } = useSWR<Gestor[], any, any>(idGestores(pagos), fetchGestores)

    return <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Pagos</CardTitle>
                    <CardDescription>
                        Pagos realizados por el cliente.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                        Ver todos
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Gestor</TableHead>
                            <TableHead>
                                Monto
                            </TableHead>
                            <TableHead>
                                Abono
                            </TableHead>
                            <TableHead className="text-right">
                                Fecha
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pagos.map(pago => <TableRow key={pago.f_pago + pago.gestor}>
                            <TableCell>
                                <div className="font-medium">{gestorById(pago.gestor, gestores)}</div>
                            </TableCell>
                            <TableCell>
                                {pago.monto}
                            </TableCell>
                            <TableCell >
                                {pago.abonos}
                            </TableCell>
                            <TableCell className="text-right">
                                {pago.f_pago}
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Gestores</CardTitle>
                <CardDescription>
                    Asociados al cliente.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
                {gestores?.map(gestor => <div key={gestor.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>{avatarName(gestor.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {gestor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {email(gestor.name)}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">{abonoTotalByGestor(pagos, gestor.id)}</div>
                </div>
                )
                }
            </CardContent>
        </Card>
    </div>
}