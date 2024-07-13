import Payment from "@/types/payments";

export function idGestores(pagos:Payment[]){
    const gestores = pagos.map(pago=>pago.gestor)
    return gestores.filter(e=>gestores.indexOf(e)===gestores.lastIndexOf(e)) 
}
