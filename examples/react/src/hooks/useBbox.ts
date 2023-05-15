import { useState, MutableRefObject, RefObject, useRef } from "react"
import { useEffect } from "react"

export const useBbox = <T extends Element>(): [DOMRect | undefined, MutableRefObject<T | null>] => {
    const ref = useRef<T>(null)
    const [rect, setRect] = useState<DOMRect>()

    const set = () => setRect(ref?.current?.getBoundingClientRect())

    const useEffectInEvent = (event: "resize", useCapture?: boolean) => {
        useEffect(() => {
            set()
            window.addEventListener(event, set, useCapture)
            return () => window.removeEventListener(event, set, useCapture)
        }, [event, useCapture])
    }

    useEffectInEvent("resize")

    return [rect, ref]
}
