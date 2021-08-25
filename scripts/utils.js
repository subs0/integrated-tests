import cp from "child_process"
const exec = cp.execSync

const args = (msg = "scripted") => {
    console.log(msg)
    //console.log({ argv: process.argv })

    return process.argv.slice(2).reduce(
        (a, c) => {
            let [k, v] = c.split("=")
            // split message
            if (k === "msg") v = v.split("-").join(" ")
            return { ...a, [k]: v }
        },
        { st: null, via: null, br: "master", msg }
    )
}

export { exec, args }
