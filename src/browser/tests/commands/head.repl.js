import { injectHead } from "../../lib/commands/head"
import { URL, DOM, HD_TITL } from "@-0/keys"

injectHead({
    [URL.DATA]: {
        [DOM.HEAD]: {
            [HD_TITL]: "title",
            unknown_key: "values 4",
        },
    },
}) //?
