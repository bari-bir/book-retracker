import { LoadingOutlined } from "@ant-design/icons"
import { useAppSelector } from "../hooks/useStore"

export const Fuse = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useAppSelector((state) => state.mainSlice)

    return (
        <>
            {isLoading && <LoadingOutlined style={styles.loadingIcon} />}
            {children}
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    loadingIcon: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -20,
        zIndex: 100,
        transform: "translate(-50%, -50%)",
        fontSize: 40,
        animation: "spin 1s linear infinite",
    },
}
