import React, { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from "react"
import { medium_slab_padding, Slab, slim_slab_padding, tall_slab_padding } from "../containers"
import { Timeline } from "../components"
import { useMyTheme } from "../hooks"
import { gap_shim, useR$ } from "../for-export"

export const WhenTitle = ({ title, subtitle, ...props }) => {
    const {
        fontSizes: { sm, md, lg, xl },
        letterSpacings: { xxs, xs, sm: lsm, lg: llg },
        fontWeights,
        colors,
    } = useMyTheme()
    return (
        <Slab bg="dark_5" align="flex-end" direction={["row"]} padding={medium_slab_padding}>
            <h3
                css={useR$({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    fontSize: [sm, md],
                    letterSpacing: lsm,
                    fontWeight: fontWeights.bold,
                    color: colors.light_5,
                    textAlign: "left",
                    alignItems: "baseline",
                    gap: [sm, md],
                    ...gap_shim([sm, md]),
                })}
            >
                <span
                    css={useR$({
                        width: "30%",
                        textAlign: "right",
                        fontSize: [md, null, lg],
                        fontWeight: fontWeights.black,
                        letterSpacing: xs,
                        color: colors.light_1,
                    })}
                >
                    {title}
                </span>
                {subtitle}
            </h3>
        </Slab>
    )
}

export const TimelineHome = ({ title, subtitle, data }) => {
    const {
        fontSizes: { sm, md, lg, xl },
        letterSpacings: { xs, md: lmd, lg: llg },
        fontWeights,
        colors,
    } = useMyTheme()
    return (
        <Slab padding={tall_slab_padding} direction={["column"]}>
            <h3
                css={useR$({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    fontSize: [sm, md],
                    //letterSpacing: lmd,
                    fontWeight: fontWeights.bold,
                    color: colors.light_5,
                    textAlign: "left",
                    alignItems: "baseline",
                    lineHeight: "0.6",
                    gap: [sm, md],
                    ...gap_shim([sm, md], false, true),
                })}
            >
                <span
                    css={useR$({
                        width: "27%",
                        textAlign: "right",
                        fontSize: [md, null, lg],
                        fontWeight: fontWeights.black,
                        letterSpacing: xs,
                        color: colors.light_1,
                    })}
                >
                    {title}
                </span>
                {subtitle}
            </h3>
            <Timeline milestones={data} />
        </Slab>
    )
}
