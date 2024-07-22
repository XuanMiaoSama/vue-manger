import request from "../utils/request";

/**
 * @description  : 获取用户数据列表
 * @param         {{pagenum:number,pagesize:number,query:string}} params
 * @return        {*}
 */
const userList = (params) => {
  return request({
    url: "users",
    method: "get",
    params
  });
};

/**
 * @description  : 添加用户
 * @param         {{username:string,password:string,email:string,mobile:string}} data
 * @return        {*}
 */
const addUser = (data) => {
  return request({
    url: "users",
    method: "post",
    data
  });
};

/**
 * @description  : 更新用户状态
 * @param         {{id:string|number,mg_state:string|boolean}} data
 * @return        {*}
 */
const updateState = (data) => {
  return request({
    url: `users/${data.id}/state/${data.mg_state}`,
    method: "put"
  });
};

/**
 * @description  : 查询用户信息
 * @param         {string|number} id
 * @return        {*}
 */
const selectUser = (id) => {
  return request({
    url: `users/${id}`
  });
};

/**
 * @description  : 更新用户信息
 * @param         {{email:string,mobile:string}} data
 * @param         {string|number} id
 * @return        {*}
 */
const updateUser = (data, id) => {
  return request({
    url: `users/${id}`,
    method: "put",
    data
  });
};

/**
 * @description  : 删除用户
 * @param         {string|number} id
 * @return        {*}
 */
const delUser = (id) => {
  return request({
    url: `users/${id}`,
    method: "delete"
  });
};

/**
 * @description  : 分配用户角色
 * @param         {string|number} id
 * @param         {string|number} rid
 * @return        {*}
 */
//! 未完成
const addUserRole = (id, rid) => {
  return request({
    url: `users/${id}/role`,
    method: "put"
  });
};

export default {
  userList,
  addUser,
  updateState,
  selectUser,
  updateUser,
  delUser
};
