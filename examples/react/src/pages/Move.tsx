import React, { useContext, useState } from "react"
import { AnimatePresence, usePresence } from "framer-motion"
import { URL2obj, API } from "@-0/browser"
import { CTX } from "../context"
import { Item } from "../components"

export const Move = ({ data }) => {
    //const [ID, setID] = useState()
    //const [isPresent, safeToRemove] = usePresence()
    //console.log({ isPresent, safeToRemove })
    //console.log({ focusItemData: data })
    //const { user, setUser } = useContext(CTX)
    //const imageHasLoaded = true
    const { [API.URL_PATH]: PATH } = URL2obj(window.location.href)

    const [, id] = PATH
    //if (id) setID(id)
    //console.log({ PATH, ID })
    return <Item id={id} data={data} key="item" />
}
