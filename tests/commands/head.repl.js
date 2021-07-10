import { injectHead } from "../../lib/commands/head"
import { URL, DOM, HD_ICON, HD_META, HD_TITL, OG_DESC, OG_IMGH, OG_IMGU, OG_IMGW, OG_TYPE } from "@-0/keys"

injectHead({
    [URL.DATA]: {
        [DOM.HEAD]: {
            [HD_TITL]   : "title",
            unknown_key : "values 4"
        }
    }
}) //?
