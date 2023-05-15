import React, { useState, useEffect, useRef, useCallback } from "react"
import throttle from "lodash.throttle"

export const useThrottle = (cb, delay) => {
    const options = { leading: true, trailing: false } // add custom lodash options
    const cbRef = useRef(cb)
    // use mutable ref to make useCallback/throttle not depend on `cb` dep
    useEffect(() => {
        cbRef.current = cb
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(
        throttle((...args) => cbRef.current(...args), delay, options),
        [delay]
    )
}
