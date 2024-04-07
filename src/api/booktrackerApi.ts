import useApi from "../hooks/useApi"

export const bookStatusList = [
    { value: "reading", label: "Reading" },
    { value: "selected", label: "Read Later" },
    { value: "finish", label: "Read" },
]

export type bookTrackerInfo = {
    id: string
    userId: string
    title: string
    book: bookInfo
    image: string
    status: string
    createtime: string
    updatetime: string
    time: number
    progressPage: number
    page: number
}

export type bookInfo = {
    id: string
    title: string
    author: string
    imageLink: string
    genres: string[]
    year: number
    description: null | string
    page: number
}

interface IBooktracker extends IResponse {
    data: { [key: string]: bookTrackerInfo[] }
}

export function BooktrackerAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IBooktracker>(`booktracker/${url}`, method)

    return {
        res,
        fetchData,
    }
}
