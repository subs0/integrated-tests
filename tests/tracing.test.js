import { trace } from "@thi.ng/rstream"
import { run$, out$, command$, task$, log$, registerCMD } from "../lib/spool"

/**
 * ## `trace_stream`
 *
 * allows for logging emissions to a provided stream
 *
 * provide a `log_prefix` to prepend to every console.log
 * */
//export const trace$ = (log_prefix: string, stream) =>
//    stream.subscribeTopic
//        ? stream.subscribeTopic("_TRACE_STREAM", {
//              next: x => console.log(log_prefix, x),
//              error: console.warn,
//          })
//        : stream.subscribe(trace(log_prefix))

/**
 * Observe: Last to be registered = first to be emitted
 */
//const ONE = registerCMD({
//    sub$: "ONE",
//    args: 10,
//    work: x => console.log("from ONE:", x),
//})

//const TWO = registerCMD({
//    sub$: "TWO",
//    args: 20,
//    work: x => console.log("from TWO:", x),
//})

//const THREE = registerCMD({
//    sub$: "THREE",
//    args: 30,
//    work: x => console.log("from THREE:", x),
//})

const ONE_1 = registerCMD({
    sub$: "ONE_1",
    args: { ass: 100 },
    work: x => setTimeout(() => console.log("from ONE_1:", x), 1000),
})

const TWO_2 = registerCMD({
    sub$: "TWO_2",
    args: ({ ass }) =>
        setTimeout(() => (console.log("TWO_2 before processing:", ass), { ass: ass + 100 }), 2000),
    reso: ({ ass }) => ({ ass: ass + 100 }),
    erro: x => console.warn("x", x),
    work: ({ ass }) => console.log("from TWO_2:", { ass }),
})

const THREE_3 = registerCMD({
    sub$: "THREE_3",
    args: ({ ass }) => ({ ass: ass + 100 }),
    work: x => setTimeout(() => console.log("from THREE_3:", x), 3000),
})

//const TASK = [ONE, TWO, THREE]
const TASK_2 = [ONE_1, TWO_2, THREE_3]

//run$.next(ONE_2) // logs only once (first upstream), but forwards to command$
//command$.next(TWO_2) // logs only once, but forwards to out$
//out$.next(THREE_2) // logs for every value (last downstream), i.e. run -> command -> out = 3

// pubsub streams
//trace$("run$     ->", run$)
//trace$("out$     ->", out$)

//// plain streams
//trace$("command$ ->", command$)
//trace$("task$    ->", task$)

//task$.next(TASK_2)
run$.next(TASK_2) // logs only once (first upstream), but forwards to command$
//command$.next(TWO_2) // logs only once, but forwards to out$
//out$.next(THREE_3) // logs for every value (last downstream), i.e. run -> command -> out = 3

log$.subscribe(trace("bloop"))
