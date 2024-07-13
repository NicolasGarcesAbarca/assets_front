import Payment from "./payments"
export default interface Client{
    name:string
    rut:string
    pagos?: Array<Payment>
}

