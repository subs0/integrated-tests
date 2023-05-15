import { motion } from "framer-motion"
import React, { useCallback, useEffect, useState, useMemo, useRef } from "react"
import { Slab, slim_slab_padding } from "../containers"
import { H4 } from "../elements"
import { useMyTheme, useSize$, useThrottle } from "../hooks"
import { ButtonCTA } from "./ButtonCTA"
//import throttle from "lodash.throttle"
import { Link } from "./Link"
import { MiniMenu } from "./MiniMenu"

const nav_items = [
    {
        url: "/",
        title: "Home",
        img: "/svgs/stair.svg",
    },
    {
        url: "/process",
        title: "Process",
        img: "/svgs/finance.svg",
    },
    {
        url: "/about",
        title: "About",
        img: "/svgs/about-us.svg",
    },
    {
        url: "/contact",
        title: "Contact",
        img: "/svgs/living.svg",
    },
]

const NavLink = ({ href, children }) => {
    const { colors, fontWeights, fontSizes } = useMyTheme()
    return (
        <Link
            href={href}
            css={{
                width: "auto",
                height: "auto",
                padding: "1.5rem 3rem",
                color: colors.light_5,
                fontWeight: fontWeights.bold,
                fontSize: fontSizes.sm,
            }}
        >
            {children}
        </Link>
    )
}
export const TopNav = () => {
    const size = useSize$()
    //console.log({ size })
    const [showing, setShowing] = useState(true)
    const [lastYPos, setLastYPos] = useState(0)

    //const { colors, fontSizes, fontWeights } = useMyTheme()
    //const debouncedYPos = useDebounce(lastYPos, 1000)

    //console.log({ size })

    const setScroll = () => {
        const yPos = window.scrollY
        //console.log({ yPos })
        const isScrollingUp = yPos < 100 || yPos < lastYPos
        setShowing(isScrollingUp)
        setLastYPos(yPos)
    }
    const throttled = useThrottle(setScroll, 100)

    useEffect(() => {
        window.addEventListener("scroll", throttled, false)
        return () => window.removeEventListener("scroll", throttled, false)
    }, [throttled])

    return (
        <motion.div
            //layoutId="menu"
            css={{
                height: "auto",
                width: "100%",
                position: "fixed",
                //top: 0,
                //left: 0,
                zIndex: 20,
            }}
            initial="show"
            variants={{
                show: {
                    y: 0,
                    transition: {
                        ease: "easeIn",
                    },
                },
                hide: {
                    y: -100,
                    transition: {
                        ease: "easeOut",
                    },
                },
            }}
            animate={(showing && "show") || "hide"}
        >
            {((size === "sm" || size === "xs") && <MiniMenu items={nav_items} />) || (
                <Slab padding={slim_slab_padding} bg="dark_5" direction={["row"]} align="center">
                    <div
                        css={{
                            flex: "1",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Link href="/">
                            <H4 color="light_5">AnotherStory</H4>
                        </Link>
                    </div>
                    <div
                        css={{
                            flex: "1 1 30%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <NavLink href="/process">Process</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <ButtonCTA>Contact</ButtonCTA>
                    </div>
                </Slab>
            )}
        </motion.div>
    )
}
