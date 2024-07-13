"use client"

import * as React from "react"
import {
  DollarSign,
  OctagonAlert,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import useSWR from "swr"
import Client from "@/types/client"
import ComboboxClient from "@/components/ComboboxClient"
import { getTotalAbono } from "@/lib/client"
import GestorSection from "@/components/GestorSection"
import Payment from "@/types/payments"
import { GridLoader } from "react-spinners"
import { apiBaseURL } from "@/lib/constants"
import { fetchClients } from "@/lib/fetcher"
import ErrorPage from "@/components/Error"



export default function Gestores() {
  const [clientSelected, setClientSelected] = React.useState<Client>({} as Client)
  const { data, isLoading, error } = useSWR(`${apiBaseURL}/clientes`, fetchClients)

  if (error) {
    return <ErrorPage message={"Error al conectarse a la api gestores"} />
  }

  if (isLoading) {
    return <div className="flex min-h-screen w-full justify-center items-center">
      <GridLoader
        loading
        color="#32655b" />
    </div>
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <ComboboxClient clients={data} setClient={setClientSelected} />
        </div>
        {clientSelected.name ?
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clientSelected.name}</div>
                  <p className="text-xs text-muted-foreground">
                    {clientSelected.rut}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Recibido
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalAbono(clientSelected)}</div>
                  <p className="text-xs text-muted-foreground">
                    Monto de abonos
                  </p>
                </CardContent>
              </Card>
            </div>
            <GestorSection pagos={clientSelected.pagos as Payment[]} />
          </div>
          : <div className="flex border rounded-lg min-h-[70vh] justify-center items-center">
            <div className="flex gap-2 items-center">
              <OctagonAlert size="40" color="#32655b" />
              <p className="text-lg font-semibold text-primary">No hay rut seleccionado</p>
            </div>
          </div>}
      </main>
    </div>
  )
}
