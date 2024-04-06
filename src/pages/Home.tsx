import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { BookCard } from "../components/BookCard"
import "../assets/styles/pages/home.scss";

export const Home = () => {
    return (
        <div className="home container">
            <div className="home-header">
                <h3 className="header-text">Reading</h3>
                <span className="header-icon">
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
