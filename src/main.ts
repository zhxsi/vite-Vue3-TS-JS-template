import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./lang";
import "@/permission";
import "@/assets/styles/tailwind.scss";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
createApp(App)
  .use(router)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(i18n)
  .mount("#app");
