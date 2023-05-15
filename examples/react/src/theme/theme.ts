/* font-size 1em = 10px on default browser settings (16px) */
export const baseFontSize = 62.5 + "%"

//
//  888                                  888   _                      ,e,            d8
//  888-~88e  888-~\  e88~~8e    /~~~8e  888 e~ ~  888-~88e   e88~-_   "  888-~88e _d88__  d88~\
//  888  888b 888    d888  88b       88b 888d8b    888  888b d888   i 888 888  888  888   C888
//  888  8888 888    8888__888  e88~-888 888Y88b   888  8888 8888   | 888 888  888  888    Y88b
//  888  888P 888    Y888    , C888  888 888 Y88b  888  888P Y888   ' 888 888  888  888     888D
//  888-_88"  888     "88___/   "88_-888 888  Y88b 888-_88"   "88_-~  888 888  888  "88_/ \_88P
//                                                 888
//
/**
 * https://styled-system.com/table/
 *
 * Used by:
 * - layout
 * - space
 */
export const ratio = {
    gum: 3.5,
    platnum: 2.75,
    golden: 1.618,
    silver: 1.372,
}
// TODO: move to ../for-export/responsive
export const bps = [640, 900, 1300]
export const breakpoints = bps.map(bp => `${bp}px`)
//export const breakpoints = ["640px", "768px", "1024px", "1280px"]

export const borderWidths = {
    px: "1px",
    "0": "0",
    "2": "2px",
    "4": "4px",
    "8": "8px",
}

//
//                   888
//   e88~~\  e88~-_  888  e88~-_  888-~\  d88~\
//  d888    d888   i 888 d888   i 888    C888
//  8888    8888   | 888 8888   | 888     Y88b
//  Y888    Y888   ' 888 Y888   ' 888      888D
//   "88__/  "88_-~  888  "88_-~  888    \_88P
//
//
/**
 * Used by:
 * - color - https://styled-system.com/table/#color
 */

export const colors = {
    dark_5: "#373334",
    dark_3: "#5D595A",
    light_1: "#bfbeb9",
    light_3: "#f4f3ee",
    light_5: "#F6F6EE",
}

const commonButtonStyles = {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    whiteSpace: "nowrap",
}

export const buttons = {
    simple: {
        ...commonButtonStyles,
        backgroundColor: "primary",
        border: "none",
        color: "white",
        fontWeight: "bold",
        borderRadius: "default",
        "&:hover": {
            backgroundColor: "primaryHover",
            textDecoration: "none",
        },
    },
    pill: {
        ...commonButtonStyles,
        backgroundColor: "primary",
        border: "none",
        color: "white",
        fontWeight: "bold",
        borderRadius: "full",
        "&:hover": {
            backgroundColor: "primaryHover",
        },
    },
    outline: {
        ...commonButtonStyles,
        backgroundColor: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "primary",
        color: "primary",
        fontWeight: "semibold",
        borderRadius: "default",
        "&:hover": {
            backgroundColor: "primary",
            color: "white",
            borderColor: "transparent",
        },
    },
    bordered: {
        ...commonButtonStyles,
        backgroundColor: "primary",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "primaryHover",
        color: "white",
        fontWeight: "bold",
        borderRadius: "default",
        "&:hover": {
            backgroundColor: "primaryHover",
        },
    },
    disabled: {
        ...commonButtonStyles,
        backgroundColor: "primary",
        border: "none",
        opacity: 0.5,
        cursor: "not-allowed",
        color: "white",
        fontWeight: "bold",
        borderRadius: "default",
    },
    "3D": {
        ...commonButtonStyles,
        backgroundColor: "primary",
        border: "none",
        borderBottomWidth: "4px",
        borderBottomStyle: "solid",
        borderBottomColor: "primaryHover",
        color: "white",
        fontWeight: "bold",
        borderRadius: "default",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
            transform: "translateY(-1px)",
        },
    },
    elevated: {
        ...commonButtonStyles,
        backgroundColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "gray.4",
        color: "text",
        fontWeight: "bold",
        borderRadius: "default",
        boxShadow: "default",
        "&:hover": {
            backgroundColor: "gray.1",
        },
    },
}

