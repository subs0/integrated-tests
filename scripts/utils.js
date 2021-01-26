import cp from "child_process"
const exec = cp.execSync

const args = (msg = "scripted") => (
  console.log(msg),
  process.argv.slice(2).reduce(
    (a, c) => {
      const kv = c.split("=")
      return { ...a, [kv[0]]: kv[1] }
    },
    { st: null, via: null, br: "master", msg }
  )
)

export { exec, args }
