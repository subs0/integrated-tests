export function diff_keys(nKeys = [], nObj = {}) {
    const all = Object.keys(nObj);
    const xKeys = all.filter(key => !nKeys.includes(key));
    const xObj = Object.entries(nObj).reduce((a, [k, v]) => {
        if (!nKeys.includes(k))
            return Object.assign(Object.assign({}, a), { [k]: v });
        else
            return a;
    }, {});
    return [xKeys, xObj];
}
