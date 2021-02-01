import qs from "querystring";
import { URL_FULL, URL_SUBD, URL_DOMN, URL_QERY, URL_HASH, URL_PATH } from "@-0/keys";
export const URL2obj = (URL_full, prefixRGX) => {
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
    const URL_query = JSON.parse(JSON.stringify(qs.decode(query_str.slice(1))));
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
export const obj2URL = (parsed = URL2obj(window.location.href), isAbsolute = false) => {
    const { [URL_FULL]: URL, [URL_SUBD]: URL_subdomain, [URL_DOMN]: URL_domain, [URL_PATH]: URL_path, [URL_QERY]: URL_query, [URL_HASH]: URL_hash } = parsed;
    const [protocol, rest] = parsed[URL_FULL].split("//");
    const [root] = rest.split("/");
    const [part_one, ...other_parts] = root.split(".");
    const domain = URL_subdomain && URL_domain
        ? [...URL_subdomain, ...URL_domain]
        : URL_subdomain && other_parts.length > 1
            ? [...URL_subdomain, ...other_parts]
            : URL_subdomain && other_parts.length === 1
                ? [...URL_subdomain, part_one, ...other_parts]
                : [...URL_subdomain, part_one];
    const query_string = qs.encode(URL_query);
    const rootRelative = `${URL_path.length > 0 ? "/" + URL_path.join("/") : ""}${query_string
        ? "?" + query_string
        : ""}${URL_hash ? "#" + URL_hash : ""}`;
    return !isAbsolute ? rootRelative : `${protocol}//${domain.join(".")}${rootRelative}`;
};
