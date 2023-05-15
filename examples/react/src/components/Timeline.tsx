import React, { useContext } from "react"
import { motion } from "framer-motion"
import { Link, MiniMenu, Icon } from "../components"
import { CTX } from "../context"
import { one_border, useR$ } from "../for-export"
import { useMyTheme } from "../hooks"
import { useInView } from "react-intersection-observer"
import { Theme } from "../theme"

const DotStem = ({ height }) => (
    <span
        aria-hidden
        css={useR$({
            width: "auto",
            height,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
        })}
    ></span>
)

const TimelineRow = ({ children, height }) => (
    <div
        css={{
            width: "100%",
            height,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "stretch",
            overflow: "hidden",
        }}
    >
        {children}
    </div>
)

const TLTime = ({ color, children, ...props }) => (
    <div
        css={useR$({
            width: "27%",
            height: "auto",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            wordBreak: "break-word",
            fontWeight: 300,
            fontFamily: '"Fira Code", serif',
            color,
            fontSize: ["1.6rem", "2rem", "2.5rem"],
            letterSpacing: "-0.08rem",
            paddingTop: ["0.5rem", ".9rem", "0.7rem", "1.2rem"],
            lineHeight: 1.2,
            textAlign: "right",
        })}
        {...props}
    >
        {children}
    </div>
)
const convertToKebabCase = string => {
    return string.replace(/\s+/g, "-").toLowerCase()
}

export const TLItem = ({
    time,
    icon,
    title,
    description,
    borders = true,
    color = "light_5",
    ...props
}: {
    time?: string
    icon?: string
    title?: string
    description?: string
    borders?: boolean
    color?: string
}) => {
    const { ref, inView, entry } = useInView({
        threshold: 0.8,
    })
    const { size } = useContext(CTX)
    const {
        colors,
        fontSizes: { xs, sm, md },
    } = useMyTheme()
    return (
        <li
            id={convertToKebabCase(title)}
            ref={ref}
            css={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflow: "hidden",
            }}
            //initial="out"
            //animate={inView ? "in" : "out"}
            //variants={{
            //    out: {
            //        opacity: 0,
            //    },
            //    in: {
            //        opacity: 1,
            //        transition: {
            //            //delay: 0.4,
            //            delayChildren: 0.1,
            //        },
            //    },
            //}}
        >
            {/*TOP ROW*/}
            <TimelineRow height="58px">
                <span
                    aria-hidden
                    css={{
                        width: "30%",
                        height: "100%",
                        ...one_border("Right", 1, colors[color]),
                    }}
                />
                <span
                    aria-hidden
                    css={{
                        width: "70%",
                        height: "100%",
                        ...one_border("Left", 1, colors[color]),
                    }}
                />
            </TimelineRow>

            <div
                css={{
                    label: "middle-row",
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <TLTime color={colors[color]} size={size}>
                    {time}
                </TLTime>
                <div
                    aria-hidden
                    css={{
                        label: "tl-dot-block",
                        width: "6%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        overflow: "hidden",
                        marginLeft: "auto",
                    }}
                >
                    <DotStem height={["1rem", "1.3rem", "1.2rem", "1.7rem"]} />
                    <div
                        css={useR$({
                            label: "tl-dot",
                            width: ["1rem", "1.5rem", "2rem"],
                            height: ["1rem", "1.5rem", "2rem"],
                            overflow: "hidden",
                            borderRadius: "1rem",
                            border: "3px solid",
                            borderColor: colors[color],
                        })}
                    />
                </div>
                <h4
                    css={useR$({
                        label: "tl-title",
                        height: "auto",
                        width: "65%",
                        overflow: "hidden",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        color: colors[color],
                        fontSize: ["2.4rem", "3rem", "3.5rem", "4.5rem"],
                        fontWeight: 800,
                        paddingTop: [".1rem", ".3rem", ".2rem", "0rem"],
                        letterSpacing: "-0.08rem",
                        lineHeight: 1.2,
                        textAlign: "left",
                    })}
                >
                    {title}
                </h4>
            </div>
            {description && icon && (
                <TimelineRow height="100%">
                    <div
                        aria-hidden
                        css={{
                            label: "tl-bottom-left",
                            width: "30%",
                            ...(borders && one_border("Right", ".1rem", colors[color])),
                        }}
                    >
                        <div
                            css={{
                                label: "tl-icon",
                                padding: "2rem 3.5rem 4rem 0rem",
                                width: "100%",
                                height: "100%",
                                fontWeight: 300,
                                color: colors[color],
                                //fontSize: "2rem",
                                letterSpacing: "-0.8px",
                                lineHeight: "1",
                                textAlign: "right",
                            }}
                        >
                            <Icon type={icon} weight="thin" size="lg" />
                        </div>
                    </div>
                    <div
                        css={{
                            label: "tl-bottom-right",
                            width: "70%",
                            height: "auto",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            padding: "20px 30px 0px 30px",
                            overflow: "visible",
                            ...(borders && one_border("Left", ".1rem", colors[color])),
                        }}
                    >
                        <p
                            css={useR$({
                                label: "tl-description",
                                height: "auto ",
                                width: "100%",
                                overflow: "hidden",
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                                wordBreak: "break-word",
                                fontWeight: 200,
                                color: colors[color],
                                fontSize: [xs, sm],
                                letterSpacing: "-0.8px",
                                lineHeight: "1.3",
                                textAlign: "left",
                            })}
                        >
                            {description || ""}
                        </p>
                    </div>
                </TimelineRow>
            )}
        </li>
    )
}

export type Milestone = {
    time?: string
    icon?: string
    title?: string
    description?: string
}
export type Milestones = Milestone[]

export const Timeline = ({
    milestones,
    color = "light_5",
}: {
    milestones: Milestones
    color?: string
}) => {
    //console.log({ milestones })
    return (
        <ul
            css={{
                label: "stack",
                height: "auto",
                flexShrink: 0,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflow: "hidden",
            }}
        >
            {milestones.map(({ time, icon, title, description }, idx, { length }) => {
                return (
                    <TLItem
                        key={"timeline_item" + idx}
                        color={color}
                        time={time}
                        icon={icon}
                        title={title}
                        description={description}
                        borders={idx + 1 < length ? true : false}
                    />
                )
            })}
        </ul>
    )
}
