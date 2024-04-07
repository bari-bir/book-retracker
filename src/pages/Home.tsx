import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { BookCard } from "../components/BookCard"
import "../assets/styles/pages/home.scss"
import { useNavigate } from "react-router-dom"
import { Drawer } from "antd"
import { useState } from "react"
import KeyWordImg from "../assets/images/keyword.png"
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined"

export const Home = () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const navigate = useNavigate()
    return (
        <div className="home container">
            <div className="home-header">
                <h3 className="header-text">Reading</h3>
                <span className="header-icon" onClick={() => setShowDrawer(true)}>
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

            <Drawer placement="bottom" title="Add a book" closable={false} onClose={() => setShowDrawer(false)} open={showDrawer}>
                <div className="drawer-block">
                    <div className="block" onClick={() => navigate("/search")}>
                        <SearchOutlined className="icon"/>
                        <p className="text">By search</p>
                    </div>
                    <div className="block" onClick={() => navigate("/create/book")}>
                        <img src={KeyWordImg} width="31" height="19" alt="keyword" className="keyWord-img" />

                        <p className="text">By input</p>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
