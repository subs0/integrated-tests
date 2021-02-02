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
    export const key: string;
}
export function a_P(x: any): Promise<any>;
export function a_async(x: any): Promise<any>;
export function reso(acc: any, res: any): {
    key: any;
};
export function erro(acc: any, err: any, out: any): any;
export const work_str: jest.Mock<string, [any?]>;
export namespace cmd {
    export namespace a_null {
        export { a_null as args };
    }
    export namespace a_prim {
        export { a_prim as args };
    }
    export namespace a_obj {
        export { a_object as args };
    }
    export namespace a_P2prim {
        export const args: Promise<any>;
    }
    export namespace a_P2obj {
        const args_1: Promise<any>;
        export { args_1 as args };
    }
    export namespace a_P2error {
        const args_2: Promise<any>;
        export { args_2 as args };
    }
    export namespace a_async {
        export { a_async as args };
    }
    export namespace a_0fn2P_2pri {
        export function args_3(): Promise<any>;
        export { args_3 as args };
    }
    export namespace a_1fn2P_2obj {
        export function args_4(A: any): Promise<any>;
        export { args_4 as args };
    }
    export namespace a_1fn2P_boo {
        export function args_5(A: any): Promise<any>;
        export { args_5 as args };
    }
    export namespace r_2fn_yay {
        export function reso(A: any, R: any): {
            key: string;
        };
    }
    export namespace e_3fn_err {
        export function erro(A: any, E: any, O: any): number;
    }
    export namespace w_fn_str {
        export const work: jest.Mock<string, [any?]>;
    }
    export namespace w_fn_obj {
        const work_1: jest.Mock<any, [any?]>;
        export { work_1 as work };
    }
}
