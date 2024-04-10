import useApi from "../hooks/useApi"

export type bookInfo = {
    id: string
    title: string
    author: string
    imageLink: string
    year: number
    genres: string[]
    pages?: number
    description?: string
    rating?: number
}

interface IBook extends IResponse {
    data: bookInfo[]
}

export function BookAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IBook>(`book/${url}`, method)
    return { res, fetchData }
}
