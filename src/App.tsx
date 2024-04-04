import { Routes, Route } from "react-router-dom"
import { App as AntApp } from "antd"
import { Fuse } from "./components/Fuse"
import { Home } from "./pages/Home"
import { TabbarMenu } from "./components/TabbarMenu"

function App() {
    return (
        <AntApp message={{ top: 30 }}>
            <div style={{ width: "100%" }}>
                <Fuse>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                    <div style={{ height: 73 }} />
                    <TabbarMenu />
                </Fuse>
            </div>
        </AntApp>
    )
}

export default App
