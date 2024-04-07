import { App, Button, ConfigProvider, Drawer, Popover, Progress, Slider } from "antd"
import { Header } from "../components/Header"
import Player from "../assets/images/player.png"
import Pause from "../assets/images/pause.png"
import { useEffect, useState } from "react"
import "../assets/styles/pages/bookDetail.scss"
import { MoreOutlined } from "@ant-design/icons"
import { EditDeletePopover } from "../components/EditDeletePopover"
import NotesAddImg from "../assets/images/notes-add.png"
import { useParams } from "react-router-dom"
import { BooktrackerAPI, bookTrackerInfo } from "../api/booktrackerApi"
import { CloudImage } from "../components/CloudImage"

export const BookDetail = () => {
    const { id } = useParams()
    const { fetchData: fetchBookTrackerInfoData } = BooktrackerAPI("get")
    const { fetchData: fetchSaveBookTrackerData } = BooktrackerAPI("focus")
    const { message } = App.useApp()
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isSave, setIsSave] = useState(false)
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const [readPage, setReadPage] = useState<number>(0)
    const [bookTrackerInfo, setBookTrackerInfo] = useState<bookTrackerInfo | null>(null)

    useEffect(() => {
        fetchBookTrackerInfoData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                const booktrackerData: bookTrackerInfo = JSON.parse(JSON.stringify(res.data))
                setBookTrackerInfo(booktrackerData)
                setReadPage(booktrackerData?.progressPage || 0)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let intervalId: number
        if (isActive) {
            intervalId = setInterval(() => setTimer(timer + 1), 1000)
        }
        return () => clearInterval(intervalId)
    }, [isActive, timer])

    const togglePlayer = () => {
        setIsActive((isActive) => (isActive = !isActive))
    }

    const minutes: number = Math.floor((timer % 3600) / 600)
    const milliseconds: number = timer * 1000

    const onSave = () => {
        setIsActive(false)
        if (!id || !id.length) return

        fetchSaveBookTrackerData({
            bookTrackerId: id,
            time: milliseconds,
            page: readPage,
        }).then((res) => {
            if (res.result_code === 0) {
                setIsSave(true)
                setShowDrawer(false);
                message.success("Saved")
            }
        })
    }

    return (
        <div className="container book-detail">
            <Header />
            <div className="btn-save" onClick={() => setShowDrawer(true)}>
                Save
            </div>
            <div className="timer">
                <Progress type="dashboard" percent={100} format={() => `${minutes}:${timer}`} strokeColor={{ "100%": "#005479", "0%": "#005479" }} />

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
                        <Popover content={EditDeletePopover} placement="bottomLeft" trigger="click">
                            <MoreOutlined className="more-icon" />
                        </Popover>
                    </div>
                    <div className="notes-add-icon">
                        <img src={NotesAddImg} className="notes-add-img" alt="notes" />
                    </div>
                </div>
            </div>

            <Drawer placement="bottom" title="How much page" closable={false} onClose={() => setShowDrawer(false)} open={showDrawer}>
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
                        <Slider max={bookTrackerInfo?.page || 0} onChange={(e) => setReadPage(e)} />
                    </ConfigProvider>

                    <div className="actions">
                        <Button className="save-changes-btn" type="primary" onClick={() => onSave()}>
                            Save changes
                        </Button>
                        <p className="cancel-name" onClick={() => setIsSave(false)}>
                            Cancel
                        </p>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
