const { exec, args } = require("./utils")

const name = `"syncing supertree with subtree..."`

const subtree = ({ st, via, br, msg }) => {
  console.log(msg, st, via, br)
  exec(
    `git add . && ` +
      `git commit -m ${msg} && ` +
      `git subtree ${via} --prefix=src/${st} ${st} ${br}`,
    { stdio: [0, 1, 2] }
  )
}

subtree(args(name))

// CLI use
// node scripts\subtree.js st=spool via=push msg="pushing to subtree" br="master"
