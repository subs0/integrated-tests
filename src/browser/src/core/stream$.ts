/**
 * @module core/stream$
 */

import { fromDOMEvent, merge, ISubscribable, ISubscriber } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"

import { URL_FULL, DOM_NODE } from "@-0/keys"
// @ts-ignore
export const popstate$: ISubscribable<PopStateEvent> = fromDOMEvent(window, "popstate")
// @ts-ignore
export const DOMContentLoaded$: ISubscribable<Event> = fromDOMEvent(window, "DOMContentLoaded")

export type NavigationObject = {
    target: {
        location: {
            href: string
        }
    }
    currentTarget: HTMLElement | Document
}
/**
 *
 * There are three types of navigation we need to handle:
 * 1. DOMContentLoaded (entering the site) events
 * 2. popstate (browser back/forward button clicks) events
 * 3. `<a href="x">` (link clicking)
 *
 * These events have different payloads and need to be
 * harmonized in order to use them consistently
 *
 * ## getting the `href` property from the various events:
 * 1. ev.target.location.href
 * 2. ev.target.location.href
 * 3. ev.target.href
 *
 * for raw events, we can just transform them, but for link
 * clicking we need to convert/wrap it to align with the
 * destructuring of the others
 *
 * see _HURL in `/commands/routing.js` for ad-hoc stream
 * injection example
 */
export const DOMnavigated$ = merge({
    src: [popstate$, DOMContentLoaded$],
}).transform({
    xform: map((x: NavigationObject) => {
        if (x.target.location.href && x.currentTarget) {
            return {
                [URL_FULL]: x.target.location.href,
                [DOM_NODE]: x.currentTarget,
            }
        }
        console.log(
            "DOMnavigated$ triggered, but missing `x.target.location.href &/ x.currentTarget`",
            JSON.stringify(x, null, 2)
        )
        return x
    }),
    error: e => {
        console.warn("DOMnavigated$ ERROR:", e)
        return true
    },
})

//DOMnavigated$.next()
