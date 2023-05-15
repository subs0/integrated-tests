import React, { useEffect, useLayoutEffect, useState, useContext, useCallback, useRef } from "react"
import { motion, AnimatePresence, useCycle, useViewportScroll, usePresence } from "framer-motion"
import { letterSpacings, Theme, theme } from "../theme"
import { moicons, H2, H3 } from "../elements"
import { Card } from "./Cards"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { Link } from "./Link"
import { ButtonCTA } from "./ButtonCTA"

//const responsive_bg = make_responsive(["red", "grey", "green", "darkgrey"])

const MotionButtonCentered = ({ children, ...props }) => (
    <motion.button
        css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            cursor: "pointer",
            position: "fixed",
            top: "3.5rem",
            right: "3rem",
            width: "3rem",
            height: "3rem",
        }}
        {...props}
    >
        {children}
    </motion.button>
)

// doesn't work with animated icon 🤷 ⏲ 💢
//const MotionButtonCentered = ({ children, ...props }) => {
//    return (
//        <Responsive
//            as={motion.button}
//            style={{
//                label: "menu-button",
//                display: "flex",
//                alignItems: "center",
//                justifyContent: "center",
//                zIndex: 100,
//                cursor: "pointer",
//                position: "fixed",
//                top: "3rem",
//                right: "3rem",
//                width: "3rem",
//                height: "3rem",
//            }}
//            {...props}
//        >
//            {children}
//        </Responsive>
//    )
//}

export const MenuButton = ({ toggle, isOpen }) => {
    //console.log({ isOpen, props })
    return (
        //@ts-ignore
        <MotionButtonCentered
            onClick={() => {
                //console.log("menu-button toggle clicked")
                toggle(!isOpen)
            }}
            animate={isOpen ? "open" : "closed"}
        >
            <moicons.menu open="open" closed="closed" />
        </MotionButtonCentered>
    )
}

