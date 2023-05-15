import React, { useRef } from "react"
import { _NAVIGATE } from "../context"
import { run$, API, registerCMD } from "@-0/browser"
//import { registerCMD, run$ } from "@-0/spool"
import { URL2obj, obj2URL } from "@-0/utils"
//import { CMD, DOM_NODE, URL, URL_FULL } from "@-0/keys"
import { motion } from "framer-motion"
//import styled from "@emotion/styled"

//const getScrollPos = () => ({
//    [API.SCROLL_X]: window.scrollX,
//    [API.SCROLL_Y]: window.scrollY,
//})

// console.log({ _NAVIGATE })

// TODO: @-0/browser
//                                                 d8    d8b
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__ !Y88!
//  d888  88b  Y88b/   888  888b d888   i 888     888    Y8Y
//  8888__888   Y88b   888  8888 8888   | 888     888     8
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888     e
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/  "8"
//                     888
//

export const getRelativePath = href => {
    const h = window.location.href
    const { [API.URL_PATH]: href_path } = URL2obj(href)
    const { [API.URL_PATH]: wind_path } = URL2obj(h)
    const here = x => x === "."
    const move = x => x === ".."
    return href_path.some(here) // relative to current dir
        ? wind_path.concat(href_path[1] ? href_path[1] : []).join("/")
        : href_path.some(move) // reltative navigate up the dir chain
        ? [
              "", // prepend to give space for root-relative /
              ...wind_path
                  .slice(0, -href_path.filter(move).length)
                  .concat(href_path.filter(x => !move(x))),
          ].join("/")
        : href // absolute href
}

export const Link = ({ href, children, ...props }) => {
    const me = useRef()

    const r_path = getRelativePath(href)

    //console.log({ href, r_path })
    return (
        <a
            ref={me}
            {...props}
            onClick={e => {
                e.preventDefault()
                //console.log(e)
                run$.next({
                    ..._NAVIGATE,
                    [API.CMD_ARGS]: {
                        [API.URL_FULL]: e.currentTarget.href,
                        [API.DOM_NODE]: me.current,
                        [API.POP_STATE]: { [API.PUSH_STATE]: document.referrer },
                    },
                })
            }}
            href={r_path}
        >
            {children}
        </a>
    )
}

//export const Link = styled
