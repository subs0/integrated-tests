const { exec, args } = require("./utils")

const msg = "syncing supertree with subtree"

const subtree = ({ st, via, br, msg }) => {
  exec(
    `git add . && ` +
      `git commit -m "${msg}" && ` +
      `git subtree ${via} --prefix=src/${st} ${st} ${br}`,
    { stdio: [0, 1, 2] }
  )
}

// @ts-ignore
subtree(args(msg))

// CLI use
// node scripts\subtree.js st=spool via=push msg="pushing to subtree" br="master"
