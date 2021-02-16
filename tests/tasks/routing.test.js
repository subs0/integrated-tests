import { createEvent, fireEvent, getByText } from "@testing-library/dom"
import { EquivMap } from "@thi.ng/associative"
import { map } from "@thi.ng/transducers"

import { URL_FULL, DOM_NODE, CMD_ARGS, URL_DATA, URL_PAGE, URL_PATH } from "@-0/keys"
import { run$ } from "@-0/spool"

import { $store$ } from "../../src/store"
import { URL__ROUTE, URL_DOM__ROUTE } from "../../src/tasks"

describe("Tasks: routing", () => {
    test("1: URL__ROUTE: function router CFG with simple data", async () => {
        const router_fn = async url => ({ [URL_DATA]: { here: "is some data" } })
        //const router_obj = {
        //    [CFG_RUTR]    : router_fn,
        //    [ROUTER_PREP] : [],
        //    [ROUTER_POST] : [],
        //    [ROUTER_PRFX] : "aws"
        //}
        //cmd$.subscribe(map(console.log))
        const subtask = URL__ROUTE(router_fn)

        const before = $store$.deref()

        console.log({ before })
        await run$.next([ { [CMD_ARGS]: { [URL_DATA]: "🔥", [URL_PATH]: [ "root" ] } }, a => subtask(a) ])

        const after = $store$.deref()

        console.log({ after })
        //expect(result).toHaveBeenCalledTimes(1)
        //expect(result).toMatchObject({ [DOM_NODE]: a, [URL_FULL]: "http://localhost/hello" })
    })
})
