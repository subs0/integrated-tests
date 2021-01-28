export const stringify_fn = (x, indent) => JSON.stringify(x, (key, value) => {
    if (typeof value === "function") {
        return (value
            .toString()
            .replace(/\r?\n|\r/g, "")
            .replace(/\s\s+/g, " ")
            .slice(0, 20) + "...");
    }
    else {
        return value;
    }
}, indent);
