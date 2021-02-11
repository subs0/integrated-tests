import { ISubscribable } from "@thi.ng/rstream"
import { IAtom } from "@thi.ng/atom/api"
import * as C from "./constants"

export interface ParsedURL {
    [C.URL_FULL]: string
    [C.URL_PATH]: []
    [C.URL_DOMN]: []
    [C.URL_SUBD]: []
    [C.URL_QERY]: {}
    [C.URL_HASH]: string
}

/**
 * Provides targets for data injection from DOM router
 */
export interface TargetDOM {
    [C.DOM_NODE]?: HTMLElement
    [C.DOM_BODY]?: {}
    [C.DOM_HEAD]?: {}
}
/**
 * Command Object.
 *
 * The only required property is `args`
 */
export interface ICommand {
    [C.CMD_ARGS]: any
    [C.CMD_SUB$]?: string
    [C.CMD_RESO]?: (acc: {}, res: {}) => any
    [C.CMD_ERRO]?: (acc: {}, err: Error, out$: ISubscribable<any>) => any
    [C.CMD_WORK]?: (args: any) => any
    [C.CMD_SRC$]?: ISubscribable<any>
}

export type Command = ICommand | Function

export type Accumulator = {}

export type HOCommand = (acc: Accumulator) => Command

export type Task = [Command | HOCommand]

export type HOTask = (acc: Accumulator) => Task

/**
 *
 * Configuration for boot config
 * FIXME
 */
export interface BootCFG {
    [C.CFG_RUTR]: {} | Function
    [C.CFG_RUN$]?: any
    [C.CFG_STOR]?: IAtom<any>
    [C.CFG_ROOT]?: HTMLElement
    [C.CFG_VIEW]?: Function
    [C.CFG_DRFT]?: {}
    [C.CFG_LOG$]?: string
    [C.CFG_KICK]?: boolean
}

export interface DefaultDraft {
    [C.$$_PATH]: []
    [C.$$_LOAD]: boolean
    [C.$$_VIEW]: Function
    [C.$$_ROOT]: HTMLElement
    [C.$$_CMDS]: []
}

export type Router = (path: string) => object
export interface RouterCFG {
    [C.ROUTER_PREP]: Command | Task
    [C.ROUTER_PRFX]: string
    [C.ROUTER_POST]: Command | Task
    [C.CFG_RUTR]: Router
}
