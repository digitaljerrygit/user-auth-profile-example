import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/prod-api": {
        target: "https://example.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod-api/, ""),
      },
    },
  },
});
