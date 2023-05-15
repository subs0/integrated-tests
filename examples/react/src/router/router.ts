import { EquivMap } from "@thi.ng/associative"
import {
    $store$,
    run$,
    registerRouterDOM,
    API,
    URL2obj,
    SET_STATE,
    DOMnavigated$,
    registerCMD,
    LOG_PROP,
    cmd_inject_head,
} from "@-0/browser"

import Airtable from "airtable"
import { DOM_BODY, DOM_HEAD, URL_DATA, URL_PAGE, Router } from "@-0/keys"
import { getIn } from "@thi.ng/paths"
//import dotenv from "dotenv"
//import fetch from "node-fetch"
//import { items } from "../misc/data"
import { Home, Contact, Process, About } from "../pages"
//import { Magic, Move, Stub } from "../pages"
import { isEmpty } from "../utils"

//dotenv.config()

const apiKey = import.meta.env.VITE_AIRTABLE

//console.log({ apiKey })
Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey,
})

const base = Airtable.base("appK6q2gwVCCc0gmF")

const getItems = async () => {
    const res: any[] = await new Promise((resolve, reject) => {
        let acc = []
        base("dummy")
            .select({ maxRecords: 12 })
            .eachPage(
                (records, nextPage) => {
                    //console.log({ records })
                    records.forEach(r => acc.push(r.fields))
                    nextPage()
                },
                function done(e) {
                    if (e) throw new Error(e)
                    return resolve(acc)
                }
            )
    })

    const parsed = res.map(({ category, id, image, title }) => ({
        category,
        id,
        image: image[0].url,
        title,
    }))

    return await parsed
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

const getTeam = async () => {
    const res: any[] = await new Promise((resolve, reject) => {
        let acc = []
        base("team")
            .select({ maxRecords: 20 })
            .eachPage(
                (records, nextPage) => {
                    records.forEach(r => {
                        const { name, role, quote, bio_short, avatar } = r.fields
                        acc.push({ name, role, quote, bio_short, avatar: avatar[0]?.url })
                    })
                    nextPage()
                },
                e => {
                    if (e) throw new Error(e)
                    return resolve(acc)
                }
            )
    })

    return res.sort(compare)
}

const sorter = ({ order: a }, { order: b }) => a - b

const getTimelineData = async (path, keep = ["order", "time", "title", "icon"]) => {
    const store = $store$.deref()
    const state_for_path = getIn(store, path)
    if (!path.length && state_for_path?.data) {
        // in root
        return state_for_path.data.sort(sorter)
    }
    if (path.length && !isEmpty(state_for_path)) {
        // not in root
        return state_for_path.sort(sorter)
    }
    //console.log("BLOOP")
    const res: any[] = await new Promise((resolve, reject) => {
        let acc = []
        base("timeline")
            .select({ maxRecords: 12 })
            .eachPage(
                (records, nextPage) => {
                    //console.log({ records })
                    records.forEach(r => {
                        //const { order, time, icon, title, description } = r.fields
                        const take = {}
                        keep.forEach(f => (take[f] = r.fields[f]))
                        acc.push(take)
                        //acc.push({ order, time, title })
                    })
                    nextPage()
                },
                function done(e) {
                    if (e) throw new Error(e)
                    //console.log("Finished loading airtable Timeline:", acc)
                    return resolve(acc)
                }
            )
    })
    return res.sort(sorter)
}

//                                                 d8
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__
//  d888  88b  Y88b/   888  888b d888   i 888     888
//  8888__888   Y88b   888  8888 8888   | 888     888
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/
//                     888
//
// TODO: EXPORT TO @-0/browser
const EMPTY = async () => await new Promise(r => setTimeout(r, 0))
const BASE_URL = "https://anotherstory.com"

export const urlToPageConfig: Router = async URL => {
    const match = URL2obj(URL)
    const { _PATH } = match

    const [_1, _2, _3] = _PATH
    const {
        [URL_PAGE]: page,
        [URL_DATA]: { [DOM_BODY]: body, [DOM_HEAD]: head },
    } = new EquivMap([
        [
            { ...match, _PATH: [] },
            {
                [URL_PAGE]: () => Home,
                [URL_DATA]: {
                    // need the extra "data" prop to nest home state inside global atom
                    [DOM_BODY]: async () => ({ data: await getTimelineData(_PATH) }),
                    [DOM_HEAD]: {
                        title: "AnotherStory",
                        favicon: "/favicon.ico",
                        og_description: "Build Another Story - Without Moving!",
                        og_image: BASE_URL + "/images/stair.png",
                        //og_image_width: "",
                        //og_image_height: "",
                        //og_type: "",
                    },
                },
            },
        ],
        [
            { ...match, _PATH: ["contact"] },
            {
                [URL_PAGE]: () => Contact,
                [URL_DATA]: {
                    [DOM_BODY]: () => null,
                    [DOM_HEAD]: {
                        title: "Contact Us",
                        favicon: "/favicon.ico",
                        og_description: "Sign up for a free 15-minute consultation",
                        og_image: BASE_URL + "/images/finance.png",
                    },
                },
            },
        ],
        [
            { ...match, _PATH: ["process"] },
            {
                [URL_PAGE]: () => Process,
                [URL_DATA]: {
                    [DOM_BODY]: async () =>
                        await getTimelineData(_PATH, [
                            "order",
                            "time",
                            "title",
                            "icon",
                            "description",
                        ]),
                    [DOM_HEAD]: {
                        title: "Our Process",
                        favicon: "/favicon.ico",
                        og_description: "Move into Your Second Story in a Year or Less",
                        og_image: BASE_URL + "/images/living.png",
                    },
                },
            },
        ],
        [
            { ...match, _PATH: ["about"] },
            {
                [URL_PAGE]: () => About,
                [URL_DATA]: {
                    [DOM_BODY]: () => null, // EMPTY,
                    [DOM_HEAD]: {
                        title: "About Us",
                        favicon: "/favicon.ico",
                        og_description: "The Story of AnotherStory",
                        og_image: BASE_URL + "/images/about-us.png",
                    },
                },
            },
        ],
        //[
        //    { ...match, _PATH: ["magic-move"] },
        //    {
        //        [URL_PAGE]: () => Magic,
        //        [URL_DATA]: {
        //            [DOM_BODY]: getItems,
        //        },
        //    },
        //],
        //[
        //    { ...match, _PATH: ["magic-move", _2] },
        //    {
        //        [URL_PAGE]: () => Move,
        //        [URL_DATA]: {
        //            [DOM_BODY]: getItems,
        //        },
        //    },
        //],
    ]).get(match) || {
        [URL_PAGE]: () => Home,
        [URL_DATA]: {
            // need the extra "data" prop to nest home state inside global atom
            [DOM_BODY]: async () => ({ data: await getTimelineData([]) }),
        },
    }

    const res = await body()
    //const state = $store$.deref()
    //console.log({ res, state })
    return {
        [URL_DATA]: {
            [DOM_BODY]: res,
            [DOM_HEAD]: head,
        },
        [URL_PAGE]: page,
    }
}
const INJECT_HEAD = registerCMD(cmd_inject_head)

const SET_PRERENDER_FALSE = registerCMD({
    sub$: "SET_PRERENDER_FALSE",
    args: x => x,
    work: () => {
        //console.log("window.prerenderReady = false")
        //@ts-ignore
        window.prerenderReady = false
    },
})

const SET_PRERENDER_TRUE = registerCMD({
    sub$: "SET_PRERENDER_TRUE",
    args: x => x,
    work: acc => {
        // use setTimetout to push prerenderReady to end of current event queue
        setTimeout(() => {
            const html = document.body.innerHTML
            //console.log("window.prerenderReady = true" /*, { acc, html } */)
            //@ts-ignore
            window.prerenderReady = true
        }, 0)
    },
})

const LOG_POP_STATE = LOG_PROP(API.POP_STATE)
const LOG_TO_GA = registerCMD({
    sub$: "LOG_TO_GA",
    args: x => x,
    work: ({ _FURL }) => {
        const {
            _PATH: [page],
        } = URL2obj(_FURL)
        //@ts-ignore
        ga("set", "page", `/${page}.html`)
        //@ts-ignore
        ga("send", "pageview")
    },
})

export const router: API.RouterCFG = {
    [API.CFG_RUTR]: urlToPageConfig,
    [API.RTR_PREP]: [SET_PRERENDER_FALSE],
    ignore_prefix: "anotherstory", // for github pages loganpowell.github.io/anotherstory
    [API.RTR_POST]: [LOG_TO_GA, INJECT_HEAD, SET_PRERENDER_TRUE],
}
