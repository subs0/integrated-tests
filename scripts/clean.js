import { exec, args } from "./utils.js"

const msg = "cleaning lib"

const clean = ({ st }) => {
  exec(`cd src/${st} && rm -rf lib`, { stdio: [0, 1, 2] })
}
clean(args(msg))

// CLI use
// node scripts\types st=spool
