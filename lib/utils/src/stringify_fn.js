export const stringify_fn = (x, indent) => JSON.stringify(x, (key, value) => {
    if (typeof value === "function") {
        let r = value
            .toString()
            .replace(/\r?\n|\r/g, "")
            .replace(/\s\s+/g, " ")
            .slice(0, 20) + "...";
        return r.replace(/\\"/g, '"');
    }
    else {
        return value;
    }
}, indent);
