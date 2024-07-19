import request from "../utils/request";

const rightList = type => {
  return request({
    url: `rights/${type}`
  });
};

export default {
  rightList
};
