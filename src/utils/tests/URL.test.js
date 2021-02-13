import { URL_DATA, URL_FULL, URL_HASH, URL_PATH, URL_DOMN, URL_SUBD, URL_QERY } from "@-0/keys"
import { URL2obj, obj2URL } from "../src/URL" //?

describe("URL2obj", () => {
    test("1: absolute -> domain + path + query + hash", () =>
        expect(URL2obj("http://localhost:1234/about?get=some#today")).toStrictEqual({
            [URL_FULL] : "http://localhost:1234/about?get=some#today",
            [URL_SUBD] : [],
            [URL_DOMN] : [ "localhost:1234" ],
            [URL_PATH] : [ "about" ],
            [URL_QERY] : { get: "some" },
            [URL_HASH] : "today"
        }))
    test("2: absolute -> domain + path + hash", () =>
        expect(URL2obj("https://github.com/thi-ng/umbrella/#blog-posts")).toStrictEqual({
            [URL_FULL] : "https://github.com/thi-ng/umbrella/#blog-posts",
            [URL_SUBD] : [],
            [URL_DOMN] : [ "github", "com" ],
            [URL_PATH] : [ "thi-ng", "umbrella" ],
            [URL_QERY] : {},
            [URL_HASH] : "blog-posts"
        }))
    test("3: absolute -> domain + subdomain + path", () =>
        expect(URL2obj("https://very-long-sub.dom.cloud.eu/site/my/happy/")).toStrictEqual({
            [URL_FULL] : "https://very-long-sub.dom.cloud.eu/site/my/happy/",
            [URL_SUBD] : [ "very-long-sub", "dom" ],
            [URL_DOMN] : [ "cloud", "eu" ],
            [URL_PATH] : [ "site", "my", "happy" ],
            [URL_QERY] : {},
            [URL_HASH] : ""
        }))
    test("4: absolute -> domain + subdomain + path + query", () =>
        expect(URL2obj("https://api.census.gov/data?get=NAME&in=state:01&in=county:*")).toStrictEqual({
            [URL_FULL] : "https://api.census.gov/data?get=NAME&in=state:01&in=county:*",
            [URL_SUBD] : [ "api" ],
            [URL_DOMN] : [ "census", "gov" ],
            [URL_PATH] : [ "data" ],
            [URL_QERY] : { get: "NAME", in: [ "state:01", "county:*" ] },
            [URL_HASH] : ""
        }))
    test("5: relative -> path + query + hash", () =>
        expect(URL2obj("/data?get=NAME&in=state#indeed")).toStrictEqual({
            [URL_FULL] : "/data?get=NAME&in=state#indeed",
            [URL_SUBD] : [],
            [URL_DOMN] : [],
            [URL_PATH] : [ "data" ],
            [URL_QERY] : { get: "NAME", in: "state" },
            [URL_HASH] : "indeed"
        }))
})

describe("obj2URL", () => {
    test("1: absolute -> domain + subdomain + path + query", () =>
        expect(
            obj2URL(
                {
                    [URL_FULL] : "https://very-long-sub.dom.cloud.eu/site/my/happy/",
                    [URL_SUBD] : [ "very-long-sub", "dom" ],
                    [URL_DOMN] : [ "cloud", "eu" ],
                    [URL_PATH] : [ "site", "my", "happy" ],
                    [URL_QERY] : { get: "some" },
                    [URL_HASH] : ""
                },
                true // flag for absolute
            )
        ).toMatch("https://very-long-sub.dom.cloud.eu/site/my/happy?get=some"))
    test("2: relative -> path + query + hash", () =>
        expect(
            obj2URL({
                [URL_FULL] : "https://very-long-sub.dom.cloud.eu/site/my/happy/",
                [URL_SUBD] : [ "very-long-sub", "dom" ],
                [URL_DOMN] : [ "cloud", "eu" ],
                [URL_PATH] : [ "site", "my", "happy" ],
                [URL_QERY] : { get: "some" },
                [URL_HASH] : "eat-at-joes"
            })
        ).toMatch("/site/my/happy?get=some#eat-at-joes"))
})
