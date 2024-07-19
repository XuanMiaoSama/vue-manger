/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 19:50
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-19 18:19
 * @FilePath     : \vue3_studye:\QD2401\04\vue-manger\src\utils\validator.js
 * @Description  :
 */
export const telReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/gi;
export const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
export const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
export const telPattern =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

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
export const validateEmail = (_, value, callback) => {
  if (value !== "" && !emailReg.test(value)) {
    return callback(new Error("邮箱格式错误"));
  }
  return callback();
};

export const validateTel = (_, value, callback) => {
  if (value !== "" && !telPattern.test(value)) {
    return callback(new Error("手机格式错误"));
  }
  return callback();
};

export const validateRoleName = (_, value, callback) => {
  if (value === "") {
    return callback(new Error("角色名称不能为空"));
  }
  return callback();
};

export const validateRoleDesc = (_, value, callback) => {
  if (value === "") {
    return callback(new Error("角色描述不能为空"));
  }
  return callback();
};
