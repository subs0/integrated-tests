const exec = require("child_process").execSync

const args = (msg = "scripted") =>
  process.argv.slice(2).reduce(
    (a, c) => {
      const kv = c.split("=")
      return { ...a, [kv[0]]: kv[1] }
    },
    { st: null, via: null, br: "master", msg }
  )

module.exports = {
  exec,
  args
}
