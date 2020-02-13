import { Atom } from "@thi.ng/atom";
import { getIn } from "@thi.ng/paths";
import { CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys";
import { registerCMD } from "@-0/spool";
function getStyles(element) {
    const computedStyle = getComputedStyle(element);
    return {
        radius: computedStyle.borderRadius || 0
    };
}
function getRect(element, frame) {
    const { top, bottom, left, right, width, height } = element.getBoundingClientRect();
    const parent = frame ? frame.getBoundingClientRect() : null;
    return {
        top: top - (parent ? parent.top : 0),
        bottom,
        left: left - (parent ? parent.left : 0),
        right,
        width,
        height,
        get transform() {
            return getComputedStyle(element).transform || undefined;
        }
    };
}
const S_path = "FLIP_shuffle";
const shuffle_paths = uid => ({
    rects: [S_path, "rects", uid],
    elems: [S_path, "elems", uid]
});
const FLIP_all = (el, state, uid, frameDOMel = null) => {
    const { rects } = shuffle_paths(uid);
    if (!getIn(state.deref(), rects))
        return state.resetIn(rects, getRect(el, frameDOMel));
    const F_flip_map = getIn(state.deref(), rects);
    const L_flip_map = getRect(el, frameDOMel);
    const Tx = F_flip_map.left - L_flip_map.left;
    const Ty = F_flip_map.top - L_flip_map.top;
    const Sx = F_flip_map.width / L_flip_map.width;
    const Sy = F_flip_map.height / L_flip_map.height;
    el.style.transformOrigin = "0 0";
    el.style.transition = "";
    const trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`;
    el.style.transform = trans;
    state.resetIn(rects, L_flip_map);
    requestAnimationFrame(() => {
        el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)";
        el.style.transform = "none";
    });
};
const Z_path = "FLIP_zoom";
const zoom_paths = uid => ({
    rects: [Z_path, "rects", uid],
    elems: [Z_path, "elems", uid],
    clicks: [Z_path, "clicks", uid],
    scrolls: [Z_path, "scroll", uid]
});
const FLIPFirst = ({ state, id, target }) => {
    const { rects, clicks, scrolls } = zoom_paths(id);
    const flip_map = getRect(target);
    state.resetIn(rects, flip_map);
    state.resetIn(clicks, true);
    state.resetIn(scrolls, { y: window.scrollY, x: window.scrollX });
};
const zIndex = (el, idx) => (el.style.zIndex = idx);
const FLIPLastInvertPlay = ({ element, state, id, transition = "all .5s cubic-bezier(.54,-0.29,.17,1.11)" }) => {
    element.setAttribute("flip", id);
    const { rects, clicks, scrolls } = zoom_paths(id);
    const F_flip_map = getIn(state.deref(), rects) || null;
    if (!F_flip_map)
        return;
    const { x, y } = getIn(state.deref(), scrolls);
    window.scrollTo(x, y);
    element.scrollIntoView();
    let L_flip_map = getRect(element);
    const Tx = F_flip_map.left - L_flip_map.left;
    const Ty = F_flip_map.top - L_flip_map.top;
    const Sx = F_flip_map.width / L_flip_map.width;
    const Sy = F_flip_map.height / L_flip_map.height;
    element.style.transformOrigin = "top left";
    element.style.transition = "";
    const trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`;
    element.style.transform = trans;
    requestAnimationFrame(() => {
        element.style.transformOrigin = "top left";
        element.style.transition = transition;
        element.style.transform = "none";
        setTimeout(() => zIndex(element, 0), 200);
    });
    zIndex(element, 1);
    const clicked = getIn(state.deref(), clicks) || null;
    if (!clicked) {
        state.resetIn(rects, null);
    }
    else {
        state.resetIn(rects, L_flip_map);
    }
    state.resetIn(clicks, null);
};
const state = new Atom({});
export const flipFirstCMD = {
    [CMD_SUB$]: "_FLIP_FIRST",
    [CMD_ARGS]: ({ id, target }) => ({ id, target }),
    [CMD_WORK]: ({ id, target }) => FLIPFirst({ id, target, state })
};
export const FLIP_FIRST = registerCMD(flipFirstCMD);
export const flipLastCMD = {
    [CMD_SUB$]: "_FLIP_LAST_INVERSE_PLAY",
    [CMD_ARGS]: ({ id, element }) => ({ id, element }),
    [CMD_WORK]: ({ id, element }) => FLIPLastInvertPlay({ id, element, state })
};
export const FLIP_LAST_INVERSE_PLAY = registerCMD(flipLastCMD);
