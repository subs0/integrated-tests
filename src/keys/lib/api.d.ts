import { ISubscribable, ISubscriber, PubSub } from "@thi.ng/rstream";
export declare type Accumulator = Record<string, unknown>;
declare const ICO: {
    args: any;
    sub$: string;
    reso: (acc: Accumulator, res: any) => any;
    erro: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any;
};
export declare type ICommandObject = Partial<typeof ICO>;
declare const IC: {
    work: (args: any) => any;
    src$: ISubscribable<any> | ISubscriber<any>;
    args: any;
    sub$: string;
    reso: (acc: Accumulator, res: any) => any;
    erro: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any;
};
export declare type ICommand = Partial<typeof IC>;
export declare type Command = ICommandObject | HOTask;
export declare type HOTask = (acc: Accumulator) => Task;
export declare type Task = Command[];
declare const C: (data: any) => any;
export declare type Component = typeof C;
declare const PURL: {
    fURL: string;
    path: string[];
    domn: string[];
    subd: string[];
    qery: Record<string, unknown>;
    hash: string;
};
export declare type ParsedURL = Partial<typeof PURL>;
declare const HD: {
    title: string;
    og_description: string;
    og_image: string;
    og_image_width: string | number;
    og_image_height: string | number;
    favicon: string;
    og_type: string;
};
export declare type HeadData = Partial<typeof HD>;
declare const TDOM: {
    node: Document | HTMLElement;
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
export declare type TargetDOM = Partial<typeof TDOM>;
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
export declare type RouterHeadBodyData = Partial<typeof RHBD>;
declare const RO: {
    data: Partial<{
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
    page: (data: any) => any;
};
export declare type RouterOutput = typeof RO;
export declare type Router = (url: string) => RouterOutput | Promise<RouterOutput>;
declare const RI: {
    fURL: string;
    node: Document | HTMLElement;
};
export declare type RouterInput = typeof RI;
declare const RCFG: {
    preroute: Command | Task;
    ignore_prefix: string;
    postroute: Command | Task;
    router: Router;
};
export declare type RouterCFG = Partial<typeof RCFG>;
declare const DD: {
    $$_PATH: string[];
    $$_LOAD: boolean;
    $$_VIEW: (data: any) => any;
    $$_ROOT: Document | HTMLElement;
};
export declare type DefaultDraft = typeof DD;
export {};
