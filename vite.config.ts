import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      pwaAssets: {
        disabled: false,
        config: true,
      },
      includeAssets: [],
      manifest: {
        name: "Vue bp time registration for dairy farmers",
        short_name: "Vue bp time registration",
        description: "A time registration tool for dairy farmers",
        theme_color: "#ef8451",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