const Circumscribed = ({ style, children, ...props }) => {
    const {
        colors: { dark_5, light_5 },
    } = useMyTheme()
    //console.log({ theme })
    return (
        <motion.div
            layoutId="flood"
            css={{
                position: "fixed",
                resize: "both",
                zIndex: 10,
                boxShadow: `0 0 0 200vmax ${light_5}`,
                clipPath: "circle(72%)",
                cursor: "pointer",
                backgroundColor: light_5,
                // 🔥 do not touch this 👇 (else flickering on iphone)
                // fix courtesy of: https://stackoverflow.com/a/17967969
                // notes: https://muffinman.io/blog/ios-safari-scroll-position-fixed/
                WebkitTransform: "translate3D(0,0,0)",
                ...style,
            }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

const Logo = ({ children }) => {
    const {
        colors,
        fontSizes: { lg, md },
        letterSpacings: { xs, sm, md: lms },
        fonts,
    } = useMyTheme()

    return (
        <Link
            css={useR$({
                fontFamily: "Poppins",
                alignItems: "flex-start",
                lineHeight: 1,
                fontSize: ["2.5rem", "3rem"],
                fontWeight: 900,
                letterSpacing: letterSpacings.md,
                WebkitTextStroke: "1px",
                WebkitTextStrokeColor: colors.light_5,
                WebkitTextFillColor: colors.dark_5,
                mixBlendMode: "screen",
                //margin: 0,
                marginTop: ["0.25rem", "0rem"],
                padding: "0.5rem",
            })}
            href="/"
        >
            {children}
        </Link>
    )
}
const MenuClosed = ({ trigger, ...props }) => {
    const {
        colors: { dark_5, light_5 },
    } = useMyTheme()

    return (
        <div
            css={{
                boxSizing: "border-box",
                height: "auto",
                //zIndex: 10,
                width: "75%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                top: "2.5rem",
                left: "2.5rem",
                //top: "1.75rem",
                //left: "2rem",
            }}
        >
            <Logo>AnotherStory</Logo>
            {/*<Link
                href="/contact"
                css={useR$({
                    fontFamily: "Inter",
                    //alignItems: "flex-start",
                    //lineHeight: 1,
                    fontSize: ["1.5rem", "2rem"],
                    fontWeight: 500,
                    //letterSpacing: letterSpacings.lg,
                    color: light_5,
                    //height: "100%",
                    marginTop: ["1.25rem", "0.5rem"],
                    padding: ["0.5rem 1.5rem", "1rem 3rem"],
                    backgroundColor: dark_5,
                    borderRadius: ["0.5rem", "1rem"],
                })}
            >
                Contact
            </Link>*/}
            <Circumscribed
                style={{
                    width: "3rem",
                    height: "3rem",
                    top: "3rem",
                    right: "3rem",
                }}
                onClick={() => trigger(true)}
                {...props}
            >
                {null}
            </Circumscribed>
        </div>
    )
}

// TODO: export to @-0/browser/utils
const getFloodDims = () => {
    const x = window.visualViewport.width
    const y = window.visualViewport.height

    const dim = x > y ? x : y
    const right = x > y ? 0 : (x - y) / 2

    return {
        width: dim,
        height: dim,
        right,
        x,
        y,
    }
}

const ease = {
    //type: "spring",
    //damping: 100,
    //mass: 2,
    //stiffness: 1000,
    type: "ease",
    ease: [0.6, 0.01, -0.05, 0.95],
}

const MenuItems = ({ children, ...props }) => (
    <motion.ul
        {...props}
        css={{
            boxSizing: "border-box",
            width: "100%",
            height: "100vh",
            display: "flex",
            overflow: "hidden",
            padding: "90px 5%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {children}
    </motion.ul>
)

const MenuOpen = ({ trigger, children, ...props }) => {
    //const { size } = useContext(CTX)
    //const { scrollY } = useViewportScroll()
    const closeMe = useCallback(e => trigger(false), [trigger])
    useEffect(() => {
        //console.log({ scrollY })
        document.addEventListener("scroll", closeMe)
        return () => document.removeEventListener("scroll", closeMe)
    }, [trigger, closeMe])

    const { height, right, width } = getFloodDims()
    //console.log({ height, right, width })
    return (
        <Circumscribed
            {...props}
            //key="open"
            //size={size}
            style={{
                width,
                height,
                top: 0,
                right,
                //overflow: "hidden",
            }}
            // 🧐 used for child orchestration only
            variants={{
                open: {
                    transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                        //when: "beforeChildren",
                    },
                },
                closed: {
                    transition: {
                        staggerChildren: 0.1,
                        staggerDirection: -1,
                        //when: "afterChildren",
                    },
                },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => trigger(false)}
        >
            <MenuItems>{children}</MenuItems>
        </Circumscribed>
    )
}

const MoCard = ({ ch, ...props }) => {
    const { x } = getFloodDims()
    const { url, title, img } = ch
    //console.log({ x })
    return (
        <Link
            href={url}
            css={{
                width: "100%",
            }}
        >
            <motion.li
                //adding layout prop screws up 1st mount animation 🤷
                //layout // <- 🔥
                css={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                variants={{
                    open: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            ...ease,
                        },
                    },
                    closed: {
                        x,
                        opacity: 0,
                        transition: {
                            ...ease,
                        },
                    },
                }}
                {...props}
            >
                <Card img={img} href={url} title={title} alt={title} />
            </motion.li>
        </Link>
    )
}
const _items = items => items.map((ch, i) => <MoCard key={"cl-" + i} ch={ch} i={i} />)

export const MiniMenu = ({ items, ...props }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div style={{ position: "relative" }}>
            <MenuButton toggle={setMenuOpen} isOpen={menuOpen} />
            <AnimatePresence
                //onExitComplete={() => {
                //    console.log(
                //        "AnimatedPresence:",
                //        menuOpen ? "MenuClosed" : "MenuOpen",
                //        "unmounted!"
                //    )
                //}}
                // enable exit transitions to happen before unmount/remount
                exitBeforeEnter={true}
            >
                {(menuOpen && (
                    <MenuOpen trigger={setMenuOpen} key="open">
                        {_items(items)}
                    </MenuOpen>
                )) || <MenuClosed trigger={setMenuOpen}>{_items(items)}</MenuClosed>}
            </AnimatePresence>
        </div>
    )
}
