import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/layout.vue";
import UserList from "../views/users/userList.vue";
import RightList from "../views/rights/rightList.vue";
import Login from "../views/login.vue";
import NoFound from "../views/404.vue";

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/userList",
    meta: {
      title: "用户管理"
    },
    children: [
      {
        path: "/userList",
        name: "userList",
        component: UserList,
        meta: {
          title: "用户列表"
        }
      }
    ]
  },
  {
    path: "/rights",
    component: Layout,
    redirect: "/rights/rightList",
    meta: {
      title: "权限管理"
    },
    children: [
      {
        path: "/rights/rightList",
        name: "rightList",
        component: RightList,
        meta: {
          title: "权限列表"
        }
      },
      {
        path: "/rights/roleList",
        name: "roleList",
        component: () => import("../views/rights/roleList.vue"),
        meta: {
          title: "角色列表"
        }
      }
    ]
  },
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/goodsList",
    meta: {
      title: "商品管理"
    },
    children: [
      {
        path: "/goods/goodsList",
        name: "goodsList",
        component: () => import("../views/goods/goodsList.vue"),
        meta: {
          title: "商品列表"
        }
      },
      {
        path: "/goods/tapVar",
        name: "tapVar",
        component: () => import("../views/goods/tapVar.vue"),
        meta: {
          title: "分类参数"
        }
      },
      {
        path: "/goods/goodsTap",
        name: "goodsTap",
        component: () => import("../views/goods/goodsTap.vue"),
        meta: {
          title: "商品分类"
        }
      }
    ]
  },
  {
    path: "/orders",
    component: Layout,
    redirect: "/orders/orderList",
    meta: {
      title: "订单管理"
    },
    children: [
      {
        path: "/orders/orderList",
        name: "orderList",
        component: () => import("../views/orders/orderList.vue"),
        meta: {
          title: "订单列表"
        }
      }
    ]
  },
  {
    path: "/datas",
    component: Layout,
    redirect: "/datas/data",
    meta: {
      title: "数据管理"
    },
    children: [
      {
        path: "/datas/data",
        name: "data",
        component: () => import("../views/datas/data.vue"),
        meta: {
          title: "数据列表"
        }
      }
    ]
  }
];

export const staticRoutes = [
  {
    path: "/login",
    component: Login,
    meta: {
      title: "请登录"
    }
  },
  {
    path: "/:pathMatch",
    component: NoFound,
    meta: {
      title: "未找到页面"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...asyncRoutes, ...staticRoutes]
});

// app.use(router);
export default router;
