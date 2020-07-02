export const popstate$: import("@thi.ng/rstream").Stream<Event | ErrorEvent | UIEvent | ProgressEvent<EventTarget> | AnimationEvent | MouseEvent | FocusEvent | DragEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | TouchEvent | TransitionEvent | WheelEvent>;
export const DOMContentLoaded$: import("@thi.ng/rstream").Stream<Event | ErrorEvent | UIEvent | ProgressEvent<EventTarget> | AnimationEvent | MouseEvent | FocusEvent | DragEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | TouchEvent | TransitionEvent | WheelEvent>;
export const DOMnavigated$: import("@thi.ng/rstream").Subscription<any, {
    URL: any;
    NODE: any;
}>;
import { URL_FULL } from "../../../hdom/node_modules/@-0/keys/lib/constants";
import { DOM_NODE } from "../../../hdom/node_modules/@-0/keys/lib/constants";
