import { App, Button, ConfigProvider, Drawer, Modal, Popover, Progress, Slider } from "antd"
import { Header } from "../components/Header"
import Player from "../assets/images/player.png"
import Pause from "../assets/images/pause.png"
import { useEffect, useState } from "react"
import "../assets/styles/pages/bookDetail.scss"
import { MoreOutlined } from "@ant-design/icons"
import { EditDeletePopover } from "../components/EditDeletePopover"
import NotesAddImg from "../assets/images/notes-add.png"
import { useNavigate, useParams } from "react-router-dom"
import { BooktrackerAPI, bookTrackerInfo } from "../api/booktrackerApi"
import WarningImg from "../assets/images/warning.png"
import { CloudImage } from "../components/CloudImage"
import TextArea from "antd/es/input/TextArea"
import { NotesAPI } from "../api/notesApi"

export const BookDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { fetchData: fetchBookTrackerInfoData } = BooktrackerAPI("get")
    const { fetchData: fetchSaveBookTrackerData } = BooktrackerAPI("focus")
    const { fetchData: fetchNoteCreateDataq } = NotesAPI("create")
    const { fetchData: fetchSaveBookTrackerDeleteData } = BooktrackerAPI("delete")
    const { message } = App.useApp()
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isSave, setIsSave] = useState(false)
    const [saveShow, setSaveShow] = useState<boolean>(false)
    const [drawerShow, setDrawerShow] = useState<boolean>(false)
    const [warningShow, setWarningShow] = useState<boolean>(false)
    const [notesShow, setNotesShow] = useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const [readPage, setReadPage] = useState<number>(0)
    const [bookTrackerInfo, setBookTrackerInfo] = useState<bookTrackerInfo | null>(null)
    const [notesContent, setNotesContent] = useState<string>("")

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadData = async () => {
        await fetchBookTrackerInfoData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                const booktrackerData: bookTrackerInfo = JSON.parse(JSON.stringify(res.data))
                setBookTrackerInfo(booktrackerData)
                setReadPage(booktrackerData?.progressPage || 0)
                setTimer(Math.floor((booktrackerData?.time || 0) / 10))
            }
        })
    }

    useEffect(() => {
        let intervalId: number
        if (isActive) {
            intervalId = setInterval(() => setTimer(timer + 1), 10)
        }
        return () => clearInterval(intervalId)
    }, [isActive, timer])

    const togglePlayer = () => {
        setIsActive((isActive) => (isActive = !isActive))
    }

    const timeText = (time: number) => {
        if (time >= 10) {
            return time
        } else {
            return `0${time}`
        }
    }

    const onGoBack = () => {
        if (isSave) {
            return true
        } else {
            setSaveShow(true)
            return false
        }
    }

    const onDeleteBook = () => {
        fetchSaveBookTrackerDeleteData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                message.success("Deleted")
                navigate("/")
            }
        })
    }

    const onEdit = () => {
        navigate(`/create-book/${id}`)
    }

    const onSaveNote = () => {
        fetchNoteCreateDataq({
            content: notesContent,
            bookId: bookTrackerInfo?.book.id,
        }).then((res) => {
            if (res.result_code === 0) {
                navigate("/notes")
            }
        })
    }

    const minutes: number = Math.floor((timer % 360000) / 6000)
    const seconds: number = Math.floor((timer % 6000) / 100)
    const milliseconds: number = timer % 100

    const onSave = () => {
        setIsActive(false)
        if (!id || !id.length) return

        fetchSaveBookTrackerData({
            bookTrackerId: id,
            time: timer * 10,
            page: readPage,
        }).then((res) => {
            if (res.result_code === 0) {
                setIsSave(true)
                setDrawerShow(false)
                loadData()
                message.success("Saved")
            }
        })
    }

    return (
        <div className="container book-detail">
            <Header isAcceptGoBack={onGoBack} />
            <div className="btn-save" onClick={() => setDrawerShow(true)}>
                Save
            </div>
            <div className="timer">
                <Progress
                    type="dashboard"
                    percent={100}
                    format={() => (minutes !== 0 ? `${timeText(minutes)}:${timeText(seconds)}` : `${timeText(seconds)}:${timeText(milliseconds)}`)}
                    strokeColor={{ "100%": "#005479", "0%": "#005479" }}
                />

                <div className="timer" onClick={() => togglePlayer()}>
                    <div className="action-block">
                        <span>
                            {isActive ? (
                                <img className="img-timer" src={Pause} alt="pause" />
                            ) : (
                                <img className="img-timer" src={Player} alt="player" />
                            )}
                        </span>
                    </div>
                    <p className="timer-text">Reading</p>
                </div>
            </div>

            <div className="book-card">
                <div className="book-info">
                    <CloudImage url={bookTrackerInfo?.image || ""} className="book-img" height={87} />

                    <div className="book-text-block">
                        <p className="book-title">{bookTrackerInfo?.title}</p>
                        <p className="book-page">
                            Page {bookTrackerInfo?.progressPage}/{bookTrackerInfo?.page}
                        </p>
                    </div>
                </div>
                <div className="actions">
                    <div style={{ width: 42, margin: "0 auto" }}>
                        <Popover
                            open={popoverOpen}
                            content={() =>
                                EditDeletePopover({
                                    onDelete: () => {
                                        setWarningShow(true)
                                        setPopoverOpen(false)
                                    },
                                    onEdit,
                                })
                            }
                            onOpenChange={(e) => setPopoverOpen(e)}
                            placement="bottomLeft"
                            trigger="click">
                            <MoreOutlined className="more-icon" onClick={() => setPopoverOpen(true)} />
                        </Popover>
                    </div>
                    <div className="notes-add-icon" onClick={() => setNotesShow(true)}>
                        <img src={NotesAddImg} className="notes-add-img" alt="notes" />
                    </div>
                </div>
            </div>

            <Drawer placement="bottom" title="How many page" closable={false} onClose={() => setDrawerShow(false)} open={drawerShow}>
                <div className="drawer-save-block">
                    <p className="page-number">{readPage}</p>
                    <ConfigProvider
                        theme={{
                            components: {
                                Slider: {
                                    trackBg: "#fff",
                                    handleActiveColor: "#fff",
                                    handleColor: "#fff",
                                    railSize: 10,
                                    railBg: "#848484",
                                    handleLineWidth: 8,
                                },
                            },
                        }}>
                        <Slider max={bookTrackerInfo?.page || 0} onChange={(e) => setReadPage(e)} value={readPage} />
                    </ConfigProvider>

                    <div className="actions">
                        <Button className="save-changes-btn" type="primary" onClick={() => onSave()}>
                            Save changes
                        </Button>
                        <p
                            className="cancel-name"
                            onClick={() => {
                                setDrawerShow(false)
                                setIsSave(false)
                            }}>
                            Cancel
                        </p>
                    </div>
                </div>
            </Drawer>
            {/* save modal */}
            <Modal
                className="modal-warning"
                open={saveShow}
                onCancel={() => setSaveShow(false)}
                footer={[
                    <Button className="cancel-btn" key="cancel" onClick={() => setSaveShow(false)}>
                        Cancel
                    </Button>,
                    <Button className="confirm-btn" key="yes" onClick={() => navigate(-1)}>
                        Yes
                    </Button>,
                ]}>
                <div className="warning-icon">
                    <img className="warning-img" src={WarningImg} alt="test" />
                    <p>Without saving?</p>
                </div>
            </Modal>
            {/* book delete modal */}
            <Modal
                className="modal-warning"
                open={warningShow}
                onCancel={() => setWarningShow(false)}
                footer={[
                    <Button className="cancel-btn" key="cancel" onClick={() => setWarningShow(false)}>
                        Cancel
                    </Button>,
                    <Button className="confirm-btn" key="yes" onClick={() => onDeleteBook()}>
                        Delete
                    </Button>,
                ]}>
                <div className="warning-icon">
                    <img src={WarningImg} className="warning-img" alt="test" />
                    <p>Delete the book ?</p>
                </div>
            </Modal>
            {/* notes modal */}
            <Modal
                className="modal-warning modal-notes"
                closeIcon={null}
                open={notesShow}
                onCancel={() => setNotesShow(false)}
                footer={[
                    <Button className="cancel-btn" key="cancel" onClick={() => setNotesShow(false)}>
                        Cancel
                    </Button>,
                    <Button className="confirm-btn" key="yes" onClick={() => onSaveNote()}>
                        Save
                    </Button>,
                ]}>
                <div>
                    <TextArea
                        placeholder="type  a  notes here ..."
                        className="text-area"
                        value={notesContent}
                        onChange={(e) => setNotesContent(e.target.value)}></TextArea>
                </div>
            </Modal>
        </div>
    )
}
