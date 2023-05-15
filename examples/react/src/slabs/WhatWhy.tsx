import React, { useContext } from "react"
import { Slab } from "../containers"
import { IconBullet, BulletList, TitledBullets } from "../components"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { fontSizes } from "../theme"
import { CTX } from "../context"

const data = {
    What: {
        subtitle: "are the benefits of adding a story?",
        bullets: [
            { icon: "image", point: "Retain open space" },
            { icon: "house", point: "Improve curb appeal" },
            { icon: "currency-dollar", point: "Larger home @ lower tax base" },
            { icon: "sun", point: "More natural light" },
            { icon: "wind", point: "Increased energy efficiency" },
            { icon: "trend-up", point: "Increased value" },
        ],
    },
    Why: {
        subtitle: "would you choose AnotherStory?",
        bullets: [
            { icon: "package", point: "No moving required" },
            { icon: "currency-dollar", point: "No short term renting" },
            { icon: "map-pin", point: "No disruption to commutes" },
            { icon: "face-mask", point: "Dustless renovation*" },
            { icon: "eye", point: "Privacy protected" },
            { icon: "smiley-nervous", point: "Less risk to possessions" },
        ],
    },
}

export const WhatWhy = () => {
    return (
        <Slab bg="dark_5">
            <TitledBullets title="What" subtitle={data.What.subtitle} bullets={data.What.bullets} />
            <TitledBullets title="Why" subtitle={data.Why.subtitle} bullets={data.Why.bullets} />
        </Slab>
    )
}
