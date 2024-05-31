import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import mkCert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: "./src/assets/locales/**",
      strictMessage: false,
    }),
    mkCert({
      savePath: "./certs",
      force: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      pwaAssets: {
        disabled: false,
        config: true,
      },
      // Cache all static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        name: "Vue bp time registration for dairy farmers",
        short_name: "Vue bp time registration",
        description: "A time registration tool for dairy farmers",
        theme_color: "#ef8451",
        start_url: "./index.html",
        scope: "/",
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
      // Cache all imports with these extensions
      workbox: {
        globPatterns: ["**/*"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "CacheFirst" as const,
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
        navigateFallback: "index.html",
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
