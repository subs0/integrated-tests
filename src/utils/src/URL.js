/**
 * @module utils/URL
 */

//import REPLACE_ME from "querystring" // FIXME remove this dependency and replace with URLSearchParams
// import gql from "nanographql"
import { URL_FULL, URL_SUBD, URL_DOMN, URL_QERY, URL_HASH, URL_PATH } from "@-0/keys"

// a function that takes an two-dimensional array of tuples (arrays with two elements [key, val]) and returns an object with those keys and values unless there is a duplicate key, in which case the values are returned as an array under that key
const tuples2obj = tuples => {
    const obj = {}
    for (const [key, val] of tuples) {
        if (obj[key]) {
            if (Array.isArray(obj[key])) {
                obj[key].push(val)
            } else {
                obj[key] = [obj[key], val]
            }
        } else {
            obj[key] = val
        }
    }
    return obj
}

/**
 *
 * Takes an href (full or relative) and pulls out the various
 * components to be used for instrumentation of various
 * high-level event handling.
 *
 * ## Examples:
 *
 * URL2obj("http://localhost:1234/about?get=some#today")
 * //?
 * //{
 * //  URL: "http://localhost:1234/about?get=some#today",
 * //  URL_subdomain: [],
 * //  URL_domain: ["localhost:1234"],
 * //  URL_path: ["about"],
 * //  URL_query: { get: "some" },
 * //  URL_hash: "today"
 * //}
 *
 * URL2obj("https://github.com/thi-ng/umbrella/#blog-posts")
 * //?
 * //{
 * //  URL: 'https://github.com/thi-ng/umbrella/#blog-posts',
 * //  URL_subdomain: [],
 * //  URL_domain: ["github", "com"],
 * //  URL_path: ["thi-ng", "umbrella"],
 * //  URL_query: {},
 * //  URL_hash: "blog-posts"
 * //}
 *
 * URL2obj("https://very-long-sub.dom.cloud.eu/site/my/happy/")
 * //?
 * //{
 * //  URL: 'https://very-long-sub.dom.cloud.eu/site/my/happy/',
 * //  URL_subdomain: ["very-long-sub", "dom"],
 * //  URL_domain: ["cloud", "eu"],
 * //  URL_path: ["site", "my", "happy"],
 * //  URL_query: {},
 * //  URL_hash: ""
 * //}
 *
 * URL2obj("https://api.census.gov/data?get=NAME&in=state:01&in=county:*")
 * //?
 * //{
 * //  URL: "https://api.census.gov/data?get=NAME&in=state:01&in=county:*",
 * //  URL_subdomain: ["api"],
 * //  URL_domain: ["census", "gov"],
 * //  URL_path: ["data"],
 * //  URL_query: { get: "NAME", in: ["state:01", "county:*"] },
 * //  URL_hash: ""
 * //}
 *
 * URL2obj("/data?get=NAME&in=state#indeed")
 * //?
 * //{
 * //  URL: "/data?get=NAME&in=state#indeed",
 * //  URL_subdomain: [],
 * //  URL_domain: [],
 * //  URL_path: ["data"],
 * //  URL_query: { get: "NAME", in: "state" },
 * //  URL_hash: "indeed"
 * //}
 *
 */
