import React, { useContext } from "react"
import { Slab } from "../containers"
import { IconBullet, BulletList } from "../components"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { CTX } from "../context"

export const H1 = ({ color = "dark_5", children }) => {
    const {
        fontSizes: { xxl, xl, lg, md, sm },
        letterSpacings: { xxs, xs, md: _md },
        fontWeights: { black },
        colors,
        fonts,
    } = useMyTheme()
    return (
        <h1
            css={useR$({
                color: colors[color],
                fontWeight: black,
                letterSpacing: xs,
                fontSize: [lg, xl],
                lineHeight: [1],
                fontFamily: "Poppins",
                //WebkitTextStroke: "1px",
                //WebkitTextStrokeColor: colors.dark_3,
                //textShadow: `0 0 5px ${colors.dark_5}`,
                //WebkitTextFillColor: "white",
            })}
        >
            {children}
        </h1>
    )
}
export const H2 = ({ color = "light_5", font = "sans", weight = "black", children }) => {
    const {
        fontSizes: { xxl, xl, lg, md },
        letterSpacings: { xxs, xs, md: _md },
        fontWeights,
        colors,
        fonts,
    } = useMyTheme()

    return (
        <h2
            css={useR$({
                color: colors[color],
                fontWeight: fontWeights[weight],
                letterSpacing: [_md, null, null, xxs],
                fontSize: [lg, null, null, xl],
                lineHeight: [1],
                fontFamily: fonts[font],
            })}
        >
            {children}
        </h2>
    )
}

export const H3 = ({
    color = "light_5",
    font = "sans",
    width = "100%",
    invert = false,
    weight = "black",
    children,
}) => {
    const {
        colors,
        fontSizes: { lg, md },
        letterSpacings: { xs, sm, md: lmd },
        fontWeights,
        fonts,
    } = useMyTheme()
    return (
        <h3
            css={useR$({
                width,
                fontWeight: fontWeights[weight],
                fontSize: [md, null, lg],
                letterSpacing: [lmd, sm],
                lineHeight: 1,
                fontFamily: fonts[font],
                ...((invert && { mixBlendMode: "screen", color: colors[color] }) || {
                    color: colors[color],
                }),
            })}
        >
            {children}
        </h3>
    )
}
export const H4 = ({ color = "light_5", font = "sans", children }) => {
    const {
        colors,
        fontSizes: { xxl, xl, lg, md, sm },
        letterSpacings: { xxs, xs, sm: lsm, md: lmd },
        fonts,
    } = useMyTheme()
    return (
        <h4
            css={useR$({
                color: colors[color],
                fontSize: [sm, md],
                letterSpacing: [lmd, lsm],
                lineHeight: 1.5,
                fontFamily: fonts[font],
            })}
        >
            {children}
        </h4>
    )
}
