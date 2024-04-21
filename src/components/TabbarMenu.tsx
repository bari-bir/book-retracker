import { BookOutlined, EditOutlined, FileSearchOutlined } from "@ant-design/icons"
import "../assets/styles/components/tabbarMenu.scss"
import { NavLink, useLocation } from "react-router-dom"

export const TabbarMenu = () => {
    const location = useLocation()

    const routeIndexInfo: { [key: string]: number } = {
        "/": 0,
        "/notes": 1,
        "/search": 2,
    }

    const getTransform = (index: number) => {
        return 8 + index  + (index * window.screen.width) / 3
    }

    return (
        <div className="tabbar">
            <div className="tabbar-animation" style={{ transform: `translateX(${getTransform(routeIndexInfo[location.pathname])}px)` }}></div>

            <NavLink to="/" className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <div className="tabbar-block">
                    <BookOutlined className="menu-icon" />
                    <p className="tabbar-text">Your books</p>
                </div>
            </NavLink>
            <NavLink to="/notes" className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <div className="tabbar-block">
                    <EditOutlined className="menu-icon" />
                    <p className="tabbar-text">Notes</p>
                </div>
            </NavLink>
            {/* <NavLink
                to="/statistics"
                className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <BarChartOutlined className="menu-icon"  />
            </NavLink> */}
            <NavLink to="/search" className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <div className="tabbar-block">
                    <FileSearchOutlined className="menu-icon" />
                    <p className="tabbar-text">Search</p>
                </div>
            </NavLink>
        </div>
    )
}
