import qs from "querystring";
import { URL_FULL, URL_SUBD, URL_DOMN, URL_QERY, URL_HASH, URL_PATH } from "@-0/keys";
export const parse = (URL_full, prefixRGX) => {
    let URL_subdomain = [];
    let URL_domain = [];
    let URL_path = [];
    const splitRGX = /(?=\?)|(?=#)/g;
    const parts = prefixRGX
        ? URL_full.replace(prefixRGX, "").split(splitRGX)
        : URL_full.split(splitRGX);
    const path_str = parts[0];
    const full_path = path_str.split("/").filter(x => x !== "");
    if (/http/i.test(URL_full)) {
        URL_domain = full_path[1].split(".").slice(-2);
        URL_subdomain = full_path[1].split(".").slice(0, -2);
        URL_path = full_path.slice(2);
    }
    else {
        URL_path = full_path;
    }
    const query_str = parts.filter(part => part.slice(0, 1) === "?")[0] || "";
    const hash_str = parts.filter(part => part.slice(0, 1) === "#")[0] || "";
    const URL_query = qs.parse(query_str.slice(1));
    const URL_hash = hash_str.slice(1);
    return {
        [URL_FULL]: URL_full,
        [URL_SUBD]: URL_subdomain,
        [URL_DOMN]: URL_domain,
        [URL_PATH]: URL_path,
        [URL_QERY]: URL_query,
        [URL_HASH]: URL_hash
    };
};
export const unparse = (parsed, isAbsolute = false) => {
    const { [URL_SUBD]: URL_subdomain, [URL_DOMN]: URL_domain, [URL_PATH]: URL_path, [URL_QERY]: URL_query, [URL_HASH]: URL_hash } = parse(parsed[URL_FULL] || window.location.href);
    const { _URL_subdomain = URL_subdomain, _URL_domain = URL_domain, _URL_path = URL_path, _URL_query = URL_query, _URL_hash = URL_hash } = parsed;
    const [protocol, rest] = URL_FULL.split("//");
    const [root] = rest.split("/");
    const [part_one, ...other_parts] = root.split(".");
    const domain = _URL_subdomain && _URL_domain
        ? [..._URL_subdomain, ..._URL_domain]
        : _URL_subdomain && other_parts.length > 1
            ? [..._URL_subdomain, ...other_parts]
            : _URL_subdomain && other_parts.length === 1
                ? [..._URL_subdomain, part_one, ...other_parts]
                : [..._URL_subdomain, part_one];
    const query_string = qs.encode(_URL_query);
    const rootRelative = `${_URL_path.length > 0 ? "/" + _URL_path.join("/") : ""}${_URL_hash ? "#" + _URL_hash : null}?${query_string}`;
    return !isAbsolute ? rootRelative : `${protocol}//${domain.join(".")}${rootRelative}`;
};
