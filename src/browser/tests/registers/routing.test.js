import { createEvent, fireEvent } from "@testing-library/dom"
import { EquivMap } from "@thi.ng/associative"
import { map } from "@thi.ng/transducers"

import {
    URL_FULL,
    DOM_NODE,
    CFG_RUTR,
    ROUTER_PREP,
    ROUTER_POST,
    ROUTER_PRFX,
    URL_PAGE,
    URL_DATA,
    CMD_ARGS,
    CMD_SUB$,
    CMD_WORK
} from "@-0/keys"
import { log$, out$, run$, cmd$ } from "@-0/spool"
import { URL2obj } from "@-0/utils"
import { registerRouterDOM } from "../../src/registers"

//const warned = (x = jest.fn()) => (jest.spyOn(console, "warn").mockImplementation(x), x)

describe("registerRouterDOM", () => {
    log$.subscribe({
        next : x => {
            console.log("log$:", x)
        }
    })
    // all router functions take in a URL and should output
    // an object with props:
    // { DATA: <json>, PAGE: <component> }
    const router_fn = url => {
        console.log({ url })
        return { [URL_DATA]: true, [URL_PAGE]: 1 }
    }
    registerRouterDOM(router_fn)
    const spy = jest.fn(x => x)
    out$.subscribeTopic(
        "_URL_NAVIGATED$_DOM",
        {
            next  : x => {
                console.log({ x })
                spy(x)
                return
            },
            error : e => {
                console.warn("error in registers/registerRouterDOM:", e)
                return false
            }
        },
        { id: "testing registerRouterDOM" }
    )

    //const missing_props = warned()

    test("1: 'popstate' events trigger `_URL_NAVIGATED$_DOM` Command (routing)", () => {
        fireEvent(
            window,
            createEvent(
                "popstate",
                window,
                {
                    bubbles    : true,
                    cancelable : true
                },
                { EventType: "CustomEvent" }
            )
        )
        const result = spy.mock.results[0].value
        const sub$ = result[CMD_SUB$]
        const url = result[CMD_ARGS][URL_FULL]
        expect(spy.mock.calls.length).toBe(1)
        expect({ [CMD_SUB$]: sub$, [URL_FULL]: url }).toMatchObject({
            [CMD_SUB$] : "_URL_NAVIGATED$_DOM",
            [URL_FULL] : "http://localhost/"
        })
    })

    test("2: 'DOMContentLoaded' events trigger `_URL_NAVIGATED$_DOM` Command (routing)", () => {
        fireEvent(window, createEvent("DOMContentLoaded", window))
        const result = spy.mock.results[1].value
        const sub$ = result[CMD_SUB$]
        const url = result[CMD_ARGS][URL_FULL]
        expect(spy.mock.calls.length).toBe(2)
        expect({ [CMD_SUB$]: sub$, [URL_FULL]: url }).toMatchObject({
            [CMD_SUB$] : "_URL_NAVIGATED$_DOM",
            [URL_FULL] : "http://localhost/"
        })
    })
})
