import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { BookCard } from "../components/BookCard"
import "../assets/styles/pages/home.scss"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home container">
            <div className="home-header">
                <h3 className="header-text">Reading</h3>
                <span className="header-icon" onClick={() => navigate("/create/book")}>
                    <PlusOutlined />
                </span>
            </div>

            <div>
                <Swiper slidesPerView={"auto"} spaceBetween={30}>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}
