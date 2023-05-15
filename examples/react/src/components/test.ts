import "./test.css"
import postcss from "postcss"
import removeprefix from "postcss-remove-prefixes"

postcss([removeprefix()]).process(css).css //?
