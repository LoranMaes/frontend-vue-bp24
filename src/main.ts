import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "./style.scss";
import App from "./App.vue";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";
import router from "./router";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  availableLocales: ["en", "nl", "fr"],
  messages,
});

const pinia = createPinia();

const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.use(VueQueryPlugin);
app.use(router);
app.mount("#app");
