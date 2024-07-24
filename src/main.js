/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 13:31
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-24
 * @FilePath     : \vue-manger\src\main.js
 * @Description  :
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import store from "./store";
import component from "./components";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(store);
app.use(component);
app.mount("#app");
