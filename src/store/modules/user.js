/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-19
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-24
 * @FilePath     : \vue-manger\src\store\modules\user.js
 * @Description  :
 */
import { loginApi } from "../../api";
import router from "../../router";

const state = {
  userInfo: {},
};

const mutations = {
  SET_USER: (state, payload) => {
    state.userInfo = payload;
  },
};

const actions = {
  LOGIN_AC: (context, payload) => {
    return loginApi(payload).then((res) => {
      // console.log(res.data.data);
      if (res.data.meta.status === 200) {
        ElMessage({
          message: res.data.meta.msg + ",3秒后跳转回原页面",
          showClose: true,
          duration: 3000,
          type: "success",
          onClose: () => {
            context.commit("SET_USER", res.data.data);
            const path = location.search.slice(6) || "/";
            router.push(path);
          },
        });
      }
    });
  },
  LOGOUT_AC: (context) => {
    context.commit("SET_USER", {});
    // context.commit("router/SET_ROUTER", [], { root: true });
    const timer = setTimeout(() => {
      router.push("/login");
      clearTimeout(timer);
    }, 1500);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
