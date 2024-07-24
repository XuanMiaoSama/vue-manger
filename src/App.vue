<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

// store.dispatch('router/SET_ROUTER_AC');
</script>
<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
