/**
 * @module commands/FLIP
 */

import { Atom } from "@thi.ng/atom"
import { getInUnsafe } from "@thi.ng/paths"

import { CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys"
import { Err_missing_props } from "@-0/utils"
import { registerCMD } from "@-0/spool"

function getStyles(element: HTMLElement) {
    const computedStyle = getComputedStyle(element)

    return {
        radius: computedStyle.borderRadius || 0
    }
}

function getRect(element: HTMLElement, frame?) {
    const { top, bottom, left, right, width, height } = element.getBoundingClientRect()

    const parent = frame ? frame.getBoundingClientRect() : null

    return {
        top: top - (parent ? parent.top : 0),
        bottom,
        left: left - (parent ? parent.left : 0),
        right,
        width,
        height,
        get transform() {
            return getComputedStyle(element).transform || undefined
        }
    }
}

// const w = window
// const d = document
// const e = d.documentElement
// const b = d.getElementsByTagName('body')[0]

const S_path = "FLIP_shuffle"

const shuffle_paths = uid => ({
    rects: [ S_path, "rects", uid ],
    elems: [ S_path, "elems", uid ]
})

const FLIP_all = (el, state, uid, frameDOMel = null) => {
    const { rects } = shuffle_paths(uid)

    if (!getInUnsafe(state.deref(), rects)) return state.resetIn(rects, getRect(el, frameDOMel))

    const F_flip_map = getInUnsafe(state.deref(), rects)
    const L_flip_map = getRect(el, frameDOMel)
    // console.log({ F_flip_map, L_flip_map })

    const Tx = F_flip_map.left - L_flip_map.left
    const Ty = F_flip_map.top - L_flip_map.top
    const Sx = F_flip_map.width / L_flip_map.width
    const Sy = F_flip_map.height / L_flip_map.height

    el.style.transformOrigin = "0 0"
    el.style.transition = ""

    const trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`

    el.style.transform = trans

    state.resetIn(rects, L_flip_map)

    requestAnimationFrame(() => {
        el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)"
        el.style.transform = "none"
    })
}

const Z_path = "FLIP_zoom"
const zoom_paths = uid => ({
    rects: [ Z_path, "rects", uid ],
    elems: [ Z_path, "elems", uid ],
    clicks: [ Z_path, "clicks", uid ],
    scrolls: [ Z_path, "scroll", uid ]
})

/**
 *
 * `FLIPFirst`
 *
 * ```
 * order: normalizeTree -> render -> diff -> init -> release
 *                        | hdom |         | dom | unmounted
 * ```
 *
 * 1. el mounted (init): look for existing flip map for id
 *  - if exists, Play anim and store new flip map rect (for
 *    navs)
 *  - if doesn't, nada
 * 2. el clicked (render.attrs.onclick): measure and store
 *    flip map for id
 * 3. el released: if clicked, calc flip rect and lookup for
 *    id:
 *  - if first === last, no change (on nav e.g.)
 *  - if first !== last, nav change (store rect for id)
 *
 */
const FLIPFirst = ({ state, id, target }) => {
    // 📌 TODO: GOOD PLACE FOR AN `onStart` hook animation/callback

    const { rects, clicks, scrolls } = zoom_paths(id)

    // sets the rect in state for next el init to sniff
    const flip_map = getRect(target)
    state.resetIn(rects, flip_map)

    // registers component as having been clicked (focused)
    state.resetIn(clicks, true)
    state.resetIn(scrolls, { y: window.scrollY, x: window.scrollX })
}

/**
 * https://coder-coder.com/z-index-isnt-working/
 */
const zIndex = (el, idx) => (el.style.zIndex = idx)

/**
 * 1. if it has been clicked that means the last thing
 *    that happened was a click that triggered this init
 *    so we do the calcs
 *
 * 2. if a back/nav (no frame) event was what triggered
 *    the init do the calcs with no frame
 *
 * What's happening:
 * - on first click (render)
 * - rect registered
 * - frame registered
 * - navs
 * - on init of new DOM
 * - checks for rect & frame
 * - uses rect & frame to calc diff
 * - PLAY
 *
 */
const FLIPLastInvertPlay = ({
    element,
    state,
    id,
    // just baffle them with https://cubic-bezier.com/
    transition = "all .5s cubic-bezier(.54,-0.29,.17,1.11)"
    // transition = "all .3s ease-in-out"
}) => {
    element.setAttribute("flip", id)
    const { rects, clicks, scrolls } = zoom_paths(id)

    const F_flip_map = getInUnsafe(state.deref(), rects) || null
    // NO RECT => NOT CLICKED
    if (!F_flip_map) return

    /**
   * 🔥 this may cause issues for parrallel anims append this
   * to a specific target using:
   * Array.from(el.querySelectorAll("[flip]")).forEach(x=>
   * if i last... el.scrollIntoView())
   *
   */
    // 🕞 calculate location and size
    const { x, y } = getInUnsafe(state.deref(), scrolls) // top - window.innerHeight / 2
    window.scrollTo(x, y)
    element.scrollIntoView()

    let L_flip_map = getRect(element)
    // recalc rect if out of initial view after scrolling into view
    // if (Math.abs(F_flip_map.top - L_flip_map.top) > window.innerHeight) {
    //   element.scrollIntoView()
    //   L_flip_map = getRect(element)
    // }

    const Tx = F_flip_map.left - L_flip_map.left
    const Ty = F_flip_map.top - L_flip_map.top
    const Sx = F_flip_map.width / L_flip_map.width
    const Sy = F_flip_map.height / L_flip_map.height

    // console.log({ Tx, Ty, Sx, Sy })

    element.style.transformOrigin = "top left"
    element.style.transition = ""
    const trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
    element.style.transform = trans

    // PLAY
    requestAnimationFrame(() => {
        // 🕤 just before animating, scroll to new location
        element.style.transformOrigin = "top left"
        element.style.transition = transition
        element.style.transform = "none"
        // 💩 hack for removing zIndex after animation is complete
        // 📌 TODO:    🔻 GOOD PLACE FOR AN `onComplete` hook animation/callback
        setTimeout(() => zIndex(element, 0), 200)
    })
    // move element to front
    zIndex(element, 1)
    // 🔍 consider exposing in the API
    const clicked = getInUnsafe(state.deref(), clicks) || null
    if (!clicked) {
        // console.log(uid, "FLIP'ed on navigated")
        state.resetIn(rects, null)
    } else {
        // console.log(uid, "FLIP'ed on click! 👆")
        state.resetIn(rects, L_flip_map)
    }
    // remove click frame
    state.resetIn(clicks, null)
}

const state = new Atom({})

// render: onclick
export const cmd_flip_first = {
    [CMD_SUB$]: "_FLIP_FIRST",
    [CMD_ARGS]: ({ id, target }) => ({ id, target }),
    [CMD_WORK]: args => {
        const { id, target } = args
        const props = { id, target }
        if (id && target) return FLIPFirst({ id, target, state })
        return console.warn(Err_missing_props("_FLIP_FIRST", props))
    }
}

// init
export const cmd_flip_last_inverse_play = {
    [CMD_SUB$]: "_FLIP_LAST_INVERSE_PLAY",
    [CMD_ARGS]: ({ id, element }) => ({ id, element }),
    [CMD_WORK]: args => {
        const { id, element } = args
        const props = { id, element }
        if (id && element) return FLIPLastInvertPlay({ id, element, state })
        return console.warn(Err_missing_props("_FLIP_LAST_INVERSE_PLAY", props))
    }
}
