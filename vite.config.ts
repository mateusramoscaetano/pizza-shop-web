import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Aqui está o alias principal
      components: path.resolve(__dirname, "./src/components"), // Adicionando 'components' manualmente
      lib: path.resolve(__dirname, "./src/lib"), // Adicionando 'lib' manualmente
      // Adicione outros aliases que está utilizando
    },
  },
});
