import { createEvent, fireEvent, getByText } from "@testing-library/dom"
import { EquivMap } from "@thi.ng/associative"
import { map } from "@thi.ng/transducers"

import { URL_FULL, DOM_NODE, CMD_ARGS } from "@-0/keys"
import { run$ } from "@-0/spool"
import { DOMnavigated$ } from "../../src/core"
import {
    FLIP_FIRST,
    FLIP_LAST_INVERSE_PLAY,
    HREF_PUSHSTATE_DOM,
    HURL,
    HURLer,
    INJECT_HEAD,
    NOTIFY_PRERENDER_DOM,
    SET_LINK_ATTRS_DOM,
    SET_STATE,
    createSetStateCMD
} from "../../src/commands"

describe("Commands: routing", () => {
    test("1: HURLer: relative link click triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe({ next: spy })

        let a = document.createElement("a")
        a.href = "/test/HURLer/1"
        a.addEventListener("click", HURLer)

        fireEvent(a, createEvent("click", a))
        expect(spy).toHaveBeenCalledTimes(1)
        const result = spy.mock.results[0].value
        expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "http://localhost/test/HURLer/1" })
    })
    test("2: HURLer: absolute link click  triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe({ next: spy })

        let a = document.createElement("a")
        a.href = "https://hello.world/test/HURLer/2"
        a.addEventListener("click", HURLer)

        fireEvent(a, createEvent("click", a))

        // DOMnavigated$ has been triggered twice at this point
        expect(spy).toHaveBeenCalledTimes(2)
        const result = spy.mock.results[1].value
        expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "https://hello.world/test/HURLer/2" })
    })
    test("3: HURL Command: dispatch triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe({ next: spy })
        const sim_event = href => ({
            currentTarget : { document: null },
            target        : {
                href
            }
        })
        run$.next({ ...HURL, [CMD_ARGS]: sim_event("/test-HURL-3") })

        // DOMnavigated$ has been triggered twice at this point
        expect(spy).toHaveBeenCalledTimes(2)
        const result = spy.mock.results[1].value
        expect(result).toMatchObject({ [URL_FULL]: "/test-HURL-3" })
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
                ...HREF_PUSHSTATE_DOM,
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
