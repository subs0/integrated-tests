import { URL2obj, obj2URL } from "../src/URL" //?

URL2obj("http://localhost:1234/about?get=some#today")
//?
//{
//  URL: "http://localhost:1234/about?get=some#today",
//  URL_subdomain: [],
//  URL_domain: ["localhost:1234"],
//  URL_path: ["about"],
//  URL_query: { get: "some" },
//  URL_hash: "today"
//}

URL2obj("https://github.com/thi-ng/umbrella/#blog-posts")
//?
//{
//  URL: 'https://github.com/thi-ng/umbrella/#blog-posts',
//  URL_subdomain: [],
//  URL_domain: ["github", "com"],
//  URL_path: ["thi-ng", "umbrella"],
//  URL_query: {},
//  URL_hash: "blog-posts"
//}

URL2obj("https://very-long-sub.dom.cloud.eu/site/my/happy/")
//?
//{
//  URL: 'https://very-long-sub.dom.cloud.eu/site/my/happy/',
//  URL_subdomain: ["very-long-sub", "dom"],
//  URL_domain: ["cloud", "eu"],
//  URL_path: ["site", "my", "happy"],
//  URL_query: {},
//  URL_hash: ""
//}

URL2obj("https://api.census.gov/data?get=NAME&in=state:01&in=county:*")
//?
//{
//  URL: "https://api.census.gov/data?get=NAME&in=state:01&in=county:*",
//  URL_subdomain: ["api"],
//  URL_domain: ["census", "gov"],
//  URL_path: ["data"],
//  URL_query: { get: "NAME", in: ["state:01", "county:*"] },
//  URL_hash: ""
//}

URL2obj("/data?get=NAME&in=state#indeed")
//?
//{
//  URL: "/data?get=NAME&in=state#indeed",
//  URL_subdomain: [],
//  URL_domain: [],
//  URL_path: ["data"],
//  URL_query: { get: "NAME", in: "state" },
//  URL_hash: "indeed"
//}

obj2URL(
    {
        URL: "https://very-long-sub.dom.cloud.eu/site/my/happy/",
        URL_subdomain: [ "very-long-sub", "dom" ],
        URL_domain: [ "cloud", "eu" ],
        URL_path: [ "site", "my", "happy" ],
        URL_query: { get: "some" },
        URL_hash: ""
    },
    true
)
//?
// https://very-long-sub.dom.cloud.eu/site/my/happy?get=some

obj2URL({
    URL: "https://very-long-sub.dom.cloud.eu/site/my/happy/",
    URL_subdomain: [ "very-long-sub", "dom" ],
    URL_domain: [ "cloud", "eu" ],
    URL_path: [ "site", "my", "happy" ],
    URL_query: { get: "some" },
    URL_hash: "eat-at-joes"
})
//?
// /site/my/happy?get=some#eat-at-joes
