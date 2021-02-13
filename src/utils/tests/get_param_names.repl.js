import { get_param_names } from "../lib"

const _1 = function({ d, e, s }) {}
const _2 = ({ d, e, s }) => {}
const _3 = ({ d, e, s }, x) => {}
const _4 = function(x, y) {}
const _5 = function({ d, e, s }, x) {}
const _6 = ({ ["a" + "b"]: c, d }, x) => {}
const _7 = ({ [`comp `]: c, d }) => {}
// prettier-ignore
const _8 = ({ 
    d, 
    e, 
    s 
}) => {}
// prettier-ignore
const _9 = ({ 
    d, // with  
    e, // inline
    s // comments
}) => {}
// prettier-ignore
const _10 = ({ 
    // with comment above
    d, 
    e, 
    s 
}) => {}
// prettier-ignore
const _11 = ({ 
    // with comment above
    [`comp `]: c, // inline
    d,
    [`another` + "comp"]: w = "destructured",
    e
}) => {}

//
get_param_names(_1) //?
get_param_names(_2) //?
get_param_names(_3) //?
get_param_names(_4) //?
get_param_names(_5) //?
get_param_names(_6) //?
get_param_names(_7) //?
get_param_names(_8) //?
get_param_names(_9) //?
get_param_names(_10) //?
get_param_names(_11) //?
