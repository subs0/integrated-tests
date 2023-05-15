import { useTheme } from "@emotion/react"
import { Theme } from "../theme"

export const useMyTheme = () => {
    const theme: Theme = useTheme()
    return theme
}
