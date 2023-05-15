//import React from "react"
//import { items } from "../misc/data"
import { Link } from "./Link"
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { Header } from "./Header"

export function Card({ id, title, category, theme, image }) {
    //console.log(`Card: card-container-${id}`)
    //const me = useRef()
    return (
        <li className={`card ${theme}`}>
            <div className="card-content-container">
                <motion.div
                    className="card-content"
                    key={`card-container-${id}`}
                    layoutId={`card-container-${id}`}
                    initial={{ borderRadius: 20 }}
                    // 🤔 this is needed to trigger magic-move on first route 🤷
                    exit={{
                        opacity: 0,
                    }}
                >
                    <motion.div
                        className="card-image-container"
                        layoutId={`card-image-container-${id}`}
                        key={`card-image-container-${id}`}
                    >
                        <img className="card-image" src={image} alt={`rando ${id}`} />
                    </motion.div>
                    <motion.div
                        className="title-container"
                        key={`title-container-${id}`}
                        layoutId={`title-container-${id}`}
                        // half of <Item> size
                        initial={{
                            fontSize: "1rem",
                            maxWidth: "200px",
                        }}
                    >
                        <span className="category">{category}</span>
                        <h2>{title}</h2>
                    </motion.div>
                </motion.div>
            </div>
            <Link href={`./${id}`} className={`card-open-link`} />
        </li>
    )
}
