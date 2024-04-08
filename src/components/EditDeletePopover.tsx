import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

type propsInfo = {
    onEdit: () => void
    onDelete: () => void
}

export const EditDeletePopover = ({ onDelete, onEdit }: propsInfo) => {
    return (
        <div style={stylesEditDeletePopover.popoverWrapper}>
            <div style={stylesEditDeletePopover.popoverBlock} onClick={() => onEdit()}>
                <p style={stylesEditDeletePopover.popoverText}>Edit</p>
                <EditOutlined style={stylesEditDeletePopover.icon} />
            </div>
            <div style={{ ...stylesEditDeletePopover.popoverBlock, borderBottom: "none" }} onClick={() => onDelete()}>
                <p style={stylesEditDeletePopover.popoverText}>Delete</p>
                <DeleteOutlined style={stylesEditDeletePopover.icon} />
            </div>
        </div>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const stylesEditDeletePopover: { [key: string]: React.CSSProperties } = {
    popoverWrapper: {
        borderRadius: 13,
        padding: "13px 0",
        height: 114,
        width: 240,
    },
    popoverBlock: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        borderBottom: "0.5px solid rgba(60, 60, 67, 0.36)",
    },
    popoverText: {
        paddingLeft: 16,
        fontWeight: 400,
        fontSize: 17,
        color: "#000",
    },
    icon: {
        paddingRight: 16,
        fontSize: 24,
        color: "#000",
    },
}
