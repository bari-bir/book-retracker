import { CloseOutlined, CloudUploadOutlined } from "@ant-design/icons"
import { Header } from "../components/Header"
import "../assets/styles/pages/createBook.scss"
import { InputStyle } from "../components/InputStyle"
import { App, Button, Input, Select } from "antd"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { bookStatusList, BooktrackerAPI } from "../api/booktrackerApi"
import { CloudImage } from "../components/CloudImage"
import { BookAPI } from "../api/bookApi"

type bookInfo = {
    imageLink?: string
    title: string
    author: string
    status: string | null
    page: number
    image: string
}

const _infoTemp = {
    title: "",
    author: "",
    status: null,
    page: 0,
    image: "",
}

export const CreateBook = () => {
    const { id } = useParams()
    const { fetchData: fetchSaveBookTrackerData } = BooktrackerAPI("create")
    const { fetchData: fetchUpdateBookTrackerData } = BooktrackerAPI("update")
    const { fetchData: fetchGetBookTrackerData } = BooktrackerAPI("get")
    const { fetchData: fetchGetBookData } = BookAPI("get")
    const { message } = App.useApp()
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const statusType = queryParams.get("status")
    const bookId = queryParams.get("bookId")
    const [info, setInfo] = useState<bookInfo>({
        ..._infoTemp,
        status: statusType,
    })

    const handlePostMessageListener = useCallback((message: MessageEvent) => {
        const image = message.data.url
        setInfo((info) => ({ ...info, image }))
    }, [])

    useEffect(() => {
        if (isNotAddBook()) {
            fetchGetBookTrackerData({
                id,
            }).then((res) => {
                if (res.result_code === 0) {
                    const bookTracker: bookInfo = JSON.parse(JSON.stringify(res.data))
                    setInfo({
                        ..._infoTemp,
                        ...bookTracker,
                    })
                }
            })
        } else if (id === "book" && bookId) {
            fetchGetBookData({
                id: bookId,
            }).then((res) => {
                if (res.result_code === 0) {
                    const bookInfo: { book: bookInfo } = JSON.parse(JSON.stringify(res.data))
                    setInfo({ ...bookInfo.book, image: bookInfo.book.imageLink || "" })
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.addEventListener("message", handlePostMessageListener)
        return () => {
            window.removeEventListener("message", handlePostMessageListener)
        }
    }, [handlePostMessageListener])

    const isNotAddBook = () => {
        return id !== "add" && id !== "book"
    }

    const onChangePage = (value: string) => {
        const pageNumber = parseInt(value)

        if (!isNaN(pageNumber)) {
            setInfo({ ...info, page: pageNumber })
        } else {
            setInfo({ ...info, page: 0 })
        }
    }

    const onUploadImg = () => {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ key: "uploadImg" }))
        }
    }

    const onDeleteImage = (e: KonvaMouseEvent) => {
        e.stopPropagation()

        setInfo({ ...info, image: "" })
    }

    const onSubmit = async () => {
        if (isNotAddBook()) {
            await fetchUpdateBookTrackerData({
                id,
                ...info,
            }).then((res) => {
                if (res.result_code === 0) {
                    setInfo(_infoTemp)
                }
            })
        } else {
            await fetchSaveBookTrackerData(info).then((res) => {
                if (res.result_code === 0) {
                    setInfo(_infoTemp)
                }
            })
        }
        navigate("/")
        message.success("Successfuly created book")
    }

    return (
        <div className="container create-book">
            <Header title="Add a book" />

            <div className="dragger">
                {info.image?.length ? (
                    <div className="image-block">
                        <CloudImage url={info.image} width="100%" height={142} className="book-img" />
                        <CloseOutlined className="close-icon" onClick={(e) => onDeleteImage(e)} />
                    </div>
                ) : (
                    <div className="dragger-wrapper" onClick={onUploadImg}>
                        <div className="upload-icon">
                            <CloudUploadOutlined className="upload-icon" />
                            <p className="upload-text">Click here to upload</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="input-wrapper">
                <InputStyle labelText="Title">
                    <Input
                        placeholder="name of book"
                        className="input"
                        value={info.title}
                        onChange={(e) => setInfo({ ...info, title: e.target.value })}
                    />
                </InputStyle>
                <InputStyle labelText="Author">
                    <Input
                        placeholder="author of book"
                        className="input"
                        value={info.author}
                        onChange={(e) => setInfo({ ...info, author: e.target.value })}
                    />
                </InputStyle>
                <InputStyle labelText="Status">
                    <Select
                        placeholder="status of book"
                        defaultValue={statusType}
                        style={{ width: 120 }}
                        value={info.status}
                        onChange={(e) => setInfo({ ...info, status: e })}
                        options={bookStatusList}
                    />
                </InputStyle>
                <InputStyle labelText="Page">
                    <Input
                        placeholder="type  a  message here ..."
                        type="number"
                        className="input"
                        value={info.page}
                        onChange={(e) => onChangePage(e.target.value)}
                    />
                </InputStyle>

                <Button type="primary" className="btn-save" onClick={() => onSubmit()}>
                    Save
                </Button>
            </div>
        </div>
    )
}
