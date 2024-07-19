import axios from "axios";
const baseURL = "http://127.0.0.1:8888/api/private/v1/";

const request = axios.create({
  baseURL,
  timeout: 5000
});

request.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  res => {
    if (res.data.meta.status >= 205) {
      ElMessage({
        message: res.data.meta.msg,
        showClose: true,
        duration: 1000,
        type: "error"
      });
    }
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default request;
