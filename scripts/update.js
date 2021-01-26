import { exec, args } from "./utils.js"

const msg = "switching to subtree directory and running updates"

const update = ({ st, msg }) => {
  exec(`cd src/${st} && npm run git -- "${msg}"`, { stdio: [0, 1, 2] })
}
update(args(msg))

// CLI use
// node scripts\types st=spool