//
//    88~\                     d8
//  _888__  e88~-_  888-~88e _d88__  d88~\
//   888   d888   i 888  888  888   C888
//   888   8888   | 888  888  888    Y88b
//   888   Y888   ' 888  888  888     888D
//   888    "88_-~  888  888  "88_/ \_88P
//
//
/**
 * Used by:
 * - typography: https://styled-system.com/table/#typography
 */
export const fonts = {
    sans: "Inter, system-ui",
    serif: "Bitter, system-ui",
    mono: '"Fira Code",monospace',
}
/**
 * Used by:
 * - typography: https://styled-system.com/table/#typography
 */
export const fontSizes = {
    xxs: "1.4rem",
    xs: "1.8rem",
    sm: "2rem",
    md: "3.5rem",
    lg: "6.4rem",
    xl: "11rem",
    xxl: "18rem",
}

/**
 * Used by:
 * - typography: https://styled-system.com/table/#typography
 */
export const fontWeights = {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
}
/**
 * Used by:
 * - typography: https://styled-system.com/table/#typography
 */
export const letterSpacings = {
    xxs: "-1rem",
    xs: "-0.5rem",
    sm: "-0.25rem",
    md: "-0.15rem",
    lg: "0.25rem",
    xl: "0.5rem",
    xxl: "1rem",
}

/**
 * Used by:
 * - typography: https://styled-system.com/table/#typography
 */
export const lineHeights = {
    xxs: "0.5",
    xs: ".8",
    sm: "1",
    md: "1.25",
    lg: "1.5",
    xl: "2",
    xxl: "3",
}

export const radii = {
    none: "0",
    sm: "0.125rem",
    default: "0.25rem",
    lg: "0.5rem",
    full: "9999px",
}

const commonInputStyles = {
    py: 2,
    px: 3,
    fontSize: "100%",
    borderRadius: "default",
    appearance: "none",
    lineHeight: "tight",
}

export const inputs = {
    shadow: {
        ...commonInputStyles,
        border: "none",
        color: "gray.7",
        boxShadow: "default",
        "&:focus": {
            outline: "none",
            boxShadow: "outline",
        },
    },
    inline: {
        ...commonInputStyles,
        backgroundColor: "gray.2",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "gray.2",
        color: "gray.7",
        "&:focus": {
            outline: "none",
            borderColor: "primary",
            backgroundColor: "white",
        },
    },
    underline: {
        ...commonInputStyles,
        backgroundColor: "transparent",
        border: "none",
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: "primary",
        borderRadius: "0px",
        color: "gray.7",
        "&:focus": {
            outline: "none",
            borderColor: "primary",
            backgroundColor: "white",
        },
    },
}

//
//         ,e,
//   d88~\  "   ~~~d88P  e88~~8e   d88~\
//  C888   888    d88P  d888  88b C888
//   Y88b  888   d88P   8888__888  Y88b
//    888D 888  d88P    Y888    ,   888D
//  \_88P  888 d88P___   "88___/  \_88P
//
//
/**
 * Used by:
 * - layout - https://styled-system.com/table/#layout
 *
 */
export const sizes = {
    xxs: "1rem",
    xs: "5rem",
    sm: "10rem",
    md: "16rem",
    lg: "26rem",
    xl: "42rem",
    xxl: "68rem",
}

//
//         888                      888
//   d88~\ 888-~88e   /~~~8e   e88~\888  e88~-_  Y88b    e    /  d88~\
//  C888   888  888       88b d888  888 d888   i  Y88b  d8b  /  C888
//   Y88b  888  888  e88~-888 8888  888 8888   |   Y888/Y88b/    Y88b
//    888D 888  888 C888  888 Y888  888 Y888   '    Y8/  Y8/      888D
//  \_88P  888  888  "88_-888  "88_/888  "88_-~      Y    Y     \_88P
//
//  https://styled-system.com/table/#shadow
/**
 * Used by:
 * - textShadow
 * - boxShadow
 */
