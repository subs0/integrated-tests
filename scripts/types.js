const { exec, args } = require("./utils")

const msg = "typecasting..."

const types = ({ st }) => {
  console.log(msg, st)
  exec(`tsc --project src/${st}/tsconfig.build.json`)
}

types(args(msg))
