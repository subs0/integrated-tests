import { useState, useEffect } from "react"
import { fromDOMEvent, trace, debounce, Stream } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import React, { useContext } from "react"
import { Styles } from "./api"
import { CTX } from "../context"
//import { bps, breakpoints } from "../theme"

// TODO: create CONSTS for EACH SIZE
export const default_tshirt_sizes = ["xs", "sm", "md", "lg", "xl"]

//@ts-ignore
const resize$: Stream<IResize> = fromDOMEvent(window.visualViewport, "resize")

export const size$ = resize$.transform({
    xform: map(e => ({ x: e.target.width, y: e.target.height })),
})

// Get the party started on load
resize$.next({
    target: { width: window.visualViewport.width, height: window.visualViewport.height },
})

// to be used in concert with theme/breakpoints.ts/make_responsive (userland)
export const generateBreakpoint$ = (bps, tshirt_sizes = default_tshirt_sizes) =>
    size$.map(({ x, y }) => {
        //console.log({ x, y })
        switch (true) {
            case x < bps[0]:
                return tshirt_sizes[0]
            case x < bps[1]:
                return tshirt_sizes[1]
            case x < bps[2]:
                return tshirt_sizes[2]
            case x < bps[3]:
                return tshirt_sizes[3]
            default:
                return tshirt_sizes[4]
        }
    })

const breakpoint_settings_err = (bps, arr, label) => `
    Error for responsive styles for ${label}:

    Length of responsive parameters do not match breakpoints:
    
    NUMBER OF BREAKPOINTS = ${bps.length} ${bps.map((bp, i) => `\n${i}) ${bp}`)}
    
    NUMBER OF SETTINGS PROVIDED = ${arr.length} ${arr.map((bp, i) => `\n${i}) ${bp}`)}
    
    Making mobile-first assumptions about what you want to do...
    `

export const make_responsive = (
    response_array,
    tshirt_sizes = default_tshirt_sizes,
    label = "responsive"
) => {
    //console.log({ response_array })

    const n1 = tshirt_sizes.length
    const n2 = response_array.length

    if (n1 < n2) {
        console.log(breakpoint_settings_err(tshirt_sizes, response_array, label))
    }

    return size => {
        const filled = [...response_array, ...Array(n1 - n2)]
        const config = filled.reduce((a, c, i, d) => {
            // if c === null (use the last valid setting)

            return {
                ...a,
                [tshirt_sizes[i]]:
                    c ||
                    (i >= 1 && d[i - 1]) ||
                    (i >= 2 && d[i - 2]) ||
                    (i >= 3 && d[i - 3]) ||
                    (i >= 4 && d[i - 4]) ||
                    (i >= 0 && d[i + 1]) ||
                    (i >= 0 && d[i + 2]) ||
                    (i >= 0 && d[i + 3]),
            }
        }, {})

        //console.log(config)
        return config[size]
    }
}

const configResponsiveStyler = (CTX: React.Context<{ size$: string }>) => (css: Styles) => {
    const { size$ } = useContext(CTX)
    const parsed = {}
    Object.entries(css).forEach(([k, v]) => {
        if (Array.isArray(v)) {
            parsed[k] = make_responsive(v, default_tshirt_sizes)(size$)
            return
        } else {
            parsed[k] = v
            return
        }
    })
    return parsed
}

export const useR$ = configResponsiveStyler(CTX)
