import useApi from "../hooks/useApi"
import { bookInfo } from "./booktrackerApi"

export type noteInfo = {
    id: string
    book: bookInfo
    content: string
    bookId: string
}

interface INotes extends IResponse {
    data: noteInfo[]
}

export function NotesAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<INotes>(`note/${url}`, method)

    return { res, fetchData }
}
