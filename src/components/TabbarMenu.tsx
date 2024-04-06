import { BarChartOutlined, BookOutlined, EditOutlined, FileSearchOutlined } from "@ant-design/icons"
import "../assets/styles/components/tabbarMenu.scss"
import { NavLink, useLocation } from "react-router-dom"

export const TabbarMenu = () => {
    const location = useLocation()
    return (
        <div className="tabbar">
            <NavLink to="/" className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <BookOutlined className="menu-icon" />
            </NavLink>
            <NavLink to="/notes" className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <EditOutlined className="menu-icon" />
            </NavLink>
            <NavLink
                to="/statistics"
                className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <BarChartOutlined className="menu-icon"  />
            </NavLink>
            <NavLink
                to="/search"
                className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <FileSearchOutlined className="menu-icon"  />
            </NavLink>
        </div>
    )
}
