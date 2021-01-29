import { trace } from "@thi.ng/rstream"
import { run$, out$, cmd$, task$, log$, registerCMD } from "../lib/spool"

const log = console.log

const ONE_1 = registerCMD({
    sub$ : "ONE_1",
    args : { ass: 100 },
    work : x => setTimeout(() => console.log("from ONE_1:", x), 1000)
})

const ERROR = registerCMD({
    sub$ : "_ERROR",
    args : new Error("from _ERROR"),
    erro : (acc, res) => null,
    work : x => console.error("Huge mistake:", x)
})

const TWO_2 = registerCMD({
    sub$ : "TWO_2",
    args : async ({ ass }) => {
        log("waiting for 2 seconds...")
        await new Promise(res => setTimeout(res, 2000))
        log("2 sec wait over!")
        throw new Error("WTF")
        return { wipe: ass }
    },
    reso : (acc, { wipe }) => (log("wipe:", wipe), { ...acc, wipe: wipe + 100 }),
    erro : (acc, err) => ({ ...ERROR, args: err }),
    //erro: () => null,
    work : x => console.log("from TWO_2:", x)
})

const THREE_3 = registerCMD({
    sub$ : "THREE_3",
    args : async ({ wipe }) => {
        log("waiting for 3 seconds...")
        await new Promise(res => setTimeout(res, 3000))
        log("3 sec wait over!")
        return 10
    },
    erro : (acc, err) => null,
    //reso: (acc, { wipe }) => (log("wipe:", wipe), { ...acc, wipe: wipe + 100 }),
    work : x => setTimeout(() => console.log("from THREE_3:", x), 3000)
})

const FOUR_4 = registerCMD({
    sub$ : "FOUR_4",
    args : async ({ wipe }) => {
        log("waiting for 4 seconds...")
        await new Promise(res => setTimeout(res, 4000))
        log("4 sec wait over!")
        return { wipe: wipe + 100 }
    },
    reso : (acc, { wipe }) => (log("wipe:", wipe), { ...acc, wipe: wipe + 100 }),
    work : x => setTimeout(() => console.log("from FOUR_4:", x), 3000)
})

const NOOP = registerCMD({
    args : 1
})

//const TASK = [ONE, TWO, THREE]
const TASK_2 = [ ONE_1, TWO_2, THREE_3, FOUR_4 ]

/**
Huge mistake: [Error: WTF] 
bloop { 'sub$': 'ONE_1', args: '{"ass":100}' } 
waiting for 2 seconds... 
from ONE_1: { ass: 100 } 
2 sec wait over! ​​​​​
bloop { 'sub$': '_ERROR', args: '{}' } 
 */

run$.next(TASK_2) // logs only once (first upstream), but forwards to cmd$
// cmd$.next(TWO_2) // logs only once, but forwards to out$
// out$.next(THREE_3) // logs for every value (last downstream), i.e. run -> command -> out = 3

log$.subscribe(trace("bloop"))
/**
 *
 * TODO:
 * 1. Create Commands with varying combinations of properties, e.g.:
 *
 *  No. | COMBINATION                                        | Err? | Description
 *      | ---                                                |---   | ---
 *  1   | { sub$ }                                           |  🔴  |  Noop
 *  2   | { args: 1 }                                        |  🔴  |  No sub$ for primitive
 *  3   | { args: {} }                                       |  💚  |  Static Val
 *  4   | { work }                                           |  🔴  |  Noop
 *  5   | { reso }                                           |  🔴  |  Noop
 *  6   | { erro }                                           |  🔴  |  Noop
 *  7   | { sub$, args: 1 }                                  |  💚  |  primitive dispatch to sub$
 *  8   | { sub$, args: {} }                                 |  💚  |  object dispatch to sub$
 *  9   | { sub$, args: (0) => }                             |  💚  |  function dispatch to sub$
 *  10  | { sub$, args: (1) => }                             |  💚  |  object dispatch to sub$
 *  11  | { sub$, args: Promise }                            |  💚  |
 *  12  | { sub$, args: Promise, work }                      |  💚  |
 *  13  | { sub$, args: Promise, reso }                      |  💛  |  no error handler
 *  14  | { sub$, args: Promise, erro }                      |  💚  |
 *  15  | { sub$, args: Promise, reso, erro: {} }            |  💚  |
 *  16  | { sub$, args: Promise, reso, erro: (0) => }        |  💚  |
 *  17  | { sub$, args: Promise, reso, erro: (1) => }        |  💚  |
 *  18  | { sub$, args: Promise, reso, erro: (>1) => }       |  💚  |
 *  19  | { sub$, args: Promise, reso, erro, work }          |  💚  |
 *
 * 2. Create a test for each.
 *
 */
