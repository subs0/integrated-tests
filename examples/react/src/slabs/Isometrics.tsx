import React, { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from "react"
import { motion, useViewportScroll } from "framer-motion"
import { Interpolation } from "@emotion/react"
import { Slab, slim_slab_padding } from "../containers"
import { useInView } from "react-intersection-observer"
import { useMyTheme, useBbox } from "../hooks"
import { CTX } from "../context"
import { useR$, Styles } from "../for-export"
import { colors, lineHeights, Theme } from "../theme"

// trick to make responsive square image
// source: https://spin.atomicobject.com/2015/07/14/css-responsive-square/
export const responsive_img_css = (zIndex, display = "block") => ({
    width: "47%",
    "&:after": {
        content: `""`,
        display,
        paddingBottom: "100%",
        //alignSelf: "start",
    },
    zIndex: zIndex,
})

export const BoldSlab = ({ title, subtitle, ...props }) => {
    const {
        fontSizes: { sm, md, lg, xl },
        letterSpacings: { xxs, xs, sm: lsm, md: lmd },
        fontWeights,
        colors,
    } = useMyTheme()
    return (
        <Slab bg="light_5" align="flex-end" direction={["row"]}>
            <span
                css={{
                    width: "48%",
                }}
            />
            <h3
                css={useR$({
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: [sm, md],
                    letterSpacing: lmd,
                    fontWeight: fontWeights.bold,
                    color: colors.dark_5,
                    textAlign: "left",
                })}
            >
                <span
                    css={useR$({
                        fontSize: [lg, null, xl],
                        fontWeight: fontWeights.black,
                        letterSpacing: [xs, null, xxs],
                        color: colors.dark_3,
                    })}
                >
                    {title}
                </span>
                {subtitle}
            </h3>
        </Slab>
    )
}

export const IsoLiving = ({ src, tagline, zIndex = 1 }) => {
    //const { scrollY } = useViewportScroll()
    const { ref, inView, entry } = useInView({
        threshold: 1,
    })
    const [rect, setRect] = useState(null)

    //console.log({ entry })
    useLayoutEffect(() => {
        //console.log({ ref })
        setRect(entry?.target?.getBoundingClientRect())
    }, [ref, entry])

    const { height } = rect || { height: 100 }
    //const { size$ } = useContext(CTX)

    //console.log({ inView, entry, rect })

    const theme = useMyTheme()
    const {
        colors: { dark_5 },
        fonts,
        fontWeights,
        fontSizes: { xs, sm, md },
        lineHeights,
    } = theme

    return (
        <Slab
            myRef={ref}
            align="center"
            bg="light_5"
            padding={slim_slab_padding}
            direction={["row"]}
        >
            <motion.img
                //layoutId={src}
                src={src}
                alt={tagline}
                css={responsive_img_css(zIndex)}
                initial="out"
                animate={inView ? "in" : "out"}
                variants={{
                    out: {
                        y: -height / 1.7,
                        transition: {
                            delay: 2,
                            ease: "easeInOut",
                        },
                    },
                    in: {
                        y: 0,
                        transition: {
                            delay: 0.5,
                            ease: "easeInOut", // [0.6, 0.01, -0.05, 0.95]
                            //delayChildren: 0.5,
                        },
                    },
                }}
            />
            <p
                css={useR$({
                    flex: "1",
                    color: colors.dark_5,
                    fontFamily: fonts.serif,
                    fontWeight: fontWeights.normal,
                    lineHeight: lineHeights.md,
                    fontSize: [sm, null, md],
                })}
            >
                {tagline}
            </p>
        </Slab>
    )
}

export const IsoSimple = ({
    src,
    alt,
    zIndex = 1,
    href = "",
    display = "block",
    children = null,
}) => {
    const {
        colors: { dark_5 },
        fonts,
        fontWeights,
        fontSizes: { xs, sm, md },
    } = useMyTheme()
    return (
        <Slab
            align="center"
            bg="light_5"
            padding={[["sm", "sm"], ["sm", "lg"], ["sm", "15%"], null, ["sm", "20%"]]}
            direction={["row"]}
        >
            {(href && (
                <a href={href} css={responsive_img_css(zIndex, display)}>
                    <img src={src} alt={alt} style={{ maxWidth: "100%", alignSelf: "start" }} />
                </a>
            )) || <img src={src} alt={alt} css={responsive_img_css(zIndex)} />}
            {children}
        </Slab>
    )
}

export const IsoStair = ({ src, tagline, zIndex = 1 }) => {
    const { ref, inView, entry } = useInView({
        threshold: 0.8,
    })
    const [rect, setRect] = useState(null)

    useEffect(() => {
        setRect(entry?.target?.getBoundingClientRect())
    }, [entry])
    const { height } = rect || { height: 100 }
    //const { size$ } = useContext(CTX)

    //console.log({ inView, entry, rect })

    const theme = useMyTheme()
    const {
        colors: { dark_5 },
        fonts,
        fontWeights,
        fontSizes: { xs, sm, md },
        lineHeights,
    } = theme

    return (
        <Slab
            myRef={ref}
            align="center"
            bg="light_5"
            padding={[["sm", "sm"], ["sm", "lg"], ["sm", "15%"], null, ["sm", "20%"]]}
            direction={["row"]}
        >
            <div css={{ ...responsive_img_css(zIndex), position: "relative" }}>
                <img
                    //layoutId={src}
                    src={src}
                    alt={tagline}
                    css={{
                        width: "100%",
                        "&:after": {
                            content: `""`,
                            display: "block",
                            paddingBottom: "100%",
                        },
                        zIndex: zIndex,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
                <motion.img
                    src="/svgs/staircase.svg"
                    alt="stair"
                    css={{
                        width: "100%",
                        "&:after": {
                            content: `""`,
                            display: "block",
                            paddingBottom: "100%",
                        },
                        zIndex: 20,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    initial="out"
                    animate={inView ? "in" : "out"}
                    variants={{
                        out: {
                            y: -height / 3,
                            transition: {
                                delay: 2,
                                ease: "easeInOut",
                            },
                        },
                        in: {
                            y: 0,
                            transition: {
                                delay: 0.5,
                                ease: "easeInOut", // [0.6, 0.01, -0.05, 0.95]
                                //delayChildren: 0.5,
                            },
                        },
                    }}
                />
            </div>
            <p
                css={useR$({
                    flex: "1",
                    color: colors.dark_5,
                    fontFamily: fonts.serif,
                    fontWeight: fontWeights.normal,
                    lineHeight: lineHeights.md,
                    fontSize: [sm, null, md],
                })}
            >
                {tagline}
            </p>
        </Slab>
    )
}
