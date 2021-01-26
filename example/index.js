import { getInUnsafe } from "@thi.ng/paths"
import { isObject } from "@thi.ng/checks"
import { EquivMap } from "@thi.ng/associative"
import "regenerator-runtime"
// import scrolly from "@mapbox/scroll-restorer"
// scrolly.start()

// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
import { registerCMD, command$, out$, run$ } from "../lib/spool"
import { INJECT_HEAD, HURL } from "../lib/browser"
import { FLIPkid, boot } from "../lib/hdom"
import { parse, trace$ } from "../lib/utils"
import * as K from "../lib/keys"

// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
// import { button_x } from "./components"
// import { THEME } from "./theme"

const log = console.log

trace$("run$ ->", run$)
trace$("command$ ->", command$)
trace$("out$ ->", out$)

/**
 *
 * When using a router config object (rather than a plain
 * router function), payloads can also separate display data
 * under a `BODY` key to separate the content from any
 * metadata you may want to use in `pre`/`post`
 * Commands/Tasks. For example, the built-in
 * `INJECT_HEAD_CMD` pulls from a `HEAD` key in the payload.
 *
 * Regarding state MGMT: The payload (value) will be
 * destructured from the `BODY` to keep your lenses (paths)
 * and state clean. I.e., you do not have to destructure
 * this from your page/app template manually. However,
 * within a `pre`/`post` Command/Task, the user can/must
 * use/destructure `HEAD`/`POST` payloads for their own
 * needs
 *
 */
const getSomeJSON = async (path, uid) => {
    const text_base = "https://jsonplaceholder.typicode.com/"
    const img_base = (id, sz) => `http://lorempixel.com/${sz}/${sz}/sports/${id}/` // `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`

    const data = uid
        ? (async () => {
            let detail = await fetch(`${text_base}${path}/${uid}`).then(r => r.json())
            let {
                name = `User ${getInUnsafe(detail, "id")}`,
                company: { catchPhrase } = { catchPhrase: detail.title },
            } = detail
            return {
                [K.DOM.HEAD]: {
                    //title?: any
                    //description?: any
                    //img_url?: any
                    //img_width?: any
                    //img_height?: any
                    //favicon?: any
                    //type?: any
                    title: `${name}'s Details`,
                    description: `${name} handles ${catchPhrase}`,
                    img_url: img_base(uid, 600),
                },
                [K.DOM.BODY]: {
                    // lesson -> don't use the actual url as the uid (not flexible)
                    img: img_base(uid, 600),
                    // this needs fixin' 📌
                    text: detail,
                    uid,
                },
            }
        })()
        : (async () => {
            let list = await fetch(`${text_base}${path}/`).then(r => r.json())
            return {
                [K.DOM.HEAD]: {
                    title: `${path.replace(/^\w/, c => c.toUpperCase())} list`,
                    description: `List page for ${path}`,
                    img_url: img_base(222, 200),
                },
                [K.DOM.BODY]: list.map((c, i) => ({
                    img: img_base(i + 1, 200),
                    text: c,
                    uid: i + 1,
                })),
            }
        })()
    return data
}

//
//                             d8
//  888-~\  e88~-_  888  888 _d88__  e88~~8e   d88~\
//  888    d888   i 888  888  888   d888  88b C888
//  888    8888   | 888  888  888   8888__888  Y88b
//  888    Y888   ' 888  888  888   Y888    ,   888D
//  888     "88_-~  "88_-888  "88_/  "88___/  \_88P
//
//

/**
 *
 * Even if you don't end up using `spule` - you may find the
 * [`@thi.ng/associative`](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
 * library __very handy__ indeed!
 *
 * Value semantics have so many benefits. As a router,
 * here's one.
 *
 * TODO: Graphql Example
 */
const routerCfg = async url => {
    let match = parse(url)
    // let {
    // URL,
    // URL_subdomain, // array
    // URL_domain, // array
    // URL_query, // object
    // URL_hash, // string
    // URL_path // array
    // } = match

    let path = match[K.URL.PATH]
    let [, p_b] = path

    let RES = new EquivMap([
        [
            { ...match, [K.URL.PATH]: ["todos"] },
            { [K.URL.DATA]: () => getSomeJSON("todos"), [K.URL.PAGE]: set },
        ],
        [
            { ...match, [K.URL.PATH]: ["todos", p_b] },
            { [K.URL.DATA]: () => getSomeJSON("todos", p_b), [K.URL.PAGE]: single },
        ],
        [
            { ...match, [K.URL.PATH]: ["users"] },
            { [K.URL.DATA]: () => getSomeJSON("users"), [K.URL.PAGE]: set },
        ],
        [
            { ...match, [K.URL.PATH]: ["users", p_b] },
            { [K.URL.DATA]: () => getSomeJSON("users", p_b), [K.URL.PAGE]: single },
        ],
        // home page (empty path)
        [
            { ...match, [K.URL.PATH]: [] },
            { [K.URL.DATA]: () => (console.log("HOME"), getSomeJSON("users", 10)), [K.URL.PAGE]: single },
        ], // get match || 404 data
    ]).get(match) || {
        [K.URL.DATA]: () => getSomeJSON("users", 10),
        [K.URL.PAGE]: single,
    }

    let data = RES[K.URL.DATA]
    let page = RES[K.URL.PAGE]

    return { [K.URL.DATA]: await data(), [K.URL.PAGE]: page }
}

