import { ISubscribable, ISubscriber, PubSub } from "@thi.ng/rstream";
export type Accumulator = {
    [key: string | symbol]: unknown;
};
declare const ICO: {
    args: any;
    sub$: string;
    reso: (acc: Accumulator, res: any) => any;
    erro: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any;
};
export type ICommandObject = Partial<typeof ICO>;
declare const IC: {
    work: (args: any) => any;
    src$: ISubscribable<any> | ISubscriber<any>;
    args: any;
    sub$: string;
    reso: (acc: Accumulator, res: any) => any;
    erro: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any;
};
export type ICommand = Partial<typeof IC>;
export type Command = ICommandObject | HOTask;
export type HOTask = (acc: Accumulator) => Task;
export type Task = Command[];
declare const C: (data: any) => any;
export type Component = typeof C;
declare const PURL: {
    _FURL: string;
    _PATH: string[];
    _DOMN: string[];
    _SUBD: string[];
    _QERY: Record<string, unknown>;
    _HASH: string;
};
export type ParsedURL = Partial<typeof PURL>;
declare const HD: {
    title: string;
    og_description: string;
    og_image: string;
    og_image_width: string | number;
    og_image_height: string | number;
    favicon: string;
    og_type: string;
};
export type HeadData = Partial<typeof HD>;
declare const TDOM: {
    _NODE: Document | HTMLElement;
    body: any;
    head: Partial<{
        title: string;
        og_description: string;
        og_image: string;
        og_image_width: string | number;
        og_image_height: string | number;
        favicon: string;
        og_type: string;
    }>;
};
export type TargetDOM = Partial<typeof TDOM>;
declare const RHBD: {
    head: Partial<{
        title: string;
        og_description: string;
        og_image: string;
        og_image_width: string | number;
        og_image_height: string | number;
        favicon: string;
        og_type: string;
    }>;
    body: any;
};
export type RouterHeadBodyData = Partial<typeof RHBD>;
declare const RO: {
    _DATA: Partial<{
        head: Partial<{
            title: string;
            og_description: string;
            og_image: string;
            og_image_width: string | number;
            og_image_height: string | number;
            favicon: string;
            og_type: string;
        }>;
        body: any;
    }>;
    _PAGE: (data: any) => any;
};
export type RouterOutput = typeof RO;
export type Router = (url: string) => RouterOutput | Promise<RouterOutput>;
declare const RouterCMDInput: {
    _FURL: string;
    _NODE: Document | HTMLElement;
    POP_STATE: Record<string, unknown>;
};
export type RouterCommandArgs = Partial<typeof RouterCMDInput>;
declare const RC: {
    sub$: string;
    args: (args: RouterCommandArgs) => any;
};
export type RouterCommand = typeof RC;
declare const RCFG: {
    preroute: Command | Task;
    ignore_prefix: string | RegExp;
    postroute: Command | Task;
    router: Router;
};
export type RouterCFG = Partial<typeof RCFG>;
declare const DD: {
    $$_PATH: string[];
    $$_LOAD: boolean;
    $$_VIEW: (data: any) => any;
    $$_ROOT: Document | HTMLElement;
};
export type DefaultDraft = typeof DD;
export {};
