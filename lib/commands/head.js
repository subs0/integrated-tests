import { URL_DATA, CMD_SUB$, CMD_ARGS, CMD_WORK, DOM_HEAD, HD_TITL, HD_ICON, OG_TYPE, OG_DESC, OG_IMGU, OG_IMGW, OG_IMGH } from "@-0/keys";
import { Err_missing_props } from "@-0/utils";
import { registerCMD } from "@-0/spool";
const setFavicon = href => {
    let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = href;
    document.getElementsByTagName("head")[0].appendChild(link);
};
const getHeadProp = prop => () => document.head.querySelector(`meta[property="${prop}"]`);
const meta = prop => (getHeadProp(prop)() && getHeadProp(prop)().content) || null;
const defalt_cfg = {
    meta: {
        "og:title": document.title,
        "og:image": meta("og:image"),
        "og:image:width": meta("og:image:width"),
        "og:image:height": meta("og:image:height"),
        "og:description": meta("og:description"),
        "og:type": meta("og:type")
    },
    title: document.title,
    favicon: document.querySelector("link[rel*='icon']")
};
const replaceMeta = (obj = defalt_cfg) => {
    Object.entries(obj).forEach(([key, val]) => {
        try {
            return {
                HEAD_title: () => {
                    document.title = val;
                },
                HEAD_meta: () => {
                    Object.entries(val).forEach(([prop, content]) => {
                        if (getHeadProp(prop)())
                            getHeadProp(prop)().content = content;
                    });
                },
                HEAD_favicon: () => setFavicon(val)
            }[key]();
        }
        catch (e) {
            console.warn(e);
        }
    });
};
const conformToHead = ({ title = defalt_cfg.title, description = defalt_cfg.meta["og:description"], img_url = defalt_cfg.meta["og:image"], img_height = defalt_cfg.meta["og:image:height"], img_width = defalt_cfg.meta["og:image:width"], favicon = defalt_cfg.favicon, type = defalt_cfg.meta["og:type"] }) => ({
    HEAD_meta: {
        "og:title": title,
        "og:type": type,
        "og:description": description,
        "og:image:width": img_width,
        "og:image:height": img_height,
        "og:image": img_url
    },
    HEAD_title: title,
    HEAD_favicon: favicon
});
export const INJECT_HEAD = registerCMD({
    [CMD_SUB$]: "_INJECT_HEAD",
    [CMD_ARGS]: (acc) => ({ [URL_DATA]: acc[URL_DATA] }),
    [CMD_WORK]: (acc) => {
        const data = acc[URL_DATA];
        const head = data[DOM_HEAD];
        const props = {
            [DOM_HEAD]: head
        };
        if (head) {
            const title = head[HD_TITL];
            const description = head[OG_DESC];
            const img_url = head[OG_IMGU];
            const img_height = head[OG_IMGH];
            const img_width = head[OG_IMGW];
            const favicon = head[HD_ICON];
            const type = head[OG_TYPE];
            return replaceMeta(conformToHead({ title, description, img_url, img_height, img_width, favicon, type }));
        }
        console.warn(Err_missing_props("_INJECT_HEAD", props));
    }
});
