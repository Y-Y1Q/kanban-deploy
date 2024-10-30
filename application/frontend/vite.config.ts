import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()], // Add React plugin
    server: {
      proxy:
        mode === "development"
          ? {
              // Only use proxy in development mode
              "/api": {
                target: "http://localhost:3333/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""), // Only rewrite in development
              },
            }
          : undefined, // No proxy in production, will be done via Render.com
    },
  };
});
