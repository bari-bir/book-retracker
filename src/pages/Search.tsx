import { useRef, useState } from "react"
import { Header } from "../components/Header"
import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Input, InputRef } from "antd"
import KeyWordImg from "../assets/images/keyword.png"
import "../assets/styles/pages/search.scss"
import { BookAPI } from "../api/bookApi"
import { bookInfo } from "../api/booktrackerApi"
import { CloudImage } from "../components/CloudImage"
import { useNavigate } from "react-router-dom"

export const Search = () => {
    const navigate = useNavigate()
    const { fetchData: fetchBookData } = BookAPI("list")
    const [search, setSearch] = useState<string>("")
    const ref = useRef<InputRef>(null);
    const [dataList, setDataList] = useState<bookInfo[]>([])

    const onSearch = () => {
        ref.current?.blur();
        fetchBookData({
            title: search,
        }).then((res) => {
            if (res.result_code === 0) {
                setDataList(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }

    return (
        <div className="container search">
            <Header isGoBack={false} title="Search the book" />

            <div>
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                ...styles.searchInput,
                            },
                        },
                    }}>
                    <Input
                        ref={ref}
                        placeholder="Search"
                        allowClear
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onPressEnter={() => onSearch()}
                        addonBefore={<SearchOutlined className="search-icon after" />}
                    />
                </ConfigProvider>
            </div>

            <div className="add-block" onClick={() => navigate("/create-book/add")}>
                <p className="descr">Didn't find the book you are looking for?</p>
                <div className="by-input">
                    <img src={KeyWordImg} width="45" height="25" alt="keyword" className="keyWord-img" />

                    <p className="by-inputText">By input</p>
                </div>
            </div>

            <div className="book-search-wrapper">
                {dataList.length ? (
                    dataList.map((item) => (
                        <div className="book-block" key={item.id} onClick={() => navigate(`/book-detail/${item.id}`)}>
                            <CloudImage url={item.imageLink} className="book-img" width={53} height={76} />

                            <div className="book-info">
                                <h3 className="book-title">{item.title}</h3>
                                <p className="book-author">{item.author}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <SearchOutlined className="search-icon" />
                )}
            </div>
        </div>
    )
}

const styles = {
    searchInput: {
        colorBgContainer: "#f2f2ee",
        activeBorderColor: "transparent",
        addonBg: "#f2f2ee",
        paddingBlock: 9,
        paddingInline: 10,
        hoverBorderColor: "transparent",
        activeShadow: "transparent",
    },
}
