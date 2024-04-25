import { PlayCircleOutlined, MessageOutlined } from "@ant-design/icons"
import "../assets/styles/components/bookCard.scss"
import { useNavigate } from "react-router-dom"
import { CloudImage } from "./CloudImage"
import { bookTrackerInfo } from "../api/booktrackerApi"

export const BookCard = ({ id, image, progressPage, page }: bookTrackerInfo) => {
    const navigate = useNavigate()

    const procentPage = () => {
        if (progressPage < page) {
            return ((progressPage * 100) / page) | 0
        }

        return 100
    }

    return (
        <div className="book-wrapper" onClick={() => navigate(`/book-detail/${id}`)}>
            <CloudImage isPreview={false} className="book-img" url={image} height="100%" width="100%" />

            <div
                className="icon-wrapper"
                style={{ borderRadius: progressPage !== 0 ? " 0 0 33px 33px" : "33px 0", width: progressPage !== 0 ? "100%" : 78 }}>
                {progressPage !== 0 && (
                    <div className="procent-wrapper">
                        <div className="procent">
                            <div className="line" style={{ width: `${procentPage()}%` }} />
                        </div>
                        <p className="procent-text">{procentPage()}%</p>
                    </div>
                )}
                <PlayCircleOutlined className="book-icon" onClick={() => navigate(`/book-detail/${id}`)} />
                <MessageOutlined className="book-icon" onClick={() => navigate("/notes")} />
            </div>
        </div>
    )
}
