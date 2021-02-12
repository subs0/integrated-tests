import { fireEvent } from "@testing-library/dom"

import { URL_DATA, CMD_SUB$, CMD_ARGS, CMD_WORK, DOM_HEAD } from "@-0/keys"
import { run$ } from "@-0/spool"
import { INJECT_HEAD } from "../../src/commands"
import { JSDOM } from "jsdom"

let dom
let container

const html = `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="once upon a midnight weary" />
    <meta
        property="og:description"
        content="I pondered weak and weary over a many volume of forgotten lore"
    />
    <meta
        property="og:image"
        content="https://www.census.gov/content/dam/Census/public/brand/census-logo-sharing-card.jpg"
    />
    <meta property="og:image:width" content="1600" />
    <meta property="og:image:height" content="900" />
    <link rel="apple-touch-icon" sizes="57x57" href="assets/apple-icon-57x57.png" />
    <title>Page Title</title>
  </head>
</html>
`

describe("head", () => {
    beforeEach(() => {
        // https://dev.to/thawkin3/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-4io
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts

        dom = new JSDOM(html, { runScripts: "dangerously" })
        global.window = dom.window
        global.document = dom.window.document
        global.document.head.innerHTML = dom.window.document.head.innerHTML
        //global.document = new JSDOM(html, { runScripts: "dangerously" })
        //container = document.head
        //document = dom.window.document
        //container = document.head.innerHTML
    })
    test("head Command", () => {
        console.log({ container: document.head.innerHTML })
        run$.next({
            ...INJECT_HEAD,
            [CMD_ARGS] : {
                [URL_DATA] : {
                    [DOM_HEAD] : {
                        title       : "changed",
                        description : "times are a changin'",
                        img_url     : "https://images.com/2",
                        img_height  : "500",
                        img_width   : "400",
                        favicon     : "NA",
                        type        : "image"
                    }
                }
            }
        })
        console.log({ container: document.head.innerHTML })
    })
})
