import { ISubscribable, ISubscriber } from "@thi.ng/rstream/api"
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
import { PubSub } from "@thi.ng/rstream"

export type Accumulator = Record<string, unknown>

/**
 * Command Object.
 *
 * The only required property is `args`
 */
export type ICommandObject = {
    [CMD_ARGS]: any
    [CMD_SUB$]?: string
    [CMD_RESO]?: (acc: Accumulator, res: any) => any
    [CMD_ERRO]?: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any
}

export type ICommand = ICommandObject & {
    [CMD_WORK]: (args: any) => any
    [CMD_SRC$]?: ISubscribable<any> | ISubscriber<any>
}

export type Command = ICommandObject | HOTask

export type HOTask = (acc: Accumulator) => Task

export type Task = Command[]

export type Component = (data: any) => any

export type ParsedURL = {
    [URL_FULL]: string
    [URL_PATH]: string[]
    [URL_DOMN]: string[]
    [URL_SUBD]: string[]
    [URL_QERY]: Record<string, unknown>
    [URL_HASH]: string
}

/**
 * Provides targets for data injection from DOM router
 */
export type TargetDOM = {
    [DOM_NODE]?: HTMLElement
    [DOM_BODY]?: Record<string, unknown>
    [DOM_HEAD]?: Record<string, unknown>
}

export type HeadData = {
    [HD_TITL]?: string
    [HD_DESC]?: string
    [HD_IMGU]?: string
    [HD_IMGW]?: string | number
    [HD_IMGH]?: string | number
    [HD_ICON]?: string
    [HD_TYPE]?: string
}

export type RouterHeadBodyData = {
    [DOM_HEAD]: HeadData
    [DOM_BODY]: any
}

export type RouterOutput = {
    [URL_DATA]: RouterHeadBodyData | any
    [URL_PAGE]: Component
}

export type Router = (path: string) => RouterOutput

export type RouterInput = {
    [URL_FULL]: string
    [DOM_NODE]?: HTMLElement | Window
}

export type RouterCFG = {
    [RTR_PREP]: Command | Task
    [RTR_PRFX]: string
    [RTR_POST]: Command | Task
    [CFG_RUTR]: Router
}

export type DefaultDraft = {
    [$$_PATH]: string[]
    [$$_LOAD]: boolean
    [$$_VIEW]: Component
    [$$_ROOT]: HTMLElement
}
