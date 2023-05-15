import React, { createContext, useState, useMemo } from "react"
import { registerRouterDOM, log$, trace } from "@-0/browser"
import { router } from "../router"
import { useSize$ } from "../hooks"

// TODO: EXPORT TO @-0/react
//                                                 d8
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__
//  d888  88b  Y88b/   888  888b d888   i 888     888
//  8888__888   Y88b   888  8888 8888   | 888     888
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/
//                     888
export const _NAVIGATE = registerRouterDOM(router)

//log$.subscribe(trace("logging:"))

//console.log({ _NAVIGATE })
export const CTX = createContext(null)

export const MyProvider = ({ children }) => {
    // TODO: session storage goes here
    const [user, setUser] = useState(null)
    const size$ = useSize$(null)
    //const [page, setPage] = useState(null)

    const mem = useMemo(
        () => ({
            user,
            setUser,
            size$,
            //setPage,
        }),
        [user, setUser, size$ /*, page, setPage */]
    )

    return <CTX.Provider value={mem}>{children}</CTX.Provider>
}
