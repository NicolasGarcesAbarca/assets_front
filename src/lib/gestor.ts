import Gestor from "@/types/gestor"
import Payment from "@/types/payments"

export function email(name: string) {
    const names = name.split(" ")
    if (names.length > 1) {
        return `${names[0].trim()}.${names[1].trim()}@assets.com`
    }
    return `${name.trim()}@assets.com`
}

export function avatarName(name: string) {
    const names = name.split(" ")
    if (names.length > 1) {
        return `${names[0].trim()[0]}${names[1].trim()[0]}`
    }
    return `${name.trim()[0]}`
}

export function gestorById(id: number, list: Gestor[] | undefined) {
    if (list) {
        const gestor = list.find(item => item.id === id)
        if (gestor) return gestor.name
    }
    return "not found"
}

export function abonoTotalByGestor(pagos: Payment[], idGestor: number) {
    return pagos.reduce((acc, pago) => {
        if (pago.gestor === idGestor) {
            return acc + pago.abonos
        }
        return acc
    }, 0)
}