import { $store$ } from "@-0/browser"
import { useState, useMemo, useLayoutEffect, useEffect } from "react"
import { Cursor } from "@thi.ng/atom"
//import { log } from "../utils/data"

// TODO: EXPORT TO @-0/react
//
//                                                 d8    d8b
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__ !Y88!
//  d888  88b  Y88b/   888  888b d888   i 888     888    Y8Y
//  8888__888   Y88b   888  8888 8888   | 888     888     8
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888     e
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/  "8"
//                     888
//
export const createCursor =
    (atom = $store$, log = false) =>
    (path, uid = `cursor-${Date.now()}`, init = null): [any, any] => {
        const [state, setState] = useState(init)
        // 1. recreated every re-render of parent component
        const cursor = useMemo(() => new Cursor(atom, path), [path])

        cursor.addWatch(uid, (id, bfr, aft) => {
            if (log) console.log(`${uid} cursor triggered:`, { id, bfr, aft })
            setState(aft)
            // 2. needs to be released after every triggered change
            cursor.release()
        })

        return [state, setState]
    }

export const useCursor = createCursor()
