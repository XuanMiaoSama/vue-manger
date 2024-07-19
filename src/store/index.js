import { createStore } from "vuex";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

// 数据源，使用方法store.state.porp
const state = {};

// 计算属性，使用方法store.getters.prop
const getters = {};

// 方法，使用方法store.commit("funcName",params)
const mutations = {};

// 异步上下文，使用方法store.disaptch("funcName",params)
const actions = {};

const store = createStore({
  state,
  getters,
  mutations,
  actions,
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
