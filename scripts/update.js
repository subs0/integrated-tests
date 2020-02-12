const { exec, args } = require("./utils")

const msg = `"typecasting..."`

const update = ({ st }) => {
  exec(`"cd src/${st} && npm run git -- test"`, { stdio: [0, 1, 2] })
}
console.log(msg)
update(args(msg))

// CLI use
// node scripts\types st=spool
