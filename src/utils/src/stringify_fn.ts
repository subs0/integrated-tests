/**
 * Uses a JSON.stringify "replacer" function to preserve a
 * small (truncated) version of the function signature for
 * Object values that contain them
 *
 * @format
 */
export const stringify_fn = (x, indent?) =>
    JSON.stringify(
        x,
        (key, value) => {
            if (typeof value === "function") {
                let r =
                    value
                        .toString()
                        .replace(/\r?\n|\r/g, "") // get rid of stuff
                        .replace(/\s\s+/g, " ")
                        .slice(0, 20) + "..."
                return r.replace(/\\"/g, '"')
            } else {
                return value
            }
        },
        indent
    )
