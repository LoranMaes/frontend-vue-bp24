import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  availableLocales: ["en", "nl", "fr"],
  messages,
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
