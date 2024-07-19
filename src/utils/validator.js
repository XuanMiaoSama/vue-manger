/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 19:50
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-19 08:25
 * @FilePath     : \vue3_studye:\QD2401\04\vue-manger\src\utils\validator.js
 * @Description  :
 */
export const telReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/gi;
export const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;

export const validateUser = (_, value, callback) => {
  // console.log(value, "user");
  if (value === "") {
    return callback(new Error("请输入账户"));
  }
  if (!uPattern.test(value)) {
    return callback(new Error("账户格式错误"));
  }
  return callback();
};

export const validatePass = (_, value, callback) => {
  // console.log(value, "pass");
  if (value === "") {
    return callback(new Error("请输入密码"));
  }
  return callback();
};
