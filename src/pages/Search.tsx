import { useState } from "react"
import { Header } from "../components/Header"
import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Input } from "antd"
import KeyWordImg from "../assets/images/keyword.png"
import "../assets/styles/pages/search.scss"

export const Search = () => {
    const [search, setSearch] = useState<string>("")

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
                        placeholder="Search"
                        allowClear
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        // onPressEnter={() => setSearch(search)}
                        addonBefore={<SearchOutlined className="search-icon after" />}
                    />
                </ConfigProvider>
            </div>

            <div className="add-block">
                <p className="descr">Didn't find the book you are looking for?</p>
                <div className="by-input">
                    <img src={KeyWordImg} width="45" height="25" alt="keyword" className="keyWord-img" />

                    <p className="by-inputText">By input</p>
                </div>
            </div>

            <div className="book-search-wrapper">
                <div className="book-block">
                    <img className="book-img" src="https://i.pinimg.com/736x/22/26/12/222612f04f82c25397a501595f5fee47.jpg" alt="book img" />

                    <div className="book-info">
                        <h3 className="book-title">Romeo and Julia</h3>
                        <p className="book-author">Shakespeare William</p>
                    </div>
                </div>
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
