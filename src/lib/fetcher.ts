import { apiBaseURL } from "./constants"

export const fetchClients = async (url: string) => {
    const res = await fetch(url)
    return res.json()
}

export function fetchGestores(ids: any[]) {
    return Promise.all(ids.map(id => fetch(`${apiBaseURL}/gestores/${id}`).then(res => res.json())))
}