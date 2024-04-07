import { Routes, Route } from "react-router-dom"
import { App as AntApp } from "antd"
import { Fuse } from "./components/Fuse"
import { Home } from "./pages/Home"
import { TabbarMenu } from "./components/TabbarMenu"
import "./assets/styles/global.scss"
import { Notes } from "./pages/Notes"
import { Statistics } from "./pages/Statistics"
import { Search } from "./pages/Search"
import { CreateBook } from "./pages/CreateBook"
import { BookDetail } from "./pages/BookDetail"

function App() {
    return (
        <AntApp message={{ top: 30 }}>
            <div style={{ width: "100%" }}>
                <Fuse>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/create/book" element={<CreateBook />} />
                        <Route path="/book-detail/:id" element={<BookDetail />} />
                    </Routes>
                    <div style={{ height: 73 }} />
                    <TabbarMenu />
                </Fuse>
            </div>
        </AntApp>
    )
}

export default App
