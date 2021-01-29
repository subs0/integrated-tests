import { stringify_type } from '../lib/stringify_type'

const nullary2prim = () => 1
const unary2prim = x => x + 1
const binary2prim = (x, y) => x + y
const nAry2prim = (x, y, z) => x + y + z
const promise2prim = new Promise.resolve(1)
const obj = { x: 1 }

test('stringify_type: nullary', () => expect(stringify_type(nullary2prim) === 'NULLARY'))