//
//  888            888
//  888-~88e  e88~\888  e88~-_  888-~88e-~88e
//  888  888 d888  888 d888   i 888  888  888
//  888  888 8888  888 8888   | 888  888  888
//  888  888 Y888  888 Y888   ' 888  888  888
//  888  888  "88_/888  "88_-~  888  888  888
//
//

//////////////////// FLIP API 🔻 //////////////////////////

// CHILD DEF: sig = (ctx, attrs, ...any)

const child = (ctx, id, img, sz, ...args) =>
    // log("child"),
    [
        "img",
        {
            src: img,
            style:
                sz === "sm"
                    ? {
                        height: "100px",
                        width: "100px",
                        cursor: "pointer",
                        "margin-right": "15px",
                    }
                    : {
                        height: "600px",
                        width: "600px",
                    },
            href:
                sz === "sm"
                    ? `/${ctx[K.URL.PRSE]()[K.URL.PATH]}/${id}`
                    : `/${ctx[K.URL.PRSE]()[K.URL.PATH].join("/")}`,
        },
        ...args,
    ]

const zoomOnNav = (ctx, id, img, sz) => [FLIPkid, [child, id, img, sz]]

//////////////////// FLIP API 🔺  //////////////////////////

/**
 * higher order components should only take static parameters
 * so that they can be cached. I.e., in this case a string
 * Do not nest an HDOM functional component within another
 * in an attempt to pass state between components. Use an atom,
 * which is deref'able for that
 */
const component = sz =>
    // log("component"),
    (ctx, uid, img, fields) => [
        "div",
        { style: { "margin-bottom": "30px", display: sz === "sm" ? "flex" : "block" } },
        [zoomOnNav, uid, img, sz],
        ["p", { class: "title" }, fields],
    ]

// babel/core-js will complain if pages aren't defined
// before they're used even though eslint will allow it
const single = (ctx, body) => {
    //  console.log("single component loaded. body:", body)
    return [
        component("lg"),
        getInUnsafe(body, "uid") || 1,
        getInUnsafe(body, "img") || `http://lorempixel.com/600/600/sports/4/`,
        getInUnsafe(body, "text") ? fields(body.text.company || body.text) : null,
    ]
}

const set = (ctx, bodies) =>
    // log("set"),
    ["div", ...bodies.map(({ img, text, uid }) => [component("sm"), uid, img, fields(text)])]

// const S = JSON.stringify // <- handy for adornment phase

// declare button before using in-site (prevent re-registration on RAF)

// const btn_outline = button_x({ tag: "a" }, "buttons.outline")

const pathLink = (ctx, uid, ...args) =>
    // log("pathLink"),
    [
        "div",
        // btn_outline,
        uid === 3
            ? { disabled: true }
            : {
                href: `/${ctx[K.URL.PRSE]()[K.URL.PATH]}/${uid}`,
                onclick: e => {
                    e.preventDefault()
                    ctx.run({ ...HURL, args: e })
                },
            },
        ...args,
    ]

const field = (ctx, key, val) =>
    // log("field"),
    [
        "li",
        { style: { display: "flex" } },
        key === "id"
            ? [pathLink, val, val]
            : isObject(val)
                ? ["ul", ...Object.entries(val).map(([k, v]) => [field, k, v])]
                : ["p", { style: { padding: "0 0.5rem" } }, val],
    ]

const fields = payload =>
    // log("fields", { payload }),
    [
        "ul",
        ...Object.entries(payload)
            .slice(0, 4)
            .map(([k, v]) => [field, k, v]),
    ]

const link = (ctx, path, ...args) =>
    // log("link"),
    [
        "a",
        {
            href: "/" + path.join("/"),
            // regular href just works if there's no extra paths in
            // URL (e.g., gh-pages URLs will break these)...
            onclick: e => (e.preventDefault(), ctx.run({ ...HURL, args: e })),
        },
        ...args,
    ]

//
//
//    /~~~8e  888-~88e  888-~88e
//        88b 888  888b 888  888b
//   e88~-888 888  8888 888  8888
//  C888  888 888  888P 888  888P
//   "88_-888 888-_88"  888-_88"
//            888       888
//
// TODO: example of using cursors for local state
const app = (ctx, page) =>
    //log("app"),
    [
        "div",
        { style: { "max-width": "30rem", margin: "auto", padding: "2rem" } },
        ...[["users"], ["todos"], ["todos", 2], ["users", 9]].map(path => [
            link,
            path,
            `/${path[0]}${path[1] ? "/" + path[1] : ""}`,
            ["br"],
        ]),
        // default to homepage `single` shell during
        // hydration/start (before any async is done)
        page,
    ]

// TODO: add default / 404 page here (could help the ugly $page.deref() ||...)
const router = {
    [K.ROUTER.RUTR]: routerCfg,
    [K.ROUTER.PRFX]: "ac/",
    [K.ROUTER.POST]: INJECT_HEAD,
}

// const router = routerCfg

const w_config = {
    [K.CFG.VIEW]: app,
    [K.CFG.RUTR]: router,
    [K.CFG.ROOT]: document.getElementById("app"), // <- 🔍
    [K.CFG.DRFT]: { users: [] },
    //  [K.CFG.LOG$]: "state ->",
    //[K.CFG.KICK]: true,

    // arbitrary context k/v pairs...
    // theme: THEME
}
// @ts-ignore
boot(w_config)

console.log("registered Commands:", out$.topics.entries())

console.log("starting...")
