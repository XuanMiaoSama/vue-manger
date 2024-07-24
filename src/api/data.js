/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-23
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-23
 * @FilePath     : \vue-manger\src\api\data.js
 * @Description  :
 */
import request from "../utils/request";

const getData = () => {
  return request({
    url: "reports/type/1"
  });
};

export default {
  getData
};