export const shadows = {
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 0px 2px rgba(0, 0, 0, 0.03)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
    //flood: `0 0 0 200vmax ${colors.muted}`,
    none: "none",
}

//
//
//   d88~\ 888-~88e    /~~~8e   e88~~\  e88~~8e
//  C888   888  888b       88b d888    d888  88b
//   Y88b  888  8888  e88~-888 8888    8888__888
//    888D 888  888P C888  888 Y888    Y888    ,
//  \_88P  888-_88"   "88_-888  "88__/  "88___/
//         888
//
/**
 * Used by:
 * - space - https://styled-system.com/table/#space
 * -
 */
export const space = {
    xxs: "0.5rem",
    xs: "1rem",
    sm: "2rem",
    md: "4rem",
    lg: "6rem",
    xl: "12rem",
    xxl: "24rem",
}

export const zIndices = {
    auto: "auto",
    "0": "0",
    "10": "10",
    "20": "20",
    "30": "30",
    "40": "40",
    "50": "50",
}

const heading = {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    mt: 4,
}

export const styles = {
    root: {
        fontFamily: "body",
        lineHeight: "body",
        fontWeight: "body",
    },
    p: {
        lineHeight: [1.75, 2],
        fontSize: [2, 3],
        mt: [3, 4],
    },
    a: {
        color: "primary",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    strong: {
        fontWeight: "bold",
    },
    ul: {
        listStylePostition: "outside",
        mt: 3,
        mx: 4,
    },
    li: {
        listStyleType: "disc",
        lineHeight: 1.75,
        fontSize: [2, 3],
        mt: 3,
    },
    h1: {
        ...heading,
        fontSize: [6, 7],
        mt: 6,
    },
    h2: {
        ...heading,
        fontSize: [5, 6],
        pt: 5,
    },
    h3: {
        ...heading,
        fontSize: [4, 5],
        pt: 4,
    },
    h4: {
        ...heading,
        fontSize: [3, 4],
        pt: 4,
    },
    h5: {
        ...heading,
        fontSize: [2, 3],
    },
    h6: {
        ...heading,
        fontSize: [1, 2],
    },
    pre: {
        lineHeight: 1.75,
        my: 4,
        mx: -2,
    },
    code: {
        boxShadow: "inner",
        background:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat",
        color: "dark",
        fontSize: [0, 1],
        fontFamily: "mono",
        borderRadius: "default",
        p: 1,
    },
    hr: {
        background:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat",
        height: 1,
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        mt: 6,
        left: "50%",
    },
    blockquote: {
        background:
            "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPUlEQVQYV2NkQAN37979r6yszIgujiIAU4RNMVwhuiQ6H6wQl3XI4oy4FMHcCJPHcDS6J2A2EqUQpJhohQDexSef15DBCwAAAABJRU5ErkJggg==) repeat",
        fontFamily: "mono",
        fontStyle: "italic",
        fontSize: [3, 4],
        lineHeight: 1.5,
        mx: -4,
        my: 4,
        p: 5,
    },
    table: {
        borderRadius: "default",
        overflow: "hidden",
        fontSize: [1, 2],
        width: "100%",
        mt: 4,
    },
    tr: {
        backgroundColor: "muted",
        "&:first-child": {
            fontWeight: "bold",
            backgroundColor: "dark",
            color: "muted",
        },
        lineHeight: [1.75, 2],
        "&:nth-child(2n)": {
            backgroundColor: "background",
        },
    },
    td: {
        p: 2,
    },
    img: {
        display: "block",
        my: [2, 3],
        width: "100%",
        maxHeight: "500px",
        objectFit: "cover",
        borderRadius: "default",
    },
}

export const theme = {
    borderWidths,
    breakpoints,
    colors,
    fonts,
    fontSizes,
    fontWeights,
    letterSpacings,
    lineHeights,
    sizes,
    shadows,
    space,
    radii,
    zIndices,
    styles,
    buttons,
    inputs,
}

export type Theme = Partial<typeof theme>

export default theme
