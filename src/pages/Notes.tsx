import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined"
import "../assets/styles/pages/notes.scss"
import { Button, Empty, message, Modal, Popover } from "antd"
import { EditDeletePopover } from "../components/EditDeletePopover"
import { useEffect, useState } from "react"
import { noteInfo, NotesAPI } from "../api/notesApi"
import TextArea from "antd/es/input/TextArea"
import { bookInfo } from "../api/booktrackerApi"
import { CloudImage } from "../components/CloudImage"
import { StarOutlined } from "@ant-design/icons"

interface INote {
    id: string
    userId: string
    bookId: string
    content: string
    book?: bookInfo
}

const _popoverInfo = {
    id: "",
    isOpen: false,
}

export const Notes = () => {
    const { fetchData: fetchNotesData } = NotesAPI("my/list")
    const { fetchData: fetchNoteUpdateData } = NotesAPI("update")
    const { fetchData: fetchDeleteNoteData } = NotesAPI("delete")
    const [notesShow, setNotesShow] = useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = useState<{ id: string; isOpen: boolean }>(_popoverInfo)
    const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({})
    const [dataList, setDataList] = useState<noteInfo[]>([])
    const [info, setInfo] = useState<INote>({
        id: "",
        userId: "",
        bookId: "",
        book: {
            id: "",
            title: "",
            author: "",
            imageLink: "",
            genres: [],
            year: 0,
            description: null,
            page: 0,
        },
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
        if (!id.length) return

        setPopoverOpen(_popoverInfo)
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
        setPopoverOpen(_popoverInfo)
        setInfo({
            id: note.id,
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
                setNotesShow(false)
            }
        })
    }

    const isFloatRaging = (rating: number) => {
        return Number(rating) === rating && (rating || 0) % 1 !== 0
    }

    return (
        <div className="container notes">
            <div className="notes-wrapper">
                {dataList.length ? (
                    dataList.map((item) => (
                        <div
                            key={item.id}
                            className="notes-block"
                            style={{ padding: "16px 0" }}
                            onClick={() => setShowMore((showMore) => ({ [item.id]: !showMore[item.id] }))}>
                            <div className="book-notes-wrapper">
                                <div>
                                    <CloudImage url={item.book.imageLink} className="book-img" />
                                </div>
                                <div className="book-info">
                                    <h3 className="book-title">{item.book.title}</h3>
                                    <p className="book-author">{item.book.author}</p>

                                    <div className="book-rating">
                                        <StarOutlined className="star-icon" />
                                        <span className="rating-number-text">
                                            {isFloatRaging(item.book.rating || 0) ? item.book.rating?.toFixed(2) : item.book.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="notes-info">
                                <h3 className="note-title">Note</h3>
                                <p
                                    className="note-text"
                                    style={{
                                        overflow: showMore[item.id] ? "auto" : "hidden",
                                        display: showMore[item.id] ? "block" : "-webkit-box",
                                    }}>
                                    {item.content}
                                </p>
                                <Popover
                                    content={() => EditDeletePopover({ onDelete: () => onDeleteNote(item.id), onEdit: () => onEditNotes(item) })}
                                    onOpenChange={(e) =>
                                        setPopoverOpen({
                                            id: item.id,
                                            isOpen: e,
                                        })
                                    }
                                    open={popoverOpen.isOpen && popoverOpen.id === item.id}
                                    placement="bottomLeft"
                                    trigger="click">
                                    <MoreOutlined
                                        className="more-icon"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setPopoverOpen({
                                                id: item.id,
                                                isOpen: true,
                                            })
                                        }}
                                    />
                                </Popover>
                            </div>
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
