/*
 * @Author       : xuanmiao kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 18:28
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-18 19:45
 * @FilePath     : e:\QD2401\04\vue-manger\src\api\index.js
 * @Description  :
 */
import request from "../utils/request";

/**
 * @description  : 登录接口
 * @param         {username:string, password:string} data
 * @return        {*}
 */
export const loginApi = (data) => {
  return request({
    url: "login",
    method: "post",
    data
  });
};
