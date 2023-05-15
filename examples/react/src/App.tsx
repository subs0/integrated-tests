/* eslint-disable react/react-in-jsx-scope */
//import React from "react"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion"
//import { Header, Item, List } from "./components"
import { View } from "./view"
import { MyProvider } from "./context"
import { theme, Theme } from "./theme"
import { log$ } from "@-0/browser"

import { out$ } from "@-0/spool"
import { trace } from "@thi.ng/rstream"
import { ThemeProvider } from "@emotion/react"
import { TopNav } from "./components"

// 🧐 inspect
//log$.subscribe(trace("log$:"))

//console.log("all subs:", out$.topics.entries())

export default function App() {
    return (
        <div className="container">
            <ThemeProvider theme={theme}>
                <MyProvider>
                    <AnimateSharedLayout type="crossfade">
                        <TopNav />

                        <View />
                    </AnimateSharedLayout>
                </MyProvider>
            </ThemeProvider>
        </div>
    )
}
