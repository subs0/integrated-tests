//import React from "react"
import { gap_shim, useR$ } from "../for-export"

import { useMyTheme } from "../hooks"

export const TextPanel = ({
    align = "flex-start",
    width = ["100%"],
    gap = ["sm", "md"],
    children,
    paddingBottom = "sm",
}) => {
    const { space, fontSizes } = useMyTheme()
    const { sm, md } = space
    return (
        <div
            css={useR$({
                width,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: align,
                justifyContent: "flex-start",
                gap: gap.map(g => space[g] || null),
                ...gap_shim(md),
                //paddingBottom: space[paddingBottom] || null,
            })}
        >
            {children}
        </div>
    )
}
