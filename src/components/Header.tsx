import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined"

type propsInfo = {
    isGoBack?: boolean
    title?: string
}

export const Header = ({ isGoBack = true, title = "" }: propsInfo) => {
    return (
        <div style={styles.header}>
            {isGoBack && <LeftOutlined style={styles.iconBack}  />}
            <p style={styles.headerText}>{title}</p>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        margin: "25px 0",
        display: "flex",
        alignItems: "center",
        gap: 15,
    },
    iconBack: {
        fontSize: 28,
        color: "#000",
    },
    headerText: {
        fontWeight: 400,
        fontSize: 26,
        color: "#000",
    },
}
