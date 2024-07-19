/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-18 21:14
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-19 15:41
 * @FilePath     : \vue3_studye:\QD2401\04\vue-manger\src\store\index.js
 * @Description  :
 */
import { createStore } from "vuex";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

const getters = {
  token(state) {
    return state.user.userInfo.token || "";
  }
};

const store = createStore({
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: "vue-manger",
      reducer: state => {
        return {
          user: state.user
        };
      }
    })
  ],
  modules: {
    user
  }
});

export default store;
