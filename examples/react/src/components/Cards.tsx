//import React from "react"
//import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Link } from "./Link"
import { ratio } from "../theme"
import { useMyTheme } from "../hooks"

const Wrap = ({ children }) => (
    <div
        css={{
            display: "flex",
            overflow: "hidden",
            width: "100%",
            maxWidth: "100vw",
            //minHeight: "200px",
            marginBottom: "35px",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            //borderRadius: "10px",
            //boxShadow: "14px 14px 40px 0 rgba(118, 126, 173, 0.1)",
        }}
    >
        {children}
    </div>
)

const width = 40
const Image = ({ src, alt }) => {
    //console.log("image:", { src })
    return (
        <motion.img
            layoutId={src}
            css={{
                height: width / ratio.gum + "rem",
                width: "100%",
                objectFit: "cover",
                //filter: "brightness(50%)",
                //alignSelf: "right",
            }}
            src={src}
            alt={alt}
        />
    )
}

const Title = ({ href, children }) => {
    const { fonts, fontSizes, colors, letterSpacings, fontWeights, space } = useMyTheme()
    return (
        <p
            css={{
                fontFamily: "Poppins",
                fontSize: fontSizes.lg,
                //padding: space.sm,
                paddingLeft: space.md,
                paddingBottom: space.sm,
                letterSpacing: letterSpacings.md,
                //fontWeight: fontWeights.bold,

                color: colors.dark_5,
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: 10,
                width: "100%",
                WebkitTextStroke: "2px",
                WebkitTextStrokeColor: colors.dark_5,
                WebkitTextFillColor: "transparent",
            }}
            //href={href}
        >
            {children}
        </p>
    )
}

export const Card = ({ img, href, title, alt, ...props }) => {
    return (
        <Wrap {...props}>
            <Title href={href}>{title}</Title>
            <Image src={img} alt={alt} />
        </Wrap>
    )
}
