import { FLIP_FIRST, FLIP_LAST_INVERSE_PLAY, HURL } from "../commands";
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
export const FLIPkid = Object.freeze({
    render: (ctx, ...rest) => [
        "div",
        {
            onclick: ev => {
                ev.preventDefault();
                const target = ev.target;
                const href = target.getAttribute("href");
                if (!href)
                    return new Error(err_str("href"));
                ctx[CFG_RUN$]([
                    Object.assign(Object.assign({}, HURL), { [CMD_ARGS]: sim_event(href) }),
                    Object.assign(Object.assign({}, FLIP_FIRST), { [CMD_ARGS]: { id: href, target } })
                ]);
            }
        },
        ...rest
    ],
    init: (el, ctx) => {
        ctx[CFG_RUN$](Object.assign(Object.assign({}, FLIP_LAST_INVERSE_PLAY), { [CMD_ARGS]: {
                element: el.firstChild,
                id: el.firstChild.getAttribute("href")
            } }));
    }
});
