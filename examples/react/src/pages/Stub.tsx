import { motion } from "framer-motion"
import { Link } from "../components"

export const Stub = ({ data }) => (
    <motion.div>
        <pre
            style={{
                color: "gray",
            }}
        >
            {JSON.stringify(data, null, 4)}
        </pre>
        <Link href="magic-move">Go Somewhere</Link>
    </motion.div>
)
