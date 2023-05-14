import { exec, args } from "./utils.js"

const msg = "switching to subtree directory and running updates"

const patch = ({ st }) => {
    exec(`cd src/${st} && pnpm run patch`, { stdio: [0, 1, 2] })
}
patch(args(msg))

// CLI use
// node scripts\types st=spool
