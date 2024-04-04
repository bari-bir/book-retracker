import { BookOutlined } from "@ant-design/icons"
import "../assets/styles/components/tabbarMenu.scss"
import { NavLink, useLocation } from "react-router-dom"

export const TabbarMenu = () => {
    const location = useLocation()
    return (
        <div className="tabbar">
            <NavLink to="/" className={({ isActive }) => (isActive || location.pathname.indexOf("book-exchange") !== -1 ? "active-link" : "")}>
                <BookOutlined className="menu-icon" />
            </NavLink>
            {/* <NavLink to="/favorute" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <HeartOutlined className="menu-icon" />
            </NavLink>
            <NavLink to="/create-announcement/add" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <PlusCircleOutlined className="menu-icon" />
            </NavLink>
            <NavLink to="/message" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <MessageOutlined className="menu-icon" />
            </NavLink>
            <NavLink to="/request-annoucement" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <BookOutlined className="menu-icon" />
            </NavLink> */}
        </div>
    )
}
