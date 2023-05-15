//import React from "react"
import { one_border, useR$, FontSize, responsive_padding, gap_shim } from "../for-export"
import { useMyTheme } from "../hooks"
import { theme } from "../theme"

type SlabProps = {
    gap: FontSize
    bg: keyof typeof theme.colors
}

export const slim_slab_padding = [["sm", "sm"], ["sm", "lg"], ["sm", "15%"], null, ["sm", "20%"]]
export const medium_slab_padding = [["md", "sm"], ["md", "lg"], ["md", "15%"], null, ["md", "20%"]]
export const tall_slab_padding = [["lg", "sm"], ["xl", "lg"], ["xl", "15%"], null, ["xl", "20%"]]
export const xtall_slab_padding = [["xl", "sm"], ["xl", "lg"], ["xxl", "15%"], null, ["xxl", "20%"]]

export const Slab = ({
    padding = tall_slab_padding,
    direction = ["column", null, "row"],
    align = "flex-start" || [],
    bg = "dark_5",
    gap = ["md", "lg"],
    full_height = false,
    blur = false,
    justify = "flex-start",
    img = null,
    myRef = null,
    children = null,
    ...props
}) => {
    const { colors, space } = useMyTheme()
    const { sm, md, lg } = space
    const pads = responsive_padding(space, padding)

    //console.log({ pads })
    return (
        <section
            ref={myRef}
            css={useR$({
                boxSizing: "border-box",
                flexShrink: 0,
                width: "100%",
                ...((!full_height && { height: "auto" }) || { minHeight: "100vh" }),
                display: "flex",
                flexDirection: direction,
                position: "relative",
                alignItems: align,
                padding: pads,
                backgroundColor: colors[bg],
                justifyContent: justify,
                gap: gap.map(g => space[g]),
                ...(img && {
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${img})`,
                    backgroundSize: "cover",
                }),
                ...(blur && {
                    backdropFilter: "blur(6px) invert(40%)",
                }),
                ...gap_shim(sm, false, true),
                //...gap_shim(gap.map(g => space[g])),
                //overflow: "visible",
                ...props,
            })}
        >
            {children}
        </section>
    )
}
