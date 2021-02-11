import { createEvent, fireEvent, getByText } from "@testing-library/dom"
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
        DOMnavigated$.subscribe(map(spy))

        let a = document.createElement("a")
        a.href = "/hello"
        a.addEventListener("click", HURLer)

        fireEvent(a, createEvent("click", a))
        expect(spy).toHaveBeenCalledTimes(1)
        const result = spy.mock.results[0].value
        expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "http://localhost/hello" })
    })
    test("2: HURLer: absolute link click  triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe(map(spy))

        let a = document.createElement("a")
        a.href = "https://hello.world/earth"
        a.addEventListener("click", HURLer)

        fireEvent(a, createEvent("click", a))

        // DOMnavigated$ has been triggered twice at this point
        expect(spy).toHaveBeenCalledTimes(2)
        const result = spy.mock.results[1].value
        expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "https://hello.world/earth" })
    })
    test("3: HURL Command: dispatch triggers DOMnavigated$ injection", () => {
        const spy = jest.fn(x => x)
        DOMnavigated$.subscribe(map(spy))
        const sim_event = href => ({
            currentTarget : { document: null },
            target        : {
                href
            }
        })
        run$.next({ ...HURL, [CMD_ARGS]: sim_event("/this-was-run") })

        // DOMnavigated$ has been triggered twice at this point
        expect(spy).toHaveBeenCalledTimes(2)
        const result = spy.mock.results[1].value
        expect(result).toMatchObject({ [URL_FULL]: "/this-was-run" })
    })
    test("4: SET_LINK_ATTRS_DOM Command: dispatch marks visited links as active", () => {
        let div = document.createElement("div")
        div.innerHTML = `
            <a id="me" href="/hello" >check it</a>
        `
        let a = div.querySelector("a")
        //a.href = "https://hello.world/earth"
        a.addEventListener("click", e => {
            run$.next({ ...SET_LINK_ATTRS_DOM, [CMD_ARGS]: { [DOM_NODE]: e.currentTarget } })
        })

        fireEvent(a, createEvent("click", a))

        const test = getByText(div, "check it")
        console.log("test", test.outerHTML)
        expect(test.outerHTML).toBe(`<a id="me" href="/hello" visited="" active="">check it</a>`)
        //expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "https://hello.world/earth" })
    })
})
