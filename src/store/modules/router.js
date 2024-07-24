/*
 * @Author       : kaioufoxms@foxmail.com
 * @Date         : 2024-07-24
 * @LastEditors  : kaioufoxms@foxmail.com
 * @LastEditTime : 2024-07-24
 * @FilePath     : \vue-manger\src\store\modules\router.js
 * @Description  :
 */

import rightApi from "../../api/right";
const modules = import.meta.glob("../../views/**/*.vue");
import Layout from "../../layout/layout.vue";
import router from "../../router";

const icons = ["UserFilled", "Stamp", "GoodsFilled", "List", "TrendCharts"];

const state = {
  asyncRoutes: [],
  routerFlag: false,
};

const mutations = {
  SET_ROUTER(state, payload) {
    state.asyncRoutes = payload;
  },
};

const actions = {
  SET_ROUTER_AC({ commit }, obj) {
    rightApi.menuRight().then((res) => {
      // console.log(res, "动态路由");
      let asyncRoutes = res.data.data.map((item, index) => {
        let routeInfo = {
          path: "/" + item.path,
          component: Layout,
          redirect: `/${item.path}/${item.children[0].path}`,
          icon: icons[index],
          meta: {
            title: item.authName,
          },
          children: item.children.map((childrenItem) => {
            let childrenRouteInfo = {
              path: `/${item.path}/${childrenItem.path}`,
              name: childrenItem.path,
              component: modules[`../../views/${item.path}/${childrenItem.path}.vue`],
              icon: "Menu",
              meta: {
                title: childrenItem.authName,
              },
            };
            return childrenRouteInfo;
          }),
        };
        return routeInfo;
      });
      commit("SET_ROUTER", asyncRoutes);
      asyncRoutes.forEach((item) => {
        router.addRoute(item);
      });
      // obj.next({ ...obj.to, replace: true });
      obj.next({ path: obj.to.path });
      console.log(router.getRoutes(), "请求完获取路由信息");
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
