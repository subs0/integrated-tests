//import React from "react"

export const Page = ({ children, ...props }) => {
    return (
        <div
            css={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative",
            }}
        >
            {children}
        </div>
    )
}
