/**
 * @module commands/head
 */
import {
    URL_DATA,
    CMD_SUB$,
    CMD_ARGS,
    CMD_WORK,
    DOM_HEAD,
    HEAD_TTL,
    HEAD_ICN,
    HEAD_TYP,
    OG_DISCR,
    OG_IMG_U,
    OG_IMG_W,
    OG_IMG_H
} from "@-0/keys"
import { Err_missing_props } from "@-0/utils"
import { registerCMD } from "@-0/spool"

const setFavicon = href => {
    let link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement("link")
    link.type = "image/x-icon"
    link.rel = "shortcut icon"
    link.href = href
    document.getElementsByTagName("head")[0].appendChild(link)
}

const getHeadProp = prop => () => document.head.querySelector(`meta[property="${prop}"]`)
// TODO currently throws CORS warning
const meta = prop => (getHeadProp(prop)() && getHeadProp(prop)().content) || null

const defalt_cfg = {
    meta: {
        "og:title": document.title,
        "og:image": meta("og:image"),
        "og:image:width": meta("og:image:width"),
        "og:image:height": meta("og:image:height"),
        "og:description": meta("og:description"),
        "og:type": meta("og:type")
    },
    title: document.title,
    //"https://github.com/loganpowell/ac/raw/master/assets/favicon.ico",
    favicon: document.querySelector("link[rel*='icon']")
}

declare var document: any

const replaceMeta = (obj: any = defalt_cfg) => {
    Object.entries(obj).forEach(([ key, val ]) => {
        try {
            return {
                HEAD_title: () => {
                    document.title = val
                },
                HEAD_meta: () => {
                    Object.entries(val).forEach(([ prop, content ]) => {
                        if (getHeadProp(prop)()) getHeadProp(prop)().content = content
                    })
                },
                HEAD_favicon: () => setFavicon(val)
            }[key]()
        } catch (e) {
            console.warn(e)
        }
    })
}

const conformToHead = ({
    title = defalt_cfg.title,
    description = defalt_cfg.meta["og:description"],
    img_url = defalt_cfg.meta["og:image"],
    img_height = defalt_cfg.meta["og:image:height"],
    img_width = defalt_cfg.meta["og:image:width"],
    favicon = defalt_cfg.favicon,
    type = defalt_cfg.meta["og:type"]
}) => ({
    HEAD_meta: {
        /**
     * og:url can tell scrapers to ignore the page and
     * scrape this instead. Would save scraping the whole
     * page and might be friendlier for `jsdom`
     */
        // "og:url": history.state.URL,
        "og:title": title,
        "og:type": type,
        "og:description": description,
        "og:image:width": img_width,
        "og:image:height": img_height,
        "og:image": img_url
    },
    HEAD_title: title,
    HEAD_favicon: favicon
})

interface apiURL {
    [URL_DATA: string]: {
        [DOM_HEAD: string]: {
            [HEAD_TTL]?: any
            [OG_DISCR]?: any
            [OG_IMG_U]?: any
            [OG_IMG_W]?: any
            [OG_IMG_H]?: any
            [HEAD_ICN]?: any
            [HEAD_TYP]?: any
        }
    }
}

// FIXME: add title, description, etc. to @-0/keys constants
// TODO: add title, description, etc. to @-0/keys constants
export const INJECT_HEAD: any = registerCMD({
    [CMD_SUB$]: "_INJECT_HEAD",
    [CMD_ARGS]: acc => ({ [URL_DATA]: acc[URL_DATA] }),
    [CMD_WORK]: ({
        [URL_DATA]: { [DOM_HEAD]: { title, description, img_url, img_height, img_width, favicon, type } }
    }: apiURL) => replaceMeta(conformToHead({ title, description, img_url, img_height, img_width, favicon, type }))
})
