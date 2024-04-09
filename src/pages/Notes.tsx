import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined"
import { Header } from "../components/Header"
import "../assets/styles/pages/notes.scss"
import { Empty, message, Popover } from "antd"
import { EditDeletePopover } from "../components/EditDeletePopover"
import { useEffect, useState } from "react"
import { noteInfo, NotesAPI } from "../api/notesApi"

export const Notes = () => {
    const { fetchData: fetchNotesData } = NotesAPI("my/list")
    const { fetchData: fetchDeleteNoteData } = NotesAPI("delete")
    const [dataList, setDataList] = useState<noteInfo[]>([])

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadData = () => {
        fetchNotesData({}).then((res) => {
            if (res.result_code === 0) {
                setDataList(res.data)
            }
        })
    }

    const onDeleteNote = (id: string) => {
        if (!id.length) return
        fetchDeleteNoteData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                message.success("deleted")
                loadData()
            }
        })
    }

    return (
        <div className="container notes">
            <Header title="Notes" isGoBack={false} />

            <div className="notes-wrapper">
                {dataList.length ? (
                    dataList.map((item, i) => (
                        <div key={i} className="notes-block">
                            <h3 className="note-title">{item.book.title || "-"}</h3>
                            <p className="note-descr">{item.content}</p>

                            <Popover
                                content={() => EditDeletePopover({ onDelete: () => onDeleteNote(item.id), onEdit: () => console.log("edit") })}
                                placement="bottomLeft"
                                trigger="click">
                                <MoreOutlined className="more-icon" />
                            </Popover>
                        </div>
                    ))
                ) : (
                    <Empty />
                )}
            </div>
        </div>
    )
}
