// vite.config.ts
import { VitePWA } from "file:///C:/Users/loran/OneDrive%20-%20ODISEE/Bijlagen/Bachelorproef/frontend/vue-bp-timeregistration/node_modules/vite-plugin-pwa/dist/index.js";
import { defineConfig } from "file:///C:/Users/loran/OneDrive%20-%20ODISEE/Bijlagen/Bachelorproef/frontend/vue-bp-timeregistration/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/loran/OneDrive%20-%20ODISEE/Bijlagen/Bachelorproef/frontend/vue-bp-timeregistration/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueI18nPlugin from "file:///C:/Users/loran/OneDrive%20-%20ODISEE/Bijlagen/Bachelorproef/frontend/vue-bp-timeregistration/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: "./src/assets/locales/**",
      strictMessage: false
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      pwaAssets: {
        disabled: false,
        config: true
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
            type: "image/png"
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    })
  ],
  resolve: {
    alias: {
      "@": "./src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsb3JhblxcXFxPbmVEcml2ZSAtIE9ESVNFRVxcXFxCaWpsYWdlblxcXFxCYWNoZWxvcnByb2VmXFxcXGZyb250ZW5kXFxcXHZ1ZS1icC10aW1lcmVnaXN0cmF0aW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsb3JhblxcXFxPbmVEcml2ZSAtIE9ESVNFRVxcXFxCaWpsYWdlblxcXFxCYWNoZWxvcnByb2VmXFxcXGZyb250ZW5kXFxcXHZ1ZS1icC10aW1lcmVnaXN0cmF0aW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9sb3Jhbi9PbmVEcml2ZSUyMC0lMjBPRElTRUUvQmlqbGFnZW4vQmFjaGVsb3Jwcm9lZi9mcm9udGVuZC92dWUtYnAtdGltZXJlZ2lzdHJhdGlvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tIFwiQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIFZ1ZUkxOG5QbHVnaW4oe1xuICAgICAgaW5jbHVkZTogXCIuL3NyYy9hc3NldHMvbG9jYWxlcy8qKlwiLFxuICAgICAgc3RyaWN0TWVzc2FnZTogZmFsc2UsXG4gICAgfSksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgaW5qZWN0UmVnaXN0ZXI6IFwiYXV0b1wiLFxuXG4gICAgICBwd2FBc3NldHM6IHtcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBjb25maWc6IHRydWUsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZUFzc2V0czogW10sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiBcIlZ1ZSBicCB0aW1lIHJlZ2lzdHJhdGlvbiBmb3IgZGFpcnkgZmFybWVyc1wiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIlZ1ZSBicCB0aW1lIHJlZ2lzdHJhdGlvblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJBIHRpbWUgcmVnaXN0cmF0aW9uIHRvb2wgZm9yIGRhaXJ5IGZhcm1lcnNcIixcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiI2VmODQ1MVwiLFxuICAgICAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9wd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcIi9pbWFnZXMvcHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwsc3ZnLHBuZyxpY299XCJdLFxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcbiAgICAgIH0sXG5cbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFjazogXCJpbmRleC5odG1sXCIsXG4gICAgICAgIHN1cHByZXNzV2FybmluZ3M6IHRydWUsXG4gICAgICAgIHR5cGU6IFwibW9kdWxlXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBcIi4vc3JjXCIsXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4YyxTQUFTLGVBQWU7QUFDdGUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sbUJBQW1CO0FBRzFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUVoQixXQUFXO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsZUFBZSxDQUFDO0FBQUEsTUFDaEIsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUVBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxnQ0FBZ0M7QUFBQSxRQUMvQyx1QkFBdUI7QUFBQSxRQUN2QixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUVBLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULGtCQUFrQjtBQUFBLFFBQ2xCLGtCQUFrQjtBQUFBLFFBQ2xCLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
