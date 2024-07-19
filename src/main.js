/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 13:31
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-19 08:34
 * @FilePath     : \vue3_studye:\QD2401\04\vue-manger\src\main.js
 * @Description  :
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(store);
app.mount("#app");
