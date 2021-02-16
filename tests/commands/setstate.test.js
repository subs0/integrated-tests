import { stream } from "@thi.ng/rstream"
import { Atom } from "@thi.ng/atom"
import { run, out$ } from "@-0/spool"
import { createSetStateCMD, SET_STATE } from "../../src/commands"
import { $store$ } from "../../src/store"
import { CMD_ARGS, STATE_DATA, STATE_PATH } from "@-0/keys"

describe("setstate", () => {
    test("createSetStateCMD state/store input is used as state container", () => {
        const store = new Atom({ hello: null })
        const SET = createSetStateCMD(store)
        // before
        expect(store.deref()).toMatchObject({ hello: null })
        out$.next({ ...SET, [CMD_ARGS]: { [STATE_PATH]: [ "hello" ], [STATE_DATA]: "yay! 👏" } })
        // after
        expect(store.deref()).toMatchObject({ hello: "yay! 👏" })
    })
    test("SET_STATE Command: applies submitted state changes to global `$store$`", () => {
        // before
        expect($store$.deref()).toMatchObject({})
        out$.next({ ...SET_STATE, [CMD_ARGS]: { [STATE_PATH]: [], [STATE_DATA]: "hello" } })
        // after
        expect($store$.deref()).toBe("hello")
    })
})
