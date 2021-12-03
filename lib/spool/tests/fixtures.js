import { __awaiter } from "tslib";
import { CMD_ARGS, CMD_ERRO, CMD_RESO, CMD_SUB$, CMD_WORK } from "@-0/keys";
export const warn = console.warn;
export const log = console.log;
export const a_null = null;
export const a_prim = 2;
export const a_object = { key: "lorem " };
export const a_P = x => new Promise((r, e) => setTimeout(() => r(x), 200));
export const a_async = (x) => __awaiter(void 0, void 0, void 0, function* () { return yield a_P(x); });
export const reso = (acc, res) => ({ key: acc.key + res });
export const erro = (acc, err, out) => (warn(err), out.next({ err, acc }));
export const work_str = jest.fn(y => "hello " + y);
export const cmd = {
    a_null: { [CMD_ARGS]: a_null },
    a_prim: { [CMD_ARGS]: a_prim },
    a_obj: { [CMD_ARGS]: a_object },
    a_P2prim: { [CMD_ARGS]: a_P(a_prim) },
    a_P2obj: { [CMD_ARGS]: a_P(a_object) },
    a_P2error: { [CMD_ARGS]: a_P(new Error("a_P2error")) },
    a_async: { [CMD_ARGS]: a_async },
    a_0fn2P_2pri: { [CMD_ARGS]: () => a_P(a_prim) },
    a_1fn2P_2obj: { [CMD_ARGS]: A => a_P({ key: A.key + " -> a_1fn2P_2obj" }) },
    a_1fn2P_boo: { [CMD_ARGS]: A => a_P(new Error("a_1fn2P_boo")) },
    r_2fn_yay: { [CMD_RESO]: (A, R) => ({ key: R.key + " -> r_2fn_yay" }) },
    e_3fn_err: { [CMD_ERRO]: (A, E, O) => (O.next({ [CMD_SUB$]: "error", [CMD_ARGS]: E }), 0) },
    w_fn_str: { [CMD_WORK]: jest.fn(args => args + " -> w_fn_str ") },
    w_fn_obj: { [CMD_WORK]: jest.fn(args => (Object.assign(Object.assign({}, args), { "->": "w_fn_obj" }))) }
};
describe("fixtures", () => {
    test("promise: success", () => {
        return a_P({ hello: "world" }).then(d => expect(d).toMatchObject({ hello: "world" }));
    });
    test("promise: error", () => {
        return a_P(new Error("dang")).then(d => expect(d).toMatchObject(Error("dang")));
    });
    test("async", () => {
        return a_async("hello").then(d => expect(d).toBe("hello"));
    });
    test("work callback", done => {
        work_str("earthlings");
        done();
        expect(work_str.mock.results[0].value).toBe("hello earthlings");
    });
});
