const exec = require("child_process").execSync

const args = process.argv.slice(2).reduce(
  (a, c) => {
    const kv = c.split("=")
    return { ...a, [kv[0]]: kv[1] }
  },
  { st: null, via: null, br: "master", msg: "pushing to subtree" }
)

const subtree = ({ st, via, br, msg }) => {
  exec(
    `git add . && ` +
      `git commit -m "${msg}" &&` +
      `git subtree ${via} --prefix=src/${st} ${st} ${br}`,
    { stdio: [0, 1, 2] }
  )
}

console.log(`${args.via}ing subtree branch: ${args.br}`, args.st, args)

subtree(args)
