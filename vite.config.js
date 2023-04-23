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
      "/api-prod": {
        target: "user-auth-profile-example.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod-api/, ""),
      },
    },
  },
});
