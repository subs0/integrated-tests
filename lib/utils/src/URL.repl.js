import { parse, unparse } from "./URL";
parse("http://localhost:1234/about?get=some#today");
parse("https://github.com/thi-ng/umbrella/#blog-posts");
parse("https://very-long-sub.dom.cloud.eu/site/my/happy/");
parse("https://api.census.gov/data?get=NAME&in=state:01&in=county:*");
parse("/data?get=NAME&in=state#indeed");
unparse({
    URL: "https://very-long-sub.dom.cloud.eu/site/my/happy/",
    URL_subdomain: ["very-long-sub", "dom"],
    URL_domain: ["cloud", "eu"],
    URL_path: ["site", "my", "happy"],
    URL_query: { get: "some" },
    URL_hash: "",
}, true);
unparse({
    URL: "https://very-long-sub.dom.cloud.eu/site/my/happy/",
    URL_subdomain: ["very-long-sub", "dom"],
    URL_domain: ["cloud", "eu"],
    URL_path: ["site", "my", "happy"],
    URL_query: { get: "some" },
    URL_hash: "eat-at-joes",
});
