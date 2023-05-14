import { exec, args } from "./utils.js"

const msg = "switching to subtree directory and running updates"

// checks into the child repo and runs its `git` script in its package.json
const update = ({ st, msg }) => {
    exec(`cd src/${st} && npm run git -- "${st}: ${msg}"`, {
        stdio: [0, 1, 2],
    })
}
update(args(msg))

// CLI use
// node scripts\types st=spool
