# Running [NPM Scripts](https://www.twilio.com/blog/npm-scripts)

Windows (the machine I'm using), has some special needs
w/regards to NPM aliases and such. In order to run the
`go:<x>` commands, e.g., Here's an example CLI command:

```
npm run go:all --MSG=commit-message-in-kabob-case
```

The commit message passed to the lower-level scripts is
flagged with `--MSG=` (notice the capitalization here)

This will pass the commit message to
other scripts as `%npm_config_msg%`

On Unix-based systems, the format for NPM variables is
`$npm_config_msg`

Also notice that the actual variable name `_msg` isn't
capitalized in the variable declaration... Don't ask me why
this is different on Windows 🤷

## Global (CLI) Dependencies

These are required to be installed globally for `scripts`:

-   `npm-check-updates`
-   `jsdoc`
-   `concurrently`
-   `madge`
-   `typescript`
-   `jest`
-   `parcel`
-   `gh-pages`

## Last Compilation Environment

-   Node Version: 12.20.1/x64
-   OS: Windows 10

## Subtree structure

checkout
[SO](https://stackoverflow.com/questions/16134975/how-can-i-reduce-the-ever-increasing-time-to-push-a-subtree)
on the `split` command
