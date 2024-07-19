import request from "../utils/request";

const roleList = () => {
  return request({
    url: "roles"
  });
};

const addRole = data => {
  return request({
    url: "roles",
    method: "post",
    data
  });
};

const delRole = id => {
  return request({
    url: `roles/${id}`,
    method: "delete"
  });
};

export default {
  roleList,
  addRole,
  delRole
};
