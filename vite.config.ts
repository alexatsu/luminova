import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@shared/assets": path.resolve(__dirname, "src/shared/assets"),
      "@shared/components": path.resolve(__dirname, "src/shared/components"),
      "@shared/hooks": path.resolve(__dirname, "src/shared/hooks"),
      "@shared/pages": path.resolve(__dirname, "src/shared/pages"),
      "@shared/routes": path.resolve(__dirname, "src/shared/routes"),
      "@shared/types": path.resolve(__dirname, "src/shared/types"),
      "@shared/utils": path.resolve(__dirname, "src/shared/utils"),
      "@shared/layouts": path.resolve(__dirname, "src/shared/layouts"),
      "@shared/styles": path.resolve(__dirname, "src/shared/styles"),
      "@shared/services": path.resolve(__dirname, "src/shared/services"),
      "@shared/store": path.resolve(__dirname, "src/shared/store"),
    },
  },
});
