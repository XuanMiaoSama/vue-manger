<script setup>
import { ref } from "vue";
import { asyncRoutes } from "../router/index.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
// console.log(route);

const logout = () => {
  store.dispatch("user/LOGOUT_AC");
};
</script>
<template>
  <div class="layout">
    <div class="top">
      <div class="logo">
        <img
          src="https://www.runoob.com/wp-content/uploads/2017/01/vue.png"
          alt="" />电商后台管理系统
      </div>
      <el-button @click="logout()" style="margin-right: 20px" type="info">退出</el-button>
    </div>
    <div class="section">
      <div class="aside">
        <el-menu
          style="width: 100%"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="route.path"
          text-color="#fff"
          router>
          <el-menu-item index="/">
            <el-icon><component is="House" /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu
            :index="router.path"
            v-for="router in asyncRoutes"
            :key="router.path">
            <template #title>
              <el-icon>
                <component :is="router.icon" />
              </el-icon>
              <span>{{ router.meta.title }}</span>
            </template>
            <el-menu-item
              :index="item.path"
              v-for="item in router.children"
              :key="item.path">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="main">
        <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-show="item.meta.title != '首页'"
            v-for="item in route.matched"
            :key="item.path"
            :to="{ path: item.path }">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  .top {
    height: 40px;
    background-color: #373f41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      margin-left: 20px;
      color: #fff;
      font-size: 18px;
      img {
        width: 30px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }

  .section {
    min-height: 530px;
    display: flex;

    .aside {
      width: 15%;
      overflow: hidden;

      .el-menu-vertical-demo {
        background: #545c64;
        height: 100%;
      }
    }

    .main {
      width: 85%;
      background: #eaedf1;
      padding: 20px;
      font-size: 14px;
      overflow: auto;
      // padding-bottom: 40px;
      box-sizing: border-box;
      .breadcrumb {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
