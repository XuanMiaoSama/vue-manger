/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 18:21
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-19 20:52
 * @FilePath     : \vue3_studye:\QD2401\04\vue-manger\src\utils\request.js
 * @Description  :
 */
import axios from "axios";
import store from "../store";
const baseURL = "http://127.0.0.1:8888/api/private/v1/";

const request = axios.create({
  baseURL,
  timeout: 5000
});

// #请求拦截器
request.interceptors.request.use(
  config => {
    config.headers.Authorization = store.getters.token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// #响应拦截器
request.interceptors.response.use(
  res => {
    ElMessage({
      message: res.data.meta.msg,
      showClose: true,
      duration: 1000,
      type: res.data.meta.status > 205 ? "error" : "success"
    });
    if (res.data.meta.msg === "无效token") {
      store.dispatch("user/LOGOUT_AC");
    }

    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default request;
