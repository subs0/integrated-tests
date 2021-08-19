import { IAtom } from "@thi.ng/atom/api"
import {
    CMD_ARGS,
    CMD_SRC$,
    CMD_ERRO,
    CMD_RESO,
    CMD_SUB$,
    CMD_WORK,
    URL_FULL,
    URL_PATH,
    URL_DOMN,
    URL_SUBD,
    URL_QERY,
    URL_HASH,
    DOM_NODE,
    DOM_BODY,
    DOM_HEAD,
    HD_TITL,
    HD_DESC,
    HD_IMGU,
    HD_IMGW,
    HD_IMGH,
    HD_ICON,
    HD_TYPE,
    URL_DATA,
    URL_PAGE,
    RTR_PREP,
    RTR_PRFX,
    RTR_POST,
    CFG_RUTR,
    $$_PATH,
    $$_LOAD,
    $$_VIEW,
    $$_ROOT,
} from "./constants"

import { ISubscribable, ISubscriber, PubSub } from "@thi.ng/rstream"

import { URL2obj } from "@-0/utils"
import { registerRouterDOM } from "@-0/browser"
import { EquivMap } from "@thi.ng/associative"

export type Accumulator = Record<string, unknown>

/**
 * Command Object.
 *
 * The only required property is `args`
 */
const ICO = {
    [CMD_ARGS]: null,
    [CMD_SUB$]: "",
    [CMD_RESO]: (acc: Accumulator, res) => null,
    [CMD_ERRO]: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => null,
}
export type ICommandObject = Partial<typeof ICO>

const IC = {
    ...ICO,
    [CMD_WORK]: args => null,
    [CMD_SRC$]: null as ISubscribable<any> | ISubscriber<any>,
}
export type ICommand = Partial<typeof IC>

export type Command = ICommandObject | HOTask

export type HOTask = (acc: Accumulator) => Task

export type Task = Command[]

const C = data => null
export type Component = typeof C

const PURL = {
    [URL_FULL]: "",
    [URL_PATH]: [""],
    [URL_DOMN]: [""],
    [URL_SUBD]: [""],
    [URL_QERY]: {},
    [URL_HASH]: "",
}
export type ParsedURL = Partial<typeof PURL>

const HD = {
    [HD_TITL]: "",
    [HD_DESC]: "",
    [HD_IMGU]: "",
    [HD_IMGW]: 1 || "",
    [HD_IMGH]: 1 || "",
    [HD_ICON]: "",
    [HD_TYPE]: "",
}
export type HeadData = Partial<typeof HD>
/**
 * Provides targets for data injection from DOM router
 */
const TDOM = {
    [DOM_NODE]: new HTMLElement(),
    [DOM_BODY]: null,
    [DOM_HEAD]: HD as HeadData,
}
export type TargetDOM = Partial<typeof TDOM>

const RHBD = {
    [DOM_HEAD]: HD as HeadData,
    [DOM_BODY]: null,
}
export type RouterHeadBodyData = Partial<typeof RHBD>

const RO = {
    [URL_DATA]: (RHBD as RouterHeadBodyData) || null,
    [URL_PAGE]: C as Component,
}
export type RouterOutput = typeof RO

export type Router = (url: string) => RouterOutput | Promise<RouterOutput>

const RI = {
    [URL_FULL]: "",
    [DOM_NODE]: new HTMLElement() || document,
}
export type RouterInput = typeof RI

//
//    d8                  888
//  _d88__  e88~-_   e88~\888  e88~-_
//   888   d888   i d888  888 d888   i
//   888   8888   | 8888  888 8888   |
//   888   Y888   ' Y888  888 Y888   '
//   "88_/  "88_-~   "88_/888  "88_-~
//
//

//export const router = URL => {
//    const match = URL2obj(URL)
//    const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = match

//    const { page, data } = new EquivMap([
//        [
//            { ...match, URL_PATH: [] },
//            {
//                page: d => console.log("page1:", d),
//                data: () => ({ [DOM_BODY]: "data" /*fetch("https://dummyapi.io/data/v1/user?limit=10") */}),
//            },
//        ],
//    ]).get(match)

//    return {
//        [URL_DATA]: data(),
//        [URL_PAGE]: page,
//        //[C.URL_PAGE]: page,
//    }
//}

//export const _NAVIGATE = registerRouterDOM(router)

//
//    d8                  888
//  _d88__  e88~-_   e88~\888  e88~-_
//   888   d888   i d888  888 d888   i
//   888   8888   | 8888  888 8888   |
//   888   Y888   ' Y888  888 Y888   '
//   "88_/  "88_-~   "88_/888  "88_-~
//
//

const RCFG = {
    [RTR_PREP]: ({} as Command) || ([] as Task),
    [RTR_PRFX]: "",
    [RTR_POST]: ({} as Command) || ([] as Task),
    [CFG_RUTR]: (async (url: string) => null as RouterOutput) as Router,
}
export type RouterCFG = Partial<typeof RCFG>

const DD = {
    [$$_PATH]: [""],
    [$$_LOAD]: false,
    [$$_VIEW]: C as Component,
    [$$_ROOT]: new HTMLElement(),
}
export type DefaultDraft = typeof DD
