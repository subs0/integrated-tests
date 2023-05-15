//import React from "react"
import { Link, FloodButton, Timeline, TLItem } from "../components"
//import { StyledAs, one_border } from "../for-export"

const nav_items = [
    {
        title: "Financing Options",
        url: "./financing",
    },
    {
        title: "The Process",
        url: "./process",
    },
    {
        title: "About",
        url: "./about",
    },
]

const timeline_items = [
    {
        time: "Week 0",
        icon: "map-pin-line",
        title: "Site Inspection",
        description:
            "The first step is to determine if your home is a good candidate based on several key factors: foundation, basement, stair location(s), other factors.",
    },
    {
        time: "Week 1",
        icon: "cube",
        title: "Programming",
        description:
            "Decide what style of home best fits your personal preferences, neighborhood and the scale of the homes around you (context, vernacular, style, colors/materials).",
    },
    {
        time: "Week 2",
        icon: "swatches",
        title: "Design Development",
        description: "Design development of your second-story addition and amenities.",
    },
    {
        time: "Weeks 3-5",
        icon: "users-three",
        title: "Bidding / Value Engineering",
        description:
            "Receive estimates for construction from local construction teams. Meet with pre-vetted Contactor’s. Discuss cost and value. ",
    },
    {
        time: "Weeks 6-8",
        icon: "handshake",
        title: "Financing",
        description:
            "Visit with your local mortgage brokers to see if a pre-appraised construction loan can work for you. Evaluate financing options and get preapproval.",
    },
    {
        time: "Weeks 9-10",
        icon: "pencil-line",
        title: "Construction Documents / Permitting",
        description:
            "Construction drawings in accordance with local covenants to ensure compliance with all codes.",
    },
    {
        time: "Weeks 10-32",
        icon: "paint-roller",
        title: "Construction",
        description:
            "During construction, cleaning crews are brought in weekly to ensure any fugitive dust/debris are kept out of the primary living space. Construction happens during business hours.",
    },

    {
        time: "Week 33",
        icon: "house",
        title: "Clean Up",
        description: "Make your new space ready to wear.",
    },
]

export const Home = ({ data }) => {
    //console.log({ data })
    return (
        <>
            <FloodButton items={nav_items} />
            <Timeline milestones={timeline_items} />
            <Link href="./magic-move">Magic Move</Link>
        </>
    )
}
