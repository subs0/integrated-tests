//import React from "react"
import { motion, AnimatePresence } from "framer-motion"
//import { LoremIpsum } from "react-lorem-ipsum"
import { Link } from "./Link"
//import { Header } from "./Header"
//import { items } from "../misc/data"

export function Item({ id, data, ...props }) {
    //console.log("Item:", { id, data })
    const { category, title, image } = data.find(item => item.id === id)
    //console.log(`Item: card-container-${id}`)
    return (
        <div {...props}>
            {/*<Header />*/}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ pointerEvents: "auto" }}
                className="overlay"
            >
                <Link href="../" />
            </motion.div>
            <div className="card-content-container open">
                <motion.div
                    className="card-content"
                    layoutId={`card-container-${id}`}
                    initial={{
                        borderRadius: 20,
                    }}
                >
                    <motion.div
                        className="card-image-container"
                        layoutId={`card-image-container-${id}`}
                    >
                        <img className="card-image" src={image} alt={`rando ${id}`} />
                    </motion.div>
                    <motion.div
                        className="title-container title-open"
                        layoutId={`title-container-${id}`}
                        // doubled from <List> size
                        initial={{
                            fontSize: "2rem",
                            maxWidth: "400px",
                        }}
                    >
                        <span className="category">{category}</span>
                        <h2>{title}</h2>
                    </motion.div>
                    <motion.div className="content-container" animate>
                        {/*<LoremIpsum p={2} avgWordsPerSentence={6} avgSentencesPerParagraph={4} />*/}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
