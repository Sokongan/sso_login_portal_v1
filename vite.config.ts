import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    host: true,
    port:8082,
    strictPort:true,
    open: "https://sso-staging.doj.gov.ph",
    allowedHosts: ["https://sso-staging.doj.gov.ph"],
    proxy: {
      '/api': {
        target: 'https://sso-bff-staging.gov.ph',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: '.doj.gov.ph',
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  }
})
