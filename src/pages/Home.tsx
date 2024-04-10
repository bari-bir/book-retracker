import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { BookCard } from "../components/BookCard"
import "../assets/styles/pages/home.scss"
import { useNavigate } from "react-router-dom"
import { Drawer } from "antd"
import { useEffect, useState } from "react"
import KeyWordImg from "../assets/images/keyword.png"
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined"
import { BooktrackerAPI, bookTrackerInfo, bookStatusList } from "../api/booktrackerApi"

export const Home = () => {
    const { fetchData: fetchBookTrackerData } = BooktrackerAPI("list")
    const [bookTrackerList, setBookTrackerList] = useState<{ [key: string]: bookTrackerInfo[] }>({})
    const [showDrawer, setShowDrawer] = useState<{
        status: string
        isShow: boolean
    }>({
        status: "",
        isShow: false,
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetchBookTrackerData({}).then((res) => {
            if (res.result_code === 0) {
                setBookTrackerList(res.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const statusLabel = (statusValue: string) => {
        return bookStatusList.find((bookStatus) => bookStatus.value === statusValue)?.label || ""
    }

    const statusList = Object.keys(bookTrackerList)

    return (
        <div className="home">
            {statusList.map((status, i) => (
                <div key={i}>
                    <div className="container home-header">
                        <h3 className="header-text">{statusLabel(status)}</h3>
                        <span className="header-icon" onClick={() => setShowDrawer({ status, isShow: true })}>
                            <PlusOutlined />
                        </span>
                    </div>
                    <div style={{ width: "100%" }}>
                        <Swiper slidesPerView={"auto"} spaceBetween={10}>
                            {bookTrackerList[status].map((booktracker) => (
                                <SwiperSlide key={booktracker.id}>
                                    <BookCard {...booktracker} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ))}

            <Drawer
                placement="bottom"
                title="Add a book"
                closable={false}
                onClose={() => setShowDrawer({ status: "", isShow: false })}
                open={showDrawer.isShow}>
                <div className="drawer-block">
                    <div className="block" onClick={() => navigate(`/search?status=${showDrawer.status}`)}>
                        <SearchOutlined className="icon" />
                        <p className="text">By search</p>
                    </div>
                    <div className="block" onClick={() => navigate(`/create-book/add?status=${showDrawer.status}`)}>
                        <img src={KeyWordImg} width="31" height="19" alt="keyword" className="keyWord-img" />

                        <p className="text">By input</p>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
