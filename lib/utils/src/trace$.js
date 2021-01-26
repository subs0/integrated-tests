import { trace } from "@thi.ng/rstream";
export const trace$ = (log_prefix, stream) => stream.subscribeTopic
    ? stream.subscribeTopic("_TACE_STREAM", {
        next: x => console.log(log_prefix, x),
        error: console.warn
    })
    : stream.subscribe(trace(log_prefix));
