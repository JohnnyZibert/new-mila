import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, normalizePath } from "vite";
import svgr from "vite-plugin-svgr";
import { createRequire } from "node:module";
import path from "node:path";
import { viteStaticCopy } from "vite-plugin-static-copy";

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr({
        include: "**/*.svg?react",
      }),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      viteStaticCopy({
        targets: [
          {
            src: cMapsDir,
            dest: "",
          },
        ],
      }),
    ],
  };
});
