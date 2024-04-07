import { Popover, Progress } from "antd"
import { Header } from "../components/Header"
import Player from "../assets/images/player.png"
import Pause from "../assets/images/pause.png"
import { useState } from "react"
import "../assets/styles/pages/bookDetail.scss"
import { MoreOutlined } from "@ant-design/icons"
import { EditDeletePopover } from "../components/EditDeletePopover"
import NotesAddImg from "../assets/images/notes-add.png"

export const BookDetail = () => {
    const [isPlayer, setIsPlayer] = useState<boolean>(true)

    const togglePlayer = () => {
        setIsPlayer((isPlayer) => (isPlayer = !isPlayer))
    }

    return (
        <div className="container book-detail">
            <Header />

            <div className="timer">
                <Progress type="dashboard" percent={75} format={() => `2:05`} />

                <div className="timer" onClick={() => togglePlayer()}>
                    <div className="action-block">
                        <span>
                            {isPlayer ? (
                                <img className="img-timer" src={Player} alt="player" />
                            ) : (
                                <img className="img-timer" src={Pause} alt="pause" />
                            )}
                        </span>
                    </div>
                    <p className="timer-text">Reading</p>
                </div>
            </div>

            <div className="book-card">
                <div className="book-info">
                    <img className="book-img" src="https://i.pinimg.com/736x/22/26/12/222612f04f82c25397a501595f5fee47.jpg" alt="book img" />

                    <div className="book-text-block">
                        <p className="book-title">Garry Potter</p>
                        <p className="book-page">Page 0/100</p>
                    </div>
                </div>
                <div className="actions">
                    <div style={{width: 42, margin: "0 auto"}}>
                        <Popover content={EditDeletePopover} placement="bottomLeft" trigger="click">
                            <MoreOutlined className="more-icon" />
                        </Popover>
                    </div>
                    <div className="notes-add-icon">
                        <img src={NotesAddImg} className="notes-add-img" alt="notes" />
                    </div>
                </div>
            </div>
        </div>
    )
}
