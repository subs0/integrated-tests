import React, { useContext, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { URL2obj } from "@-0/browser"
import { CTX } from "../context"
import { Item, Card } from "../components"

export const Magic = ({ data }) => {
    //const me = useRef()
    return (
        <div
            style={{
                flex: "1 1 100%",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                //display: "block",
            }}
        >
            <ul className="card-list">
                {data.map(card => {
                    return <Card key={card.id} {...card} />
                })}
            </ul>
        </div>
    )
}
