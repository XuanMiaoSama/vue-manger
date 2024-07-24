import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";
import rightApi from "../api/right";
import store from "../store";
import Layout from "../layout/layout.vue";
import UserList from "../views/users/users.vue";
import RightList from "../views/rights/rights.vue";
import Login from "../views/login.vue";
import NoFound from "../views/404.vue";
import Index from "../views/index.vue";
const modules = import.meta.glob("../views/**/*.vue");
const icons = ["UserFilled", "Stamp", "GoodsFilled", "List", "TrendCharts"];

// export const asyncRoutes = [
//   {
//     path: "/user",
//     component: Layout,
//     redirect: "/user/userList",
//     icon: "UserFilled",
//     meta: {
//       title: "用户管理",
//     },
//     children: [
//       {
//         path: "/user/userList",
//         name: "userList",
//         component: UserList,
//         icon: "Menu",
//         meta: {
//           title: "用户列表",
//         },
//       },
//     ],
//   },
//   {
//     path: "/rights",
//     component: Layout,
//     redirect: "/rights/rightList",
//     icon: "Stamp",
//     meta: {
//       title: "权限管理",
//     },
//     children: [
//       {
//         path: "/rights/rightList",
//         name: "rightList",
//         component: RightList,
//         icon: "Menu",
//         meta: {
//           title: "权限列表",
//         },
//       },
//       {
//         path: "/rights/roleList",
//         name: "roleList",
//         component: () => import("../views/rights/roles.vue"),
//         icon: "Menu",
//         meta: {
//           title: "角色列表",
//         },
//       },
//     ],
//   },
//   {
//     path: "/goods",
//     component: Layout,
//     redirect: "/goods/goodsList",
//     icon: "GoodsFilled",
//     meta: {
//       title: "商品管理",
//     },
//     children: [
//       {
//         path: "/goods/goodsList",
//         name: "goodsList",
//         component: () => import("../views/goods/goods.vue"),
//         icon: "Menu",
//         meta: {
//           title: "商品列表",
//         },
//       },
//       {
//         path: "/goods/tapVar",
//         name: "tapVar",
//         component: () => import("../views/goods/params.vue"),
//         icon: "Menu",
//         meta: {
//           title: "分类参数",
//         },
//       },
//       {
//         path: "/goods/goodsTap",
//         name: "goodsTap",
//         component: () => import("../views/goods/categories.vue"),
//         icon: "Menu",
//         meta: {
//           title: "商品分类",
//         },
//       },
//     ],
//   },
//   {
//     path: "/orders",
//     component: Layout,
//     redirect: "/orders/orderList",
//     icon: "List",
//     meta: {
//       title: "订单管理",
//     },
//     children: [
//       {
//         path: "/orders/orderList",
//         name: "orderList",
//         component: () => import("../views/orders/orders.vue"),
//         icon: "Menu",
//         meta: {
//           title: "订单列表",
//         },
//       },
//       {
//         path: "/orders/trade",
//         name: "trade",
//         component: () => import("../views/orders/trade.vue"),
//         icon: "Menu",
//         meta: {
//           title: "快递查询",
//         },
//       },
//     ],
//   },
//   {
//     path: "/datas",
//     component: Layout,
//     redirect: "/datas/data",
//     icon: "TrendCharts",
//     meta: {
//       title: "数据管理",
//     },
//     children: [
//       {
//         path: "/datas/data",
//         name: "data",
//         component: () => import("../views/datas/data.vue"),
//         icon: "Menu",
//         meta: {
//           title: "数据列表",
//         },
//       },
//     ],
//   },
// ];

export const staticRoutes = [
  {
    path: "/login",
    component: Login,
    meta: {
      title: "请登录",
      isNoLogin: true,
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/home",
        component: Index,
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/:pathMatch",
    component: NoFound,
    meta: {
      title: "未找到页面",
    },
  },
];

store.state.router.routerFlag = true;

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes],
});

router.beforeEach((to, from, next) => {
  console.log(to, from, "路由守卫");
  const token = store.getters.token;
  if (token || to.meta.isNoLogin) {
    document.title = to.meta.title;
    if (token && store.state.router.routerFlag) {
      store.dispatch("router/SET_ROUTER_AC", { next, to });
      console.log(store.state.router.asyncRoutes);
      store.state.router.routerFlag = false;
    } else {
      next();
    }
  } else {
    console.log("转到登录页面");
    next({ path: "/login", query: { path: to.path } });
    // next();
  }
});

// app.use(router);
export default router;
