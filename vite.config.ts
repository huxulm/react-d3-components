import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dsv from "@rollup/plugin-dsv";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["/node_modules/flubber"],
    },
  },
  plugins: [react(), dsv()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
