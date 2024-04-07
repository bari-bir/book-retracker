import { Image } from "antd"
import { useMemo } from "react"

type propsInfo = {
    url: string
    height?: number | string
    width?: number | string
    className?: string
    isPreview?: boolean
}

export const CloudImage = ({ url, height, width, className, isPreview = true }: propsInfo) => {
    const urlImg = useMemo(() => {
        if (url && url.indexOf("http") !== -1) {
            return url
        }
        return `${import.meta.env.VITE_API_URL}public/get_resource?name=${url}`
    }, [url])

    return (
        <Image
            className={className}
            preview={isPreview}
            src={urlImg}
            height={height}
            width={width}
            alt="image"
            fallback="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
        />
    )
}
