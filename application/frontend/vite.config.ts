import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., 'development', 'production')
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()], // Add React plugin
    server: {
      proxy: {
        // Use the environment variable for the proxy target
        "/api": {
          target: env.VITE_API_URL, // Use the VITE_API_URL from the .env file
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
