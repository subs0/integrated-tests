import React, { useContext } from "react"
//import { motion } from "framer-motion"
import { YoutubeEmbed } from "../components"
import {
    Slab,
    tall_slab_padding,
    xtall_slab_padding,
    slim_slab_padding,
    medium_slab_padding,
} from "../containers"

const [a, b, c, d, e] = slim_slab_padding
const mobile_first_padding = [["0%", "0%"]]
export const YouTubeSlab = ({ embedId, yt = true, title = "AnotherStory" }) => {
    return (
        <Slab align="center" justify="center" padding={mobile_first_padding}>
            <YoutubeEmbed embedId={embedId} yt={yt} title={title} />
        </Slab>
    )
}
