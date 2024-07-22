/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-19 20:39
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-22 14:45
 * @FilePath     : \vue-manger\src\api\right.js
 * @Description  :
 */
import request from "../utils/request";

/**
 * @description  : 获取权限列表
 * @param         {string} type
 * @return        {*}
 */
const rightList = (type) => {
  return request({
    url: `rights/${type}`
  });
};

export default {
  rightList
};
