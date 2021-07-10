/**
 * @module components/FLIPkid
 */

import { cmd_nav, cmd_flip_first, cmd_flip_last_inverse_play } from "@-0/browser"
import { registerCMD } from "@-0/spool"
import { isPlainObject } from "@thi.ng/checks"

import { CFG_RUN$, CMD_ARGS } from "@-0/keys"

const err_str = prop => `
  No '${prop}' property found on FLIPkid firstChild. 
  Ensure you are providing FLIPkid a component with an 
  attributes object as its second argument with a ${prop}
  property for proper FLIP routing.
`

// const [tag, attrs, ..._args] = kid(ctx, ...args)
// const { href } = attrs

const sim_event = href => ({
    currentTarget: { document: null },
    target: {
        href
    }
})

const NAV = registerCMD(cmd_nav)
const FLIP_FIRST = registerCMD(cmd_flip_first)
const FLIP_LAST_INVERSE_PLAY = registerCMD(cmd_flip_last_inverse_play)

const _attrs = ctx => ({
    onclick: ev => {
        ev.preventDefault()
        // console.log({ ev })
        const target = ev.target
        const href = target.getAttribute("href")
        // console.log({ target, href })
        if (!href) return new Error(err_str("href"))
        ctx[CFG_RUN$]([ { ...NAV, [CMD_ARGS]: sim_event(href) }, { ...FLIP_FIRST, [CMD_ARGS]: { id: href, target } } ])
    }
})

/**
 * FLIP (First Last Invert Play) Animating component. Wraps
 * a component that has an `href` attribute and uses it to
 * trigger a routing event and FLIP animation between
 * instances on separate routes (provides a "magic
 * move"-like UX)
 *
 */
export const FLIPkid = Object.freeze({
    render: (ctx, attrs, ...rest) =>
        isPlainObject(attrs)
            ? // console.log("FLIPkid"),
              [
                  "div",
                  {
                      ...attrs,
                      ..._attrs(ctx)
                  },
                  ...rest
              ]
            : [ "div", _attrs(ctx), attrs, ...rest ],
    init: (el, ctx) => {
        // console.log({
        //   el,
        //   firstChild: el.firstChild,
        //   id: el.firstChild.getAttribute("href")
        // }),
        ctx[CFG_RUN$]({
            ...FLIP_LAST_INVERSE_PLAY,
            [CMD_ARGS]: {
                element: el.firstChild,
                id: el.firstChild.getAttribute("href")
            }
        })
    }
})
