import React, { useContext } from "react"
import { motion } from "framer-motion"
import { Timeline, Milestone, Milestones } from "../components"
import { Slab, tall_slab_padding, xtall_slab_padding } from "../containers"

export const TimelineProcess = ({ milestones }: { milestones: Milestones }) => {
    return (
        <Slab>
            <Timeline milestones={milestones} />
        </Slab>
    )
}
