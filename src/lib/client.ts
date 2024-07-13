import Client from "@/types/client";

export function getTotalAbono(client: Client): number {
    if (client.pagos?.length) {
        return client.pagos.reduce((acc, pago) => {
            return acc + pago.abonos
        }, 0)
    }
    return 0
}