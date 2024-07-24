<script setup>
import { ref } from "vue";

const data = ref([
  {
    name: "name",
    label: "账户",
    placeholder: "请输入账户",
    type: "input",
    inputType: "text",
  },
  {
    name: "password",
    label: "密码",
    placeholder: "请输入账户",
    type: "input",
    inputType: "password",
  },
  {
    name: "age",
    label: "年龄",
    placeholder: "请输入账户",
    type: "input",
    inputType: "",
  },
  {
    name: "sex",
    label: "性别",
    type: "radio",
    radio: [
      {
        label: "男",
        value: "男",
      },
      {
        label: "女",
        value: "女",
      },
    ],
  },
  {
    name: "class",
    label: "班级",
    type: "select",
    option: [
      {
        label: "1班",
        value: "1班",
      },
      {
        label: "2班",
        value: "2班",
      },
    ],
  },
  {
    name: "isFinished",
    label: "是否毕业",
    type: "switch",
    value: true,
  },
]);
</script>
<template>
  <div class="cat">
    商品分类
    <MyForm :data="data"></MyForm>
  </div>
</template>

<style lang="scss" scoped>
.cat {
  padding: 20px;
  background: #fff;
}
</style>
