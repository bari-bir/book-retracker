import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined"
import { Header } from "../components/Header"
import "../assets/styles/pages/notes.scss"
import { Button, Empty, message, Modal, Popover } from "antd"
import { EditDeletePopover } from "../components/EditDeletePopover"
import { useEffect, useState } from "react"
import { noteInfo, NotesAPI } from "../api/notesApi"
import TextArea from "antd/es/input/TextArea"

export const Notes = () => {
    const { fetchData: fetchNotesData } = NotesAPI("my/list")
    const { fetchData: fetchNoteUpdateData } = NotesAPI("update")
    const { fetchData: fetchDeleteNoteData } = NotesAPI("delete")
    const [notesShow, setNotesShow] = useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)

    const [dataList, setDataList] = useState<noteInfo[]>([])
    const [info, setInfo] = useState<{
        userId: string
        bookId: string
        content: string
    }>({
        userId: "",
        bookId: "",
        content: "",
    })

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
        setPopoverOpen(false);
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

    const onEditNotes = (note: noteInfo) => {
        setPopoverOpen(false);
        setInfo({
            bookId: note.bookId,
            userId: note.userId,
            content: note.content,
        })
        setNotesShow(true)
    }

    const onSaveNotes = () => {
        fetchNoteUpdateData(info).then((res) => {
            if (res.result_code === 0) {
                message.success("updated")
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
                                content={() => EditDeletePopover({ onDelete: () => onDeleteNote(item.id), onEdit: () => onEditNotes(item) })}
                                onOpenChange={(e) => setPopoverOpen(e)}
                                open={popoverOpen}
                                placement="bottomLeft"
                                trigger="click">
                                <MoreOutlined className="more-icon" onClick={() => setPopoverOpen(true)} />
                            </Popover>
                        </div>
                    ))
                ) : (
                    <Empty />
                )}
            </div>

            <Modal
                className="modal-warning modal-notes"
                closeIcon={null}
                open={notesShow}
                onCancel={() => setNotesShow(false)}
                footer={[
                    <Button className="cancel-btn" key="cancel" onClick={() => setNotesShow(false)}>
                        Cancel
                    </Button>,
                    <Button className="confirm-btn" key="yes" onClick={() => onSaveNotes()}>
                        Save
                    </Button>,
                ]}>
                <div>
                    <TextArea
                        placeholder="type  a  notes here ..."
                        className="text-area"
                        value={info.content}
                        onChange={(e) => setInfo({ ...info, content: e.target.value })}></TextArea>
                </div>
            </Modal>
        </div>
    )
}
