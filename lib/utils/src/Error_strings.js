import { CMD_ARGS } from "@-0/keys";
export const Err_missing_props = (CMD, ...props) => {
    const missing = props.map(x => `- No ${x} prop found`).join("\n") + `\n`;
    return `
Error: Missing critical ${CMD} Command \`${CMD_ARGS}\`:
${missing}
    `;
};
