import { createEvent, fireEvent, getByText } from "@testing-library/dom"
import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"
import { map } from "@thi.ng/transducers"

import {
    URL_FULL,
    DOM_NODE,
    CMD_ARGS,
    URL_DATA,
    URL_PAGE,
    URL_PATH,
    $$_LOAD,
    $$_PATH,
    CFG_RUTR,
    RTR_POST,
    RTR_PREP,
    RTR_PRFX,
    CMD_SUB$,
    CMD_WORK
} from "@-0/keys"

import { registerCMD, run$, log$ } from "@-0/spool"
import { INJECT_HEAD } from "../../src/commands"
import { $store$ } from "../../src/store"
import { URL__ROUTE, URL_DOM__ROUTE } from "../../src/tasks"
import { stringify_fn } from "@-0/utils"
import { setImmediate } from "timers"

const router_fn = url => ({ [URL_DATA]: { here: "worn out places" }, [URL_PAGE]: "({ here }) => would be a function" })

describe("Tasks: routing", () => {
    test("1: URL__ROUTE: function router CFG with simple data", async () => {
        const subtask = URL__ROUTE(router_fn)
        const before = $store$.deref()
        expect(before[$$_PATH]).toMatchObject([])
        run$.next([ { [CMD_ARGS]: { [URL_FULL]: "logan/was/here", [DOM_NODE]: window } }, subtask ])

        // wait for next tick/cycle of event loop
        await new Promise(r => setImmediate(r))

        const after = $store$.deref()
        expect(after[$$_PATH]).toMatchObject([ "logan", "was", "here" ])
    })
    test("2: URL_DOM__ROUTE: function router CFG with simple data", async () => {
        const subtask = URL_DOM__ROUTE(router_fn)
        run$.next([ { [CMD_ARGS]: { [URL_FULL]: "exit/stage", [DOM_NODE]: window } }, subtask ])

        // wait for next tick/cycle of event loop
        await new Promise(r => setImmediate(r))

        const after = $store$.deref()
        expect(after).toMatchObject({
            $$_PATH : [ "exit", "stage" ],
            $$_LOAD : false,
            $$_VIEW : "({ here }) => would be a function",
            $$_ROOT : null,
            exit    : { stage: { here: "worn out places" } }
        })
    })
    test("3: URL__ROUTE: Object router CFG with simple data", async () => {
        // Object router configuration
        const router_obj = {
            [CFG_RUTR] : router_fn,
            [RTR_PRFX] : "nowyouseeme/"
        }

        const subtask2 = URL__ROUTE(router_obj)

        run$.next([ { [CMD_ARGS]: { [URL_FULL]: "nowyouseeme/now/you/dont", [DOM_NODE]: window } }, subtask2 ])

        // wait for next tick/cycle of event loop
        await new Promise(r => setImmediate(r))

        const after = $store$.deref()
        expect(after[$$_PATH]).toMatchObject([ "now", "you", "dont" ])
    })
    test(`4: URL_DOM__ROUTE: Object router CFG with \`${RTR_PRFX}\` + \`${RTR_POST}\``, async () => {
        //log$.subscribe(map(x => console.log("log$:", x)))
        const pre_spy = jest.fn(({ y }) => ({ z: y * y }))
        const PRE = registerCMD({
            [CMD_SUB$] : "PRE",
            [CMD_ARGS] : ({ x }) => ({ y: x * x }),
            [CMD_WORK] : pre_spy
        })

        const post_spy = jest.fn(({ z }) => ({ a: z + 1 }))
        const POST = registerCMD({
            [CMD_SUB$] : "POST",
            [CMD_ARGS] : ({ y }) => ({ z: y + 1 }),
            [CMD_WORK] : post_spy
        })

        // Object router configuration
        const router_obj = {
            [CFG_RUTR] : router_fn,
            [RTR_PREP] : [ { [CMD_ARGS]: { x: 2 } }, PRE ],
            [RTR_POST] : POST,
            [RTR_PRFX] : "allaroundme/"
        }

        const subtask2 = URL_DOM__ROUTE(router_obj)

        run$.next([
            { [CMD_ARGS]: { [URL_FULL]: "allaroundme/are/familiar/faces", [DOM_NODE]: { target: { href: "bloop" } } } },
            subtask2
        ])

        // wait for next tick/cycle of event loop
        await new Promise(r => setImmediate(r))

        const after = $store$.deref()

        //console.log({ after: stringify_fn(after, 2) })
        expect(pre_spy.mock.results[0].value).toMatchObject({ z: 16 })
        expect(post_spy.mock.results[0].value).toMatchObject({ a: 6 })

        expect(getIn(after, [ "are", "familiar", "faces" ])).toMatchObject({ here: "worn out places" })
    })
})
