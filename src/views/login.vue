<script setup>
import { ref, watch } from "vue";
import { validateUser, validatePass } from "../utils/validator";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();

const store = useStore();

const loginFormRef = ref(null);

const resetForm = () => {
  if (!loginFormRef.value) return;
  loginFormRef.value.resetFields();
};

const submitForm = () => {
  // console.log(loginFormRef, "loginFormRef")
  loginFormRef.value.validate((valid) => {
    // console.log(valid, "valid")
    if (valid) {
      store.dispatch("user/LOGIN_AC", loginForm.value);
    } else {
      ElMessage({
        message: "账户密码格式不正确",
        type: "error",
        duration: 1000
      });
    }
  });
};

const loginForm = ref({
  username: "",
  password: ""
});

const rules = ref({
  username: [{ validator: validateUser, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }]
});
</script>
<template>
  <div class="login">
    <el-form
      ref="loginFormRef"
      style="max-width: 600px"
      :model="loginForm"
      status-icon
      :rules="rules"
      class="loginForm">
      <el-form-item label="账户" prop="username" class="loginFormItem">
        <el-input v-model="loginForm.username" autocomplete="off" class="input" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          class="input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 登录 </el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
  overflow: hidden;

  .loginForm {
    width: 400px;
    height: 300px;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 5px;

    .input {
      width: 250px;
    }
  }
}
</style>
