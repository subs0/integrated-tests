import React from "react"
import { Avatar } from "../elements"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { gap_shim } from "../for-export"

export const Bio = ({ title, full_name, bio, img, color = "dark_5", size = "sm" }) => {
    const { colors, fontSizes, fonts, fontWeights, space } = useMyTheme()
    const size$ = useSize$()
    return (
        <div
            css={useR$({
                flex: "1 1 40rem",
                height: "auto",
                display: "flex",
                //margin: space.sm,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflow: "hidden",
                gap: space.sm,
                ...gap_shim(space.sm),
            })}
        >
            <div
                css={{
                    width: "auto" /* 125px */,
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflow: "visible",
                }}
            >
                <Avatar size={size} src={img} />
            </div>
            <div
                css={{
                    flex: 1,
                    width: 1,
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflow: "hidden",
                    gap: space.xs,
                    ...gap_shim(space.xs),
                }}
            >
                <p
                    css={{
                        height: "auto" /* 14px */,
                        flexShrink: 0,
                        width: "100%",
                        fontFamily: fonts.mono,
                        color: colors[color],
                        fontSize: fontSizes.sm,
                        letterSpacing: 0,
                    }}
                >
                    {title}
                </p>
                <p
                    css={{
                        height: "auto" /* 14px */,
                        flexShrink: 0,
                        width: "100%",
                        color: colors[color],
                        fontSize: fontSizes.sm,
                        fontWeight: fontWeights.black,
                        letterSpacing: 0,
                        //  lineHeight: 1.2,
                    }}
                >
                    {full_name}
                </p>
                <p
                    css={{
                        height: "auto" /* 14px */,
                        flexShrink: 0,
                        width: "100%",
                        fontFamily: fonts.serif,
                        color: colors[color],
                        fontSize: fontSizes.sm,
                        //  lineHeight: 1.2,
                    }}
                >
                    {bio}
                </p>
            </div>
        </div>
    )
}
