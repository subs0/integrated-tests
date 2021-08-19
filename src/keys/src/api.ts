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

export type Router = (url: string) => RouterOutput

const RI = {
    [URL_FULL]: "",
    [DOM_NODE]: new HTMLElement() || document,
}
export type RouterInput = typeof RI

const RCFG = {
    [RTR_PREP]: ({} as Command) || ([] as Task),
    [RTR_PRFX]: "",
    [RTR_POST]: ({} as Command) || ([] as Task),
    [CFG_RUTR]: ((url: string) => null) as Router,
}
export type RouterCFG = Partial<typeof RCFG>

const DD = {
    [$$_PATH]: [""],
    [$$_LOAD]: false,
    [$$_VIEW]: C as Component,
    [$$_ROOT]: new HTMLElement(),
}
export type DefaultDraft = typeof DD
