<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import dataApi from "../../api/data";

const dataEcharts = (option) => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.querySelector(".echar"));
  // 绘制图表
  myChart.setOption(option);
};

onMounted(() => {
  dataApi.getData().then((res) => {
    console.log(res.data.data);
    dataEcharts(res.data.data);
  });
});
</script>
<template>
  <div class="data">
    <div class="echar"></div>
  </div>
</template>

<style lang="scss" scoped>
.echar {
  border: 1px solid #ccc;
  width: 500px;
  height: 300px;
}
</style>
