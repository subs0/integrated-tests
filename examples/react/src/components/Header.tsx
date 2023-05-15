import * as React from "react"
//import { Avatar } from "react-lorem-ipsum"
import { Link } from "./Link"

export const Header = () => (
    <header>
        <span className="date">Thursday, August 8th</span>
        <h1>
            <Link href="/">Home</Link>
        </h1>
        <div className="avatar">{/*<Avatar />*/}</div>
    </header>
)
