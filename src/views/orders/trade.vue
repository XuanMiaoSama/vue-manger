<script setup>
import { onMounted, ref } from "vue";
import orderApi from "../../api/order";

const getTradeList = () => {
  let res = orderApi.orderTrade();
  console.log(res);
};

onMounted(() => {
  getTradeList();
});
</script>
<template>
  <div>订单查询</div>
</template>

<style lang="scss" scoped></style>
