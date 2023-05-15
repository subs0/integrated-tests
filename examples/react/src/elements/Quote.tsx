//import React from "react"
import { gap_shim, nudge_size, useR$ } from "../for-export"
import { useMyTheme } from "../hooks"
import { borderWidths, fontWeights } from "../theme"
import { Avatar } from "./Avatar"

export const Quote = ({ text, color = "dark_3", size = ["sm"] }) => {
    const { fontSizes, fonts, fontWeights, colors } = useMyTheme()

    return (
        <div
            css={{
                //width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingBottom: "4rem",
            }}
        >
            <span
                css={{
                    height: "8rem",
                    width: "8rem",
                    overflow: "visible",
                    //fontStyle: "italic",
                    fontWeight: fontWeights.bold,
                    fontSize: "20rem",
                    letterSpacing: 0,
                    lineHeight: 0.8,
                    textAlign: "left",
                    color: colors["light_1"],
                }}
            >
                &ldquo;
            </span>
            <blockquote
                css={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <p
                    css={useR$({
                        fontFamily: fonts.serif,
                        fontStyle: "italic",
                        fontSize: size.map(s => fontSizes[s]),
                        color: colors[color],
                        lineHeight: 1.3,
                        whiteSpace: "pre-wrap",
                    })}
                >
                    {text}
                </p>
            </blockquote>
        </div>
    )
}

const Quotee = ({ quotee, location, align = "right", color = "dark_5" }) => {
    const { fontSizes, fontWeights, space, colors, letterSpacings, lineHeights } = useMyTheme()
    return (
        <div
            css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: space.xs,
                ...gap_shim(space.xs, false, true),
            }}
        >
            <p
                css={{
                    fontSize: fontSizes.md,
                    fontWeight: fontWeights.bold,
                    color: colors[color],
                    width: "100%",
                    textAlign: align as "right",
                    letterSpacing: letterSpacings.sm,
                    lineHeight: lineHeights.xs,
                }}
            >
                {quotee}
            </p>
            <p
                css={{
                    fontSize: fontSizes.xs,
                    fontWeight: fontWeights.medium,
                    color: colors[color],
                    width: "100%",
                    textAlign: align as "right",
                }}
            >
                {location}
            </p>
        </div>
    )
}

const Right = ({ color }) => (
    <g transform="translate(-35.6 -32.2)">
        <path
            d="m36.4 33v17.7l17.7-17.7"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.59"
        />
    </g>
)

const Left = ({ color }) => (
    <g transform="translate(-35.6 -32.2)">
        <path
            d="m54.1 33v17.7l-17.7-17.7"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.59"
        />
    </g>
)

const BubbleBase = ({ color = "light_5", align = "right" }) => (
    <svg
        width="19.3px"
        height="19.3px"
        version="1.1"
        viewBox="0 0 19.3 19.3"
        xmlns="http://www.w3.org/2000/svg"
    >
        {align === "right" ? <Right color={color} /> : <Left color={color} />}
    </svg>
)

const flip = array => array.reduceRight((a, c) => a.concat(c), [])

const QuoteLine = ({ size = "sm", color = "dark_5", align = "right" }) => {
    const { sizes, space, colors } = useMyTheme()
    const [downsize, downsized] = nudge_size(sizes)(size, -1)
    const borders = {
        borderTopWidth: "2px",
        borderBottomWidth: "0",
        borderLeftWidth: "0",
        borderRightWidth: "0",
        borderStyle: "dashed",
        borderColor: colors[color],
    }
    const components = [
        <div
            key="bl-1"
            css={{
                flex: 7,
                width: 1,
                ...borders,
            }}
        />,
        <BubbleBase key="bb-2" color={colors[color]} align={align} />,
        <div
            key="bl-2"
            css={{
                width: downsized,
                ...borders,
            }}
        />,
    ]

    return (
        <div
            css={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
            }}
        >
            {align === "right" ? components : flip(components)}
        </div>
    )
}
export const AvatarQuote = ({
    text = "Once upon a midnight, dreary. While I pondered, weak and weary...",
    name = "Bill Murray",
    location = "Birmingham, AL",
    size = "sm",
    quote_size = ["sm"],
    src = "https://www.fillmurray.com/360/360",
    shape = "circle",
    align = "right",
    color = "light_3",
}) => {
    const { sizes, space } = useMyTheme()
    const { sm } = space
    const [downsize, downsized] = nudge_size(sizes)(size, -1)
    const quotee = [
        <Quotee key="quotee1" location={location} quotee={name} align={align} color={color} />,
        <Avatar key="avatar1" name={name} src={src} size={size} shape={shape} />,
        <span
            key="spaceholder1"
            css={{
                width: downsized,
            }}
        />,
    ]

    return (
        <div
            css={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                //width: "1",
            }}
        >
            <Quote text={text} color={color} size={quote_size} />
            <QuoteLine align={align} color={color} />
            <div
                css={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: align === "right" ? "flex-end" : "flex-start",
                    alignSelf: align === "right" ? "end" : "start",
                    gap: space[size],
                    ...gap_shim(sm, false, true),
                }}
            >
                {align === "right" ? quotee : flip(quotee)}
            </div>
        </div>
    )
}
