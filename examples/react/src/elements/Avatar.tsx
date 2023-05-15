//import React from "react"
import { useMyTheme } from "../hooks"

export const Avatar = ({
    name = "Bill Murray",
    size = "sm",
    src = "https://www.fillmurray.com/360/360",
    shape = "circle",
}) => {
    const { sizes } = useMyTheme()
    return (
        <img
            src={src}
            alt={name}
            css={{
                width: sizes[size],
                height: sizes[size],
                objectFit: "cover",
                borderRadius: shape === "circle" ? sizes[size] : 0,
            }}
        />
    )
}
