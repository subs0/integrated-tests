//import React from "react"
import { Slab, xtall_slab_padding } from "../containers"
import { Avatar, AvatarQuote } from "../elements"
import { useMyTheme } from "../hooks"
import { lineHeights } from "../theme"

const long_quote =
    "In the first three weeks of being able to be in the added square footage, we were able to easily welcome out of town friends with 3 kids... Our kids have been able to retreat to their own spaces upstairs when they need some time away and read books together without having to be in the higher traffic areas of our home. We could not be more grateful for what the added space has added to our days as a family."

const short_quote = "Once upon a midnight, dreary. While I pondered, weak and weary..."

export const BannerQuote = ({
    quote = long_quote,
    name = "Rachel Buie",
    location = "Birmingham, AL",
    size = "sm",
    src = "/images/rachel-buie.jpg",
    shape = "circle",
    align = "left",
    topline = "Build Another Story without Moving",
    //topline = "The Buies' Story",
    banner_img = "https://anotherstorypub.s3.amazonaws.com/Buie.jpg",
}) => {
    const { fontWeights, fontSizes, letterSpacings, colors } = useMyTheme()
    const position = {
        position: "relative",
        top: 0,
        left: 0,
    }
    return (
        <Slab
            bg={"none"}
            align={["flex-start", null, "flex-end"]}
            img={banner_img}
            //padding={xtall_slab_padding}
            full_height={true}
        >
            <h3
                css={{
                    fontFamily: "Poppins",
                    fontSize: fontSizes.lg,
                    fontWeight: fontWeights.black,
                    letterSpacing: letterSpacings.sm,
                    //color: colors.light_3,
                    lineHeight: lineHeights.sm,
                    marginTop: "10rem",
                    flex: 1,
                    width: 1,
                    WebkitTextStroke: "1px",
                    WebkitTextStrokeColor: colors.light_3,
                    WebkitTextFillColor: "transparent",
                    alignSelf: align === "right" ? "end" : "start",
                }}
            >
                {topline}
            </h3>
            <AvatarQuote
                text={quote}
                name={name}
                location={location}
                size={size}
                src={src}
                align={align}
                shape={shape}
                quote_size={["xs", "sm"]}
            />
        </Slab>
    )
}
