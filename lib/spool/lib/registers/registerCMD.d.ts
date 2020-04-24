export function supplement$CMD(cmd: any, downstream: any): any;
export function registerCMD(command?: any): {
    sub$: any;
    args: any;
    reso: any;
    erro: any;
} | {
    sub$: any;
    args: any;
    reso?: undefined;
    erro?: undefined;
};
import { CMD_SUB$ } from "../../../hdom/node_modules/@-0/keys/lib/constants";
import { CMD_ARGS } from "../../../hdom/node_modules/@-0/keys/lib/constants";
import { CMD_RESO } from "../../../hdom/node_modules/@-0/keys/lib/constants";
import { CMD_ERRO } from "../../../hdom/node_modules/@-0/keys/lib/constants";
