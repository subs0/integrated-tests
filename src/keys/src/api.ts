import { ISubscribable, ISubscriber } from "@thi.ng/rstream/api"
import { IAtom } from "@thi.ng/atom/api"
import * as C from "./constants"
import { PubSub } from "@thi.ng/rstream"

export type Accumulator = Record<string, unknown>

/**
 * Command Object.
 *
 * The only required property is `args`
 */
export interface ICommandObject {
    [C.CMD_ARGS]: any
    [C.CMD_SUB$]?: string
    [C.CMD_RESO]?: (acc: Accumulator, res: any) => any
    [C.CMD_ERRO]?: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any
}

export interface ICommand extends ICommandObject {
    [C.CMD_WORK]: (args: any) => any
    [C.CMD_SRC$]?: ISubscribable<any> | ISubscriber<any>
}

export type Command = ICommandObject | HOTask

export type HOTask = (acc: Accumulator) => Task

export type Task = Command[]

export type Component = (data: any) => any

export interface ParsedURL {
    [C.URL_FULL]: string
    [C.URL_PATH]: string[]
    [C.URL_DOMN]: string[]
    [C.URL_SUBD]: string[]
    [C.URL_QERY]: Record<string, unknown>
    [C.URL_HASH]: string
}

/**
 * Provides targets for data injection from DOM router
 */
export interface TargetDOM {
    [C.DOM_NODE]?: HTMLElement
    [C.DOM_BODY]?: Record<string, unknown>
    [C.DOM_HEAD]?: Record<string, unknown>
}

export interface HeadData {
    [C.HD_TITL]?: string
    [C.HD_DESC]?: string
    [C.HD_IMGU]?: string
    [C.HD_IMGW]?: string | number
    [C.HD_IMGH]?: string | number
    [C.HD_ICON]?: string
    [C.HD_TYPE]?: string
}

export interface RouterHeadBodyData {
    [C.DOM_HEAD]: HeadData
    [C.DOM_BODY]: any
}

export interface RouterOutput {
    [C.URL_DATA]: RouterHeadBodyData | any
    [C.URL_PAGE]: Component
}

export type Router = (path: string) => RouterOutput

export interface RouterInput {
    [C.URL_FULL]: string
    [C.DOM_NODE]?: HTMLElement | Window
}

export interface RouterCFG {
    [C.RTR_PREP]: Command | Task
    [C.RTR_PRFX]: string
    [C.RTR_POST]: Command | Task
    [C.CFG_RUTR]: Router
}

export interface DefaultDraft {
    [C.$$_PATH]: string[]
    [C.$$_LOAD]: boolean
    [C.$$_VIEW]: Component
    [C.$$_ROOT]: HTMLElement
}
