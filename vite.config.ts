import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

import "react";
import "react-dom";

export default defineConfig({
  root: "./client",
  server: {
    port: 3000,
    // Vite 8: Forward browser console logs to terminal
    forwardConsole: true,
  },
  resolve: {
    // Vite 8: Native TypeScript path alias support
    tsconfigPaths: true,
  },
  envPrefix: "VITE_",
  plugins: [
    react(),
    deno(),
  ],
  build: {
    // Vite 8 uses Rolldown by default
    rolldownOptions: {
      output: {
        // Optimize chunk splitting for better caching
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    // Cache directory for faster rebuilds
    cacheDir: ".vite/cache",
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
    exclude: [],
  },
  experimental: {
    // Enable Rust-based native plugins for better performance
    enableNativePlugin: true,
  },
});
