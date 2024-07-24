<script setup>
import { ref } from "vue";
const props = defineProps({
  data: Array,
});

let obj = {};
props.data.forEach((item) => {
  obj[item.name] = item.value;
});

const formValue = ref(obj);
</script>
<template>
  <div>
    <el-form :model="data">
      <el-form-item :label="item.label" v-for="(item, i) in data" :key="i">
        <el-input
          v-model="formValue[item.name]"
          :placeholder="item.placeholder"
          v-if="item.type === 'input'"
          :type="item.inputType"></el-input>

        <el-radio-group v-model="formValue[item.name]" v-if="item.type === 'radio'">
          <el-radio :value="it.value" v-for="(it, i) in item.radio" :key="i">
            {{ it.label }}
          </el-radio>
        </el-radio-group>

        <el-select
          v-model="formValue[item.name]"
          placeholder="Select"
          style="width: 240px"
          v-if="item.type === 'select'">
          <el-option
            v-for="item in item.option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled" />
        </el-select>

        <el-switch v-model="formValue[item.name]" v-if="item.type === 'switch'" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
