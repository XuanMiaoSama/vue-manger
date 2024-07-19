import request from "../utils/request";

const userList = params => {
  return request({
    url: "users",
    method: "get",
    params: params || {
      pagenum: 1,
      pagesize: "5",
      query: ""
    }
  });
};

const addUser = data => {
  return request({
    url: "users",
    method: "post",
    data
  });
};

const changeState = data => {
  return request({
    url: `users/${data.id}/state/${data.mg_state}`,
    method: "put"
  });
};

const delUser = id => {
  return request({
    url: `users/${id}`,
    method: "delete"
  });
};

const editUser = (data, id) => {
  return request({
    url: `users/${id}`,
    method: "put",
    data
  });
};

export default {
  userList,
  addUser,
  changeState,
  delUser,
  editUser
};
