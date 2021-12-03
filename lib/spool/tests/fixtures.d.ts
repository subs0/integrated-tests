export const warn: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export const a_null: any;
export const a_prim: 2;
export namespace a_object {
    const key: string;
}
export function a_P(x: any): Promise<any>;
export function a_async(x: any): Promise<any>;
export function reso(acc: any, res: any): {
    key: any;
};
export function erro(acc: any, err: any, out: any): any;
export const work_str: jest.Mock<string, [y?: any]>;
export namespace cmd {
    namespace a_null {
        export { a_null as args };
    }
    namespace a_prim {
        export { a_prim as args };
    }
    namespace a_obj {
        export { a_object as args };
    }
    namespace a_P2prim {
        const args: Promise<any>;
    }
    namespace a_P2obj {
        const args_1: Promise<any>;
        export { args_1 as args };
    }
    namespace a_P2error {
        const args_2: Promise<any>;
        export { args_2 as args };
    }
    namespace a_async {
        export { a_async as args };
    }
    namespace a_0fn2P_2pri {
        export function args_3(): Promise<any>;
        export { args_3 as args };
    }
    namespace a_1fn2P_2obj {
        export function args_4(A: any): Promise<any>;
        export { args_4 as args };
    }
    namespace a_1fn2P_boo {
        export function args_5(A: any): Promise<any>;
        export { args_5 as args };
    }
    namespace r_2fn_yay {
        function reso(A: any, R: any): {
            key: string;
        };
    }
    namespace e_3fn_err {
        function erro(A: any, E: any, O: any): number;
    }
    namespace w_fn_str {
        const work: jest.Mock<string, [args?: any]>;
    }
    namespace w_fn_obj {
        const work_1: jest.Mock<any, [args?: any]>;
        export { work_1 as work };
    }
}
