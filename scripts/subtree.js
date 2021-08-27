import { exec, args } from "./utils.js"

const msg = "updates package version and syncs subtree"

const subtree = ({ st, via, br, msg }) => {
    // prettier-ignore
    exec(
        //`git add . && ` + 
        //`git commit -m "${st}: ${msg}" && ` + 
        `git subtree ${via} --prefix=src/${st} ${st} ${br}`, 
        { stdio: [ 0, 1, 2 ] } 
    )
}

subtree(args(msg))

// CLI use
// node scripts\subtree.js st=spool via=push msg="pushing to subtree" br="master"
