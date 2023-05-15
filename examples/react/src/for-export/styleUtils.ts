export const one_border = (side = "Top", width: string | number = 0, borderColor = "grey") => {
    return {
        borderColor,
        borderStyle: "solid",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        [`border${side}Width`]: width,
    }
}

export const gap_shim = (space, bottom = true, right = false) => ({
    "@supports (-webkit-touch-callout: none) and (not (translate: none))": {
        "> *": {
            ...(bottom && { marginBottom: space }),
            ...(right && { marginRight: space }),
        },
    },
})

export const nudge_size =
    (size_obj: Record<string, string | number>) =>
    (size, distance = 1): [string, string | number] => {
        const next_size = Object.entries(size_obj).reduce((a, c, i, d) => {
            if (c[0] === size) {
                return d[i + distance]
            }
            return a
        })
        return next_size
    }

const space = {
    xxs: "0.25rem",
    xs: "0.5rem",
    sm: "1rem",
    md: "2rem",
    lg: "4rem",
    xl: "8rem",
    xxl: "32rem",
}

nudge_size(space)("sm") //?

export const responsive_padding = (space, padding) =>
    padding.map(pads => {
        return Array.isArray(pads)
            ? pads
                  .reduce((a, c) => {
                      return a.concat(" ", space[c] || c)
                  }, "")
                  .trim()
            : space[pads] || pads
    })

responsive_padding(space, [
    ["xxs", "xs"],
    ["md", "lg"],
]) //?