export const URL2obj = (URL_full = "", prefixRGX) => {
    // console.log("parsing...")
    let URL_subdomain = []
    let URL_domain = []
    let URL_path = []

    const splitRGX = /(?=\?)|(?=#)/g
    // split the path on any `?` and/or `#` chars (1-3 parts)
    const parts = prefixRGX ? URL_full.replace(prefixRGX, "").split(splitRGX) : URL_full.split(splitRGX)
    // take the first component of split: the core URL
    const path_str = parts[0]
    // split the path_str further into individual members and
    // remove the empty string between any adjacent slashes `//`
    const full_path = path_str.split("/").filter(x => x !== "")
    if (/http/i.test(URL_full)) {
        // if the input URL is HTTP(S), partition into sub components
        // domain is the last two members of the 2nd component
        URL_domain = full_path[1].split(".").slice(-2)
        // subdomain is anything before the domain
        // see https://stackoverflow.com/a/56921347
        // for mocking subdomain on localhost
        URL_subdomain = full_path[1].split(".").slice(0, -2)
        // path is the last component in the
        URL_path = full_path.slice(2)
    } else {
        // in the case of a relative URL `<a href="/about">
        // the relative path is the full path
        URL_path = full_path
    }
    // pull out the query component as a string
    const query_str = parts.filter(part => part.slice(0, 1) === "?")[0] || ""
    // pull out the hash component as a string
    const hash_str = parts.filter(part => part.slice(0, 1) === "#")[0] || ""
    // parse the query string into conventional parts using qs
    //const URL_query = JSON.parse(JSON.stringify(REPLACE_ME.decode(query_str.slice(1))))
    const URL_query = tuples2obj(new URLSearchParams(query_str.slice(1)).entries())
    //console.log({ query_str, URL_query })
    // remove the actual `#` hash character from the string
    const URL_hash = hash_str.slice(1)
    return {
        [URL_FULL]: URL_full,
        [URL_SUBD]: URL_subdomain,
        [URL_DOMN]: URL_domain,
        [URL_PATH]: URL_path,
        [URL_QERY]: URL_query,
        [URL_HASH]: URL_hash,
    }
}

// function that reverse engineers the tuples2obj function: takes an object and returns an array of tuples, accounting for array values
const obj2tuples = obj => {
    const tuples = []
    for (const key in obj) {
        const val = obj[key]
        if (Array.isArray(val)) {
            for (const v of val) {
                tuples.push([key, v])
            }
        } else {
            tuples.push([key, val])
        }
    }
    return tuples
}

/**
 *
 * The reverse of `parse` that enables talking to the
 * router with a friendlier API than having to always
 * construct URLs manually.
 *
 */
export const obj2URL = (parsed = URL2obj(window.location.href), isAbsolute = false) => {
    // console.log("unparsing...")

    const {
        [URL_SUBD]: URL_subdomain,
        [URL_DOMN]: URL_domain,
        [URL_PATH]: URL_path,
        [URL_QERY]: URL_query,
        [URL_HASH]: URL_hash,
    } = parsed

    const [protocol, rest] = parsed[URL_FULL].split("//")
    const [root] = rest.split("/")
    const [part_one, ...other_parts] = root.split(".")
    // console.log({ part_one, other_parts })

    const domain =
        URL_subdomain && URL_domain
            ? [...URL_subdomain, ...URL_domain]
            : URL_subdomain && other_parts.length > 1
            ? [...URL_subdomain, ...other_parts]
            : URL_subdomain && other_parts.length === 1
            ? [...URL_subdomain, part_one, ...other_parts]
            : [...URL_subdomain, part_one]

    //const query_string = REPLACE_ME.encode(URL_query)
    const tuples = obj2tuples(URL_query)
    const query_string = new URLSearchParams(tuples).toString()
    //console.log({ query_string, URL_query, tuples })
    const rootRelative = `${URL_path.length > 0 ? "/" + URL_path.join("/") : ""}${
        query_string ? "?" + query_string : ""
    }${URL_hash ? "#" + URL_hash : ""}`

    // console.log({ domain })
    // console.log({ protocol, rest, root, domain, URL_domain })
    return !isAbsolute ? rootRelative : `${protocol}//${domain.join(".")}${rootRelative}`
}

// let test1 = {
//   // URL: "https://api.census.gov",
//   // URL_subdomain: ["sub"],
//   // URL_domain: ["swing", "bloop", "com"],
//   URL_path: ["lens", "path"],
//   // URL_query: {
//   //   GQL: `
//   //       query($name: String!) {
//   //         movie(name: $name) {
//   //           releaseDate
//   //         }
//   //       }
//   //     `.replace(/ |\n/g, ""),
//   //   name: "Back to the Future"
//   // },
//   URL_hash: "scroll-to"
// }

// FURN(test1, true) //?

// URL2obj(
//   "https://poop.bloop.gov/data/wipe#something?get=NAME,B101001_10E,group(B61010)&in=state:01&in=county:*&for=tract:*"
// ) //?

// URL2obj(
//   "http://sub.swing.bloop.com/lens/path#scroll-to?GQL=query(%24name%3AString!)%7Bmovie(name%3A%24name)%7BreleaseDate%7D%7D&name=Back%20to%20the%20Future"
// ) //?
