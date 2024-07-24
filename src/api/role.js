import request from "../utils/request";

/**
 * @description  : 获取角色列表
 * @return        {*}
 */
const roleList = () => {
  return request({
    url: "roles"
  });
};

/**
 * @description  : 添加角色
 * @param         {{roleName:string,roleDesc:string}} data
 * @return        {*}
 */
const addRole = (data) => {
  return request({
    url: "roles",
    method: "post",
    data
  });
};

/**
 * @description  : 根据id查询角色
 * @param         {string|number} id
 * @return        {*}
 */
const selectRole = (id) => {
  return request({
    url: `roles/${id}`
  });
};

/**
 * @description  : 更新角色信息
 * @param         {string|number} id
 * @param         {{roleName:string,roleDesc:string}} data
 * @return        {*}
 */
const updateRole = (id, data) => {
  return request({
    url: `roles/${id}`,
    method: "put",
    data
  });
};

/**
 * @description  : 删除角色
 * @param         {string|number} id
 * @return        {*}
 */
const delRole = (id) => {
  return request({
    url: `roles/${id}`,
    method: "delete"
  });
};

/**
 * @description  : 添加角色授权
 * @param         {string|number} id
 * @param         {string} rids
 * @return        {*}
 */
const addRoleRight = (id, rids) => {
  return request({
    url: `roles/${id}/rights`,
    method: "post",
    data: {
      rids
    }
  });
};

/**
 * @description  : 删除角色权限
 * @param         {string|number} roleId
 * @param         {string|number} rightId
 * @return        {*}
 */
const delRoleRight = (roleId, rightId) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: "delete"
  });
};

export default {
  roleList,
  addRole,
  selectRole,
  updateRole,
  delRole,
  addRoleRight,
  delRoleRight
};
