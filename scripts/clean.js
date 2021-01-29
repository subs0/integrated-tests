import { exec, args } from "./utils.js"

const msg = "cleaning lib"

// cleans out the prior typescript compile and checks for updated packages
const clean = ({ st }) => {
    exec(`cd src/${st} && rm -rf lib && npm run ncu`, { stdio: [ 0, 1, 2 ] })
}
clean(args(msg))

// CLI use
// node scripts\types st=spool
