/**
 * @module commands/head
 */
import {
    URL_DATA,
    CMD_SUB$,
    CMD_ARGS,
    CMD_WORK,
    DOM_HEAD,
    HD_TITL,
    HD_ICON,
    //HD_META,
    OG_TYPE,
    OG_DESC,
    OG_IMGU,
    OG_IMGW,
    OG_IMGH,
    HeadData,
    DOM_BODY,
    ICommand,
} from "@-0/keys"

import { Err_missing_props, diff_keys, xKeyError } from "@-0/utils"

const HD_META = "meta"

const setFavicon = href => {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement("link")
    link.type = "image/x-icon"
    link.rel = "shortcut icon"
    link.href = href
    document.getElementsByTagName("head")[0].appendChild(link)
}

const getHeadProp = prop => () => document.head.querySelector(`meta[property="${prop}"]`)
// TODO currently throws CORS warning
const meta = prop => (getHeadProp(prop)() && getHeadProp(prop)().content) || null

const defalt_cfg = {
    [HD_META]: {
        "og:title": document.title,
        "og:image": meta("og:image"),
        "og:image:width": meta("og:image:width"),
        "og:image:height": meta("og:image:height"),
        "og:description": meta("og:description"),
        "og:type": meta("og:type"),
    },
    [HD_TITL]: document.title,
    //"https://github.com/loganpowell/ac/raw/master/assets/favicon.ico",
    [HD_ICON]: document.querySelector("link[rel*='icon']"),
}

declare var document: any

const replaceMeta = (obj: any = defalt_cfg) => {
    Object.entries(obj).forEach(([key, val]) => {
        try {
            return {
                [HD_TITL]: () => {
                    document.title = val
                },
                [HD_META]: () => {
                    Object.entries(val).forEach(([prop, content]) => {
                        if (getHeadProp(prop)()) getHeadProp(prop)().content = content
                    })
                },
                [HD_ICON]: () => setFavicon(val),
            }[key]()
        } catch (e) {
            console.warn(e)
        }
    })
}

const conformToHead = ({
    [HD_TITL]: title = defalt_cfg[HD_TITL],
    [OG_DESC]: description = defalt_cfg[HD_META]["og:description"],
    [OG_IMGU]: img_url = defalt_cfg[HD_META]["og:image"],
    [OG_IMGH]: img_height = defalt_cfg[HD_META]["og:image:height"],
    [OG_IMGW]: img_width = defalt_cfg[HD_META]["og:image:width"],
    [OG_TYPE]: type = defalt_cfg[HD_META]["og:type"],
    [HD_ICON]: favicon = defalt_cfg[HD_ICON],
}) => ({
    [HD_META]: {
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
        "og:image": img_url,
    },
    [HD_TITL]: title,
    [HD_ICON]: favicon,
})

interface apiURL {
    [URL_DATA: string]: {
        [DOM_HEAD: string]: HeadData
    }
}

const IH = "_INJECT_HEAD"
const err_str = `Error in \`${IH}\` Command \`${CMD_ARGS}\`
${URL_DATA}.${DOM_HEAD} props:`

export const injectHead = (args: apiURL) => {
    if (!args || !Object.keys(args).length) return
    const data = args[URL_DATA]
    // if no match URL__ROUTE Task sends -> URL_DATA: null
    const send = data || { [DOM_HEAD]: {} }
    const head = send[DOM_HEAD]
    const reqs = {
        [URL_DATA]: {
            [DOM_HEAD]: head,
        },
    }

    if (head) {
        const knowns_map = {
            [HD_ICON]: "favicon resource URL for the page",
            [HD_TITL]: "title of the page",
            [OG_DESC]: "open graph description",
            [OG_IMGU]: "open graph image resource URL for the page",
            [OG_IMGH]: "open graph image height (pixels)",
            [OG_IMGW]: "open graph image width (pixels)",
            [OG_TYPE]: "open graph content type (e.g., 'website')",
        }
        const knowns = Object.keys(knowns_map)
        const [unknowns, unknown_map] = diff_keys(knowns, head)
        //console.log({ unknowns })

        if (unknowns.length > 0) {
            console.warn(
                xKeyError(err_str, unknown_map, unknowns, 0, false),
                `\nAcceptable prop keys for ${DOM_HEAD} are:`
            )
            const line = "---------------- | -----------------\n"
            const key = "key              | description       \n"
            const entries = Object.entries(knowns_map).reduce((a, [k, v]) => {
                const space = " ".repeat(16 - k.length)
                return a.concat(`${k}` + space + " | " + v + "\n")
            }, "")
            console.warn(line + key + line + entries + line)
            return
        }
        return replaceMeta(conformToHead(head))
    }
    console.warn(Err_missing_props(IH, reqs))
    return
}

export const cmd_inject_head: ICommand = {
    [CMD_SUB$]: IH,
    [CMD_ARGS]: acc => ({ [URL_DATA]: acc[URL_DATA] }),
    [CMD_WORK]: injectHead,
}
