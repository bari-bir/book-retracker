import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined"
import { Header } from "../components/Header"
import "../assets/styles/pages/notes.scss"
import { Popover } from "antd"
import { EditDeletePopover } from "../components/EditDeletePopover"

export const Notes = () => {
    return (
        <div className="container notes">
            <Header title="Notes" isGoBack={false} />

            <div className="notes-wrapper">
                <div className="notes-block">
                    <h3 className="note-title">Romeo and Julia</h3>
                    <p className="note-descr">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eveniet, voluptas officiis iusto nemo adipisci aspernatur
                        iure aut quo nihil tempore beatae, quaerat error, commodi optio aliquam facilis aperiam eum!
                    </p>

                    <Popover content={EditDeletePopover}  placement="bottomLeft" trigger="click">
                        <MoreOutlined className="more-icon" />
                    </Popover>
                </div>
            </div>
        </div>
    )
}
