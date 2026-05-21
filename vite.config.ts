// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Disable Cloudflare Workers packaging — Netlify serves static/prerendered files.
  cloudflare: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
    },
    pages: [
      { path: "/product/cabinet" },
      { path: "/product/lamp" },
      { path: "/product/table" },
      { path: "/product/chair" },
      { path: "/product/bowl" },
      { path: "/product/vase" },
      { path: "/product/floorlamp" },
      { path: "/product/sofa" },
    ],
  },
});
