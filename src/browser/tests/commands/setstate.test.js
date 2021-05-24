import { stream } from "@thi.ng/rstream"
import { Atom } from "@thi.ng/atom"
import { run, out$ } from "@-0/spool"
import { createSetStateCMD, SET_STATE } from "../../src/commands"
import { $store$ } from "../../src/store"
import { CMD_ARGS, SET_DATA, SET_PATH } from "@-0/keys"

describe("setstate", () => {
    test("1: `createSetStateCMD` state/store input is used as state container", () => {
        const store = new Atom({ hello: null })
        const CUSTOM_STATE_SETTING_COMMAND = createSetStateCMD(store)
        // before
        expect(store.deref()).toMatchObject({ hello: null })
        out$.next({ ...CUSTOM_STATE_SETTING_COMMAND, [CMD_ARGS]: { [SET_PATH]: [ "hello" ], [SET_DATA]: "yay! 👏" } })
        // after
        expect(store.deref()).toMatchObject({ hello: "yay! 👏" })
    })
    test("2: `SET_STATE` Command: applies submitted state changes to global `$store$`", () => {
        // before
        expect($store$.deref()).toMatchObject({})
        out$.next({ ...SET_STATE, [CMD_ARGS]: { [SET_PATH]: [], [SET_DATA]: "hello" } })
        // after
        expect($store$.deref()).toBe("hello")
    })
})
