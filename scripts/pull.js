import { exec, args } from "./utils.js"

const msg = "switching to subtree directory git pulling updates"

const pull = ({ st }) => {
    exec(`cd src/${st} && git pull origin master"`, { stdio: [0, 1, 2] })
}
pull(args(msg))

// CLI use
// node scripts\types st=spool
