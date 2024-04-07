import { PlayCircleOutlined, MessageOutlined } from "@ant-design/icons"
import "../assets/styles/components/bookCard.scss";
import { useNavigate } from "react-router-dom";


export const BookCard = () => {
    const navigate = useNavigate();
    return (
        <div className="book-wrapper" onClick={() => navigate(`/book-detail/${1}`)}>
            <img className="book-img" src="https://i.pinimg.com/736x/22/26/12/222612f04f82c25397a501595f5fee47.jpg" alt="img" />

            <div className="icon-wrapper">
                <PlayCircleOutlined className="book-icon"/>
                <MessageOutlined className="book-icon"/>
            </div>
        </div>
    )
}
