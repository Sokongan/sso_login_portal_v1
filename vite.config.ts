import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 8082,
    strictPort: true,
    allowedHosts: ["sso-staging.doj.gov.ph"],
    proxy: {
      "/api": {
        target: "https://sso-bff-staging.doj.gov.ph",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: ".doj.gov.ph",
      },
    },
  },
})
