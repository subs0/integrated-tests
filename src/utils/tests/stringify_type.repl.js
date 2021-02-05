import { stringify_type } from "../src/stringify_type"

stringify_type({ error: "this is a long string that will be cut" }) // ?
