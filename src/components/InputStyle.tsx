import React from "react"

export const InputStyle = ({ labelText, children }: { labelText: string; children: React.ReactNode }) => {
    return (
        <div style={styles.inputBlock}>
            <p style={styles.inputTitle}>{labelText}</p>
            {children}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    inputBlock: {
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-start",
        marginBottom: 11,
    },
    inputTitle: {
        fontSize: 17,
        fontWeight: "600",
        marginLeft: 5,
    },
}
