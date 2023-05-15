import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const config = ({ mode }) => {
    return defineConfig({
        plugins: [
            react({
                jsxImportSource: "@emotion/react",
                babel: {
                    plugins: ["@emotion/babel-plugin"],
                },
            }),
        ],
        define: {
            "process.env.NODE_ENV": `"${mode}"`,
        },
        esbuild: {
            logOverride: { "this-is-undefined-in-esm": "silent" },
        },
        build: {
            outDir: "./docs",
        },
    })
}

export default config
