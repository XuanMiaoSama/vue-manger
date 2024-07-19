import { loginApi } from "../../api";
import router from "../../router";

const state = {
  user: {}
};

const getters = {};

const mutations = {
  set_user: (state, payload) => {
    state.user = payload;
  }
};

const actions = {
  login_ac: (context, payload) => {
    return loginApi(payload).then(res => {
      // console.log(res.data.data);
      if (res.data.meta.status === 200) {
        ElMessage({
          message: res.data.meta.msg + ",3秒后跳转回原页面",
          showClose: true,
          duration: 3000,
          type: "success",
          onClose: () => {
            context.commit("set_user", res.data.data);
            router.push("/");
          }
        });
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
