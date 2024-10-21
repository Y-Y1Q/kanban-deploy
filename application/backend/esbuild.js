import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_PATH = __dirname;
const OUT_PATH = path.join(ROOT_PATH, "dist");

const isDev = process.env.NODE_ENV === "development";
const nodePackage = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8")
);

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
  external: [
    ...Object.keys(nodePackage.dependencies ?? {}),
    ...Object.keys(nodePackage.peerDependencies ?? {}),
    ...Object.keys(nodePackage.devDependencies ?? {}),
  ],
};

async function build() {
  await esbuild.build(BE_CONFIG);
}

if (isDev) {
  async function watch() {
    let ctxBE = await esbuild.context(BE_CONFIG);
    console.log("Building and Watching BE...");
    await ctxBE.watch();
  }

  watch();
} else {
  build();
}
