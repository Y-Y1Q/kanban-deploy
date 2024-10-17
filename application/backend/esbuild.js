import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";

const ROOT_PATH = import.meta.dirname;
const OUT_PATH = path.join(ROOT_PATH, "dist");
console.log(ROOT_PATH);
console.log(OUT_PATH);

const isDev = process.env.NODE_ENV === "development";

if (fs.existsSync(OUT_PATH)) {
    fs.rmSync(OUT_PATH, { recursive: true, force: true });
}

const CONFIG = {
    bundle: true,
    format: "esm",
    outdir: OUT_PATH,
    minify: !isDev,
    sourcemap: isDev,
    logLevel: "info",
};

const BE_CONFIG = {
    ...CONFIG,
    entryPoints: [path.join(ROOT_PATH, "src", "server.ts")],
    platform: "node",
    packages: "external",
};

if (isDev) {
    async function watch() {
        let ctxBE = await esbuild.context(BE_CONFIG);
        console.log("Building BE");
        await ctxBE.watch();

        console.log("Watching...");
    }
    watch();
} else {
    await esbuild.build(BE_CONFIG);
}