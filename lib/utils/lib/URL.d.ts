export function parse(URL_full: any, prefixRGX: any): {
    URL: any;
    URL_subdomain: any;
    URL_domain: any;
    URL_path: any;
    URL_query: any;
    URL_hash: any;
};
export function unparse(parsed: any, isAbsolute?: boolean): string;
import { URL_FULL } from "../../hdom/node_modules/@-0/keys/lib/constants";
import { URL_SUBD } from "../../hdom/node_modules/@-0/keys/lib/constants";
import { URL_DOMN } from "../../hdom/node_modules/@-0/keys/lib/constants";
import { URL_PATH } from "../../hdom/node_modules/@-0/keys/lib/constants";
import { URL_QERY } from "../../hdom/node_modules/@-0/keys/lib/constants";
import { URL_HASH } from "../../hdom/node_modules/@-0/keys/lib/constants";
