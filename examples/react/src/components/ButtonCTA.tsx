import { useEffect } from "react"
import { Link } from "./Link"
import { useMyTheme } from "../hooks"
import { motion } from "framer-motion"

export const ButtonCTA = ({ children }) => {
    const { colors, fontSizes, fontWeights } = useMyTheme()
    return (
        <Link
            href="/contact"
            css={{
                width: "auto",
                height: "auto",
                padding: "1.5rem 3rem",
                backgroundColor: colors?.light_5,
                color: colors?.dark_5,
                borderRadius: "1rem",
                fontWeight: fontWeights?.bold,
                fontSize: fontSizes?.sm,
            }}
        >
            {children || "Contact"}
        </Link>
    )
}

const dropIn = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
        y: "0",
        opacity: 1,
        transition: { duration: 0.1, type: "spring", damping: 100, stiffness: 500 },
    },
    exit: { y: "100vh", opacity: 0 },
}
const Backdrop = ({ children, onClick }) => {
    return (
        <motion.div
            css={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                background: "#000000e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            initial={{
                opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    )
}

export const Modal = ({ handleClose, children }) => {
    //useEffect(() => {
    //console.log({ scrollY })
    //document.addEventListener("scroll", handleClose)
    //return () => document.removeEventListener("scroll", handleClose)
    //}, [handleClose])
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={e => e.stopPropagation()}
                css={{
                    width: "clamp(50%, 700px, 90%)",
                    height: "min(50%, 300px)",
                    margin: "auto",
                    padding: "4rem",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                }}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {children}
            </motion.div>
        </Backdrop>
    )
}
export const ModalButton = ({ setModalOpen, children }) => {
    const { colors, fontSizes, fontWeights } = useMyTheme()
    return (
        <button
            css={{
                width: "auto",
                height: "auto",
                padding: "1.5rem 3rem",
                backgroundColor: colors?.light_5,
                color: colors?.dark_5,
                borderRadius: "1rem",
                fontWeight: fontWeights?.bold,
                fontSize: fontSizes?.sm,
                cursor: "pointer",
            }}
            onClick={setModalOpen}
        >
            {children || "Contact"}
        </button>
    )
}
