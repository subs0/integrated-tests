export declare const navEventHandler: (ev: any) => any;
export declare const cmd_nav: any;
export declare const cmd_set_link_attrs_dom: {
    sub$: string;
    args: (acc: any) => any;
    work: (acc: any) => void;
};
export declare const cmd_href_pushstate_dom: {
    sub$: string;
    args: (acc: any) => any;
    work: (acc: any) => void;
};
export declare const cmd_notify_prerender_dom: {
    sub$: string;
    args: boolean;
    work: () => boolean;
};
