import { createEvent, fireEvent, getByText } from "@testing-library/dom"
import { EquivMap } from "@thi.ng/associative"
import { map } from "@thi.ng/transducers"

import { URL_FULL, DOM_NODE, CMD_ARGS } from "@-0/keys"
import { run$, registerCMD } from "@-0/spool"
import { DOMnavigated$ } from "../../src/core"
import {
    FLIP_FIRST,
    FLIP_LAST_INVERSE_PLAY,
    cmd_href_pushstate_dom,
    cmd_inject_head,
    cmd_notify_prerender_dom,
    cmd_set_link_attrs_dom,
    SET_STATE,
    createSetStateCMD,
    cmd_nav,
    navEventHandler
} from "../../src/commands"

const HREF_PUSHSTATE_DOM = registerCMD(cmd_href_pushstate_dom)
const NOTIFY_PRERENDER_DOM = registerCMD(cmd_notify_prerender_dom)
const SET_LINK_ATTRS_DOM = registerCMD(cmd_set_link_attrs_dom)
const NAV = registerCMD(cmd_nav)
const INJECT_HEAD = registerCMD(cmd_inject_head)

describe("Commands: routing", () => {
    test("1: navEventHandler: relative link click triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe({ next: spy })

        let a = document.createElement("a")
        a.href = "/test/navEventHandler/1"
        a.addEventListener("click", navEventHandler)

        fireEvent(a, createEvent("click", a))
        expect(spy).toHaveBeenCalledTimes(1)
        const result = spy.mock.results[0].value
        expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "http://localhost/test/navEventHandler/1" })
    })
    test("2: navEventHandler: absolute link click  triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe({ next: spy })

        let a = document.createElement("a")
        a.href = "https://hello.world/test/navEventHandler/2"
        a.addEventListener("click", navEventHandler)

        fireEvent(a, createEvent("click", a))

        // DOMnavigated$ has been triggered twice at this point
        expect(spy).toHaveBeenCalledTimes(2)
        const result = spy.mock.results[1].value
        expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "https://hello.world/test/navEventHandler/2" })
    })
    test("3: NAV Command: dispatch triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe({ next: spy })
        const sim_event = href => ({
            currentTarget : { document: null },
            target        : {
                href
            }
        })
        run$.next({ ...NAV, [CMD_ARGS]: sim_event("/test-NAV-3") })

        // DOMnavigated$ has been triggered twice at this point
        expect(spy).toHaveBeenCalledTimes(2)
        const result = spy.mock.results[1].value
        expect(result).toMatchObject({ [URL_FULL]: "/test-NAV-3" })
    })
    test("4: SET_LINK_ATTRS_DOM Command: dispatch marks clicked links visited/active", () => {
        let div = document.createElement("div")
        div.innerHTML = `
            <a href="/hello" >check it</a>
        `
        let a = div.querySelector("a")
        //a.href = "https://hello.world/earth"
        a.addEventListener("click", e => {
            run$.next({
                ...SET_LINK_ATTRS_DOM,
                [CMD_ARGS] : {
                    [DOM_NODE] : e.currentTarget
                }
            })
        })

        fireEvent(a, createEvent("click", a))

        //console.log("a", a.outerHTML)
        expect(a.outerHTML).toBe(`<a href="/hello" visited="" active="">check it</a>`)
        //expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "https://hello.world/earth" })
    })
    test("5: HREF_PUSHSTATE_DOM Command: if DOM ref is <a> -> history.pushState", () => {
        let div = document.createElement("div")
        div.innerHTML = `
            <a href="/world" >hello</a>
        `
        let a = div.querySelector("a")
        a.addEventListener("click", e => {
            //console.log("e.target:", e.target)
            run$.next({
                ...cmd_href_pushstate_dom,
                [CMD_ARGS] : {
                    [DOM_NODE] : e.target,
                    [URL_FULL] : e.target.href
                }
            })
        })
        let before = history.length
        fireEvent(a, createEvent("click", a))
        let after = history.length
        expect(after - before).toBe(1)
    })
    test("6: NOTIFY_PRERENDER_DOM Command: dispatches trigger for prerender (e.g., rendertron)", () => {
        let triggered = false
        document.addEventListener("rendered", e => (triggered = true))
        run$.next(NOTIFY_PRERENDER_DOM)
        expect(triggered).toBe(true)
    })
})
