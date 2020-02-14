import { IAtom } from "@thi.ng/atom";
import { BootCFG, Command } from "@-0/keys";
export declare const registerRouterCMD: Command;
export declare const registerRouterDOM: (router: any) => any;
export declare const registerDOMrouterCMD: (router: any) => Command;
export declare const pair: (globalStore?: IAtom<Object>, Commands?: Command[]) => ((CFG: BootCFG) => void)[];
export declare const boot: (CFG: BootCFG) => void;
