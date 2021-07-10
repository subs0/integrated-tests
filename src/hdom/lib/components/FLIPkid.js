import { cmd_flip_first, cmd_flip_last_inverse_play } from "@-0/browser";
import { registerCMD } from "@-0/spool";
import { isPlainObject } from "@thi.ng/checks";
import { CFG_RUN$, CMD_ARGS } from "@-0/keys";
const err_str = prop => `
  No '${prop}' property found on FLIPkid firstChild. 
  Ensure you are providing FLIPkid a component with an 
  attributes object as its second argument with a ${prop}
  property for proper FLIP routing.
`;
const sim_event = href => ({
    currentTarget: { document: null },
    target: {
        href
    }
});
const FLIP_FIRST = registerCMD(cmd_flip_first);
const FLIP_LAST_INVERSE_PLAY = registerCMD(cmd_flip_last_inverse_play);
const _attrs = (ctx, NAV) => ({
    onclick: ev => {
        ev.preventDefault();
        const target = ev.target;
        const href = target.getAttribute("href");
        if (!href)
            return new Error(err_str("href"));
        ctx[CFG_RUN$]([Object.assign(Object.assign({}, NAV), { [CMD_ARGS]: sim_event(href) }), Object.assign(Object.assign({}, FLIP_FIRST), { [CMD_ARGS]: { id: href, target } })]);
    }
});
export const FLIPkid = _NAV => Object.freeze({
    render: (ctx, attrs, ...rest) => isPlainObject(attrs)
        ?
            [
                "div",
                Object.assign(Object.assign({}, attrs), _attrs(ctx, _NAV)),
                ...rest
            ]
        : ["div", _attrs(ctx, _NAV), attrs, ...rest],
    init: (el, ctx) => {
        ctx[CFG_RUN$](Object.assign(Object.assign({}, FLIP_LAST_INVERSE_PLAY), { [CMD_ARGS]: {
                element: el.firstChild,
                id: el.firstChild.getAttribute("href")
            } }));
    }
});
