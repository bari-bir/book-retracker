import { PlayCircleOutlined, MessageOutlined } from "@ant-design/icons"
import "../assets/styles/components/bookCard.scss"
import { useNavigate } from "react-router-dom"
import { CloudImage } from "./CloudImage"

type propsInfo = {
    image: string
    id: string
}

export const BookCard = ({ id, image }: propsInfo) => {
    const navigate = useNavigate()
    return (
        <div className="book-wrapper" onClick={() => navigate(`/book-detail/${id}`)}>
            <CloudImage isPreview={false} className="book-img" url={image} height="100%"/>

            <div className="icon-wrapper">
                <PlayCircleOutlined className="book-icon" onClick={() => navigate(`/book-detail/${id}`)} />
                <MessageOutlined className="book-icon" onClick={() => navigate("/notes")} />
            </div>
        </div>
    )
}
