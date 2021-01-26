"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLIP_LAST_INVERSE_PLAY = exports.FLIP_FIRST = void 0;
var atom_1 = require("@thi.ng/atom");
var paths_1 = require("@thi.ng/paths");
var keys_1 = require("@-0/keys");
var spool_1 = require("@-0/spool");
function getStyles(element) {
    var computedStyle = getComputedStyle(element);
    return {
        radius: computedStyle.borderRadius || 0,
    };
}
function getRect(element, frame) {
    var _a = element.getBoundingClientRect(), top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right, width = _a.width, height = _a.height;
    var parent = frame ? frame.getBoundingClientRect() : null;
    return {
        top: top - (parent ? parent.top : 0),
        bottom: bottom,
        left: left - (parent ? parent.left : 0),
        right: right,
        width: width,
        height: height,
        get transform() {
            return getComputedStyle(element).transform || undefined;
        },
    };
}
var S_path = "FLIP_shuffle";
var shuffle_paths = function (uid) { return ({
    rects: [S_path, "rects", uid],
    elems: [S_path, "elems", uid],
}); };
var FLIP_all = function (el, state, uid, frameDOMel) {
    if (frameDOMel === void 0) { frameDOMel = null; }
    var rects = shuffle_paths(uid).rects;
    if (!paths_1.getInUnsafe(state.deref(), rects))
        return state.resetIn(rects, getRect(el, frameDOMel));
    var F_flip_map = paths_1.getInUnsafe(state.deref(), rects);
    var L_flip_map = getRect(el, frameDOMel);
    var Tx = F_flip_map.left - L_flip_map.left;
    var Ty = F_flip_map.top - L_flip_map.top;
    var Sx = F_flip_map.width / L_flip_map.width;
    var Sy = F_flip_map.height / L_flip_map.height;
    el.style.transformOrigin = "0 0";
    el.style.transition = "";
    var trans = "translate(" + Tx + "px, " + Ty + "px) scale(" + Sx + ", " + Sy + ")";
    el.style.transform = trans;
    state.resetIn(rects, L_flip_map);
    requestAnimationFrame(function () {
        el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)";
        el.style.transform = "none";
    });
};
var Z_path = "FLIP_zoom";
var zoom_paths = function (uid) { return ({
    rects: [Z_path, "rects", uid],
    elems: [Z_path, "elems", uid],
    clicks: [Z_path, "clicks", uid],
    scrolls: [Z_path, "scroll", uid],
}); };
var FLIPFirst = function (_a) {
    var state = _a.state, id = _a.id, target = _a.target;
    var _b = zoom_paths(id), rects = _b.rects, clicks = _b.clicks, scrolls = _b.scrolls;
    var flip_map = getRect(target);
    state.resetIn(rects, flip_map);
    state.resetIn(clicks, true);
    state.resetIn(scrolls, { y: window.scrollY, x: window.scrollX });
};
var zIndex = function (el, idx) { return (el.style.zIndex = idx); };
var FLIPLastInvertPlay = function (_a) {
    var element = _a.element, state = _a.state, id = _a.id, _b = _a.transition, transition = _b === void 0 ? "all .5s cubic-bezier(.54,-0.29,.17,1.11)" : _b;
    element.setAttribute("flip", id);
    var _c = zoom_paths(id), rects = _c.rects, clicks = _c.clicks, scrolls = _c.scrolls;
    var F_flip_map = paths_1.getInUnsafe(state.deref(), rects) || null;
    if (!F_flip_map)
        return;
    var _d = paths_1.getInUnsafe(state.deref(), scrolls), x = _d.x, y = _d.y;
    window.scrollTo(x, y);
    element.scrollIntoView();
    var L_flip_map = getRect(element);
    var Tx = F_flip_map.left - L_flip_map.left;
    var Ty = F_flip_map.top - L_flip_map.top;
    var Sx = F_flip_map.width / L_flip_map.width;
    var Sy = F_flip_map.height / L_flip_map.height;
    element.style.transformOrigin = "top left";
    element.style.transition = "";
    var trans = "translate(" + Tx + "px, " + Ty + "px) scale(" + Sx + ", " + Sy + ")";
    element.style.transform = trans;
    requestAnimationFrame(function () {
        element.style.transformOrigin = "top left";
        element.style.transition = transition;
        element.style.transform = "none";
        setTimeout(function () { return zIndex(element, 0); }, 200);
    });
    zIndex(element, 1);
    var clicked = paths_1.getInUnsafe(state.deref(), clicks) || null;
    if (!clicked) {
        state.resetIn(rects, null);
    }
    else {
        state.resetIn(rects, L_flip_map);
    }
    state.resetIn(clicks, null);
};
var state = new atom_1.Atom({});
exports.FLIP_FIRST = spool_1.registerCMD((_a = {},
    _a[keys_1.CMD_SUB$] = "_FLIP_FIRST",
    _a[keys_1.CMD_ARGS] = function (_a) {
        var id = _a.id, target = _a.target;
        return ({ id: id, target: target });
    },
    _a[keys_1.CMD_WORK] = function (_a) {
        var id = _a.id, target = _a.target;
        return FLIPFirst({ id: id, target: target, state: state });
    },
    _a));
exports.FLIP_LAST_INVERSE_PLAY = spool_1.registerCMD((_b = {},
    _b[keys_1.CMD_SUB$] = "_FLIP_LAST_INVERSE_PLAY",
    _b[keys_1.CMD_ARGS] = function (_a) {
        var id = _a.id, element = _a.element;
        return ({ id: id, element: element });
    },
    _b[keys_1.CMD_WORK] = function (_a) {
        var id = _a.id, element = _a.element;
        return FLIPLastInvertPlay({ id: id, element: element, state: state });
    },
    _b));
