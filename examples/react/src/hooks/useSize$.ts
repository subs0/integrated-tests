import { useState, useEffect } from "react"
import { fromDOMEvent, trace, debounce, Stream } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import { bps } from "../theme"
import { generateBreakpoint$ } from "../for-export"

//breakpoint$.subscribe(trace("breakpoint$:"))
//
//                                                 d8    d8b
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__ !Y88!
//  d888  88b  Y88b/   888  888b d888   i 888     888    Y8Y
//  8888__888   Y88b   888  8888 8888   | 888     888     8
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888     e
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/  "8"
//                     888
//
// TODO: @-0/react
//console.log({ bps })
const breakpoint$ = generateBreakpoint$(bps)

export const useSize$ = (init = null) => {
    const [size, setSize] = useState(init)
    const b$ = breakpoint$
    const size$ = b$.map(
        (x: string) => {
            if (x !== size) {
                setSize(x)
            }
            return false
        },
        // prettier-ignore
        {
            id: "size$-" + ( b$.subs.length 
                ? parseInt( b$.subs[b$.subs.length - 1].id.split("-")[1] ) + 1 
                : 0
            ),
        }
    )

    useEffect(() => {
        //console.log("clearing useSize handler", size$.id)
        return () => {
            size$.unsubscribe()
        }
    }, [size, size$])

    //console.log("creating useSize handler", size$.id)

    //console.log("number of subscriptions:", b$.subs.length)
    return size
}
