<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import userApi from "../../api/user";
import { useStore } from "vuex";
import {
  validateUser,
  validatePass,
  validateEmail,
  validateTel
} from "../../utils/validator";

const inputValue = ref("");
const userFormRef = ref(null);
const store = useStore();
const userList = ref([]);
const total = ref(0);
const dialogFormVisible = ref(false);
const userForm = ref({
  username: "",
  password: "",
  email: "",
  mobile: ""
});
const editUserFlag = ref(false);
const userId = ref(0);

// # 验证表单
const rules = ref({
  username: [{ validator: validateUser, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  mobile: [{ validator: validateTel, trigger: "blur" }]
});

const init = () => {
  userForm.value.username = "";
  userForm.value.password = "";
  userForm.value.email = "";
  userForm.value.mobile = "";
};

const search = () => {
  page.query = inputValue.value;
};

const page = reactive({
  pagenum: 1,
  pagesize: 5,
  query: ""
});

// # 监听page的变化
watch(
  [page],
  () => {
    getUserList();
  },
  {
    deep: true
  }
);

// # 获取用户列表
const getUserList = () => {
  userApi.userList(page).then((res) => {
    console.log(res.data.data);
    total.value = res.data.data.total;
    userList.value = res.data.data.users;
  });
};
onMounted(() => {
  getUserList();
});

// # 修改用户状态
const updateState = (row) => {
  userApi.updateState(row);
};

// # 添加用户
const addUser = () => {
  console.log("false", "add");
  userFormRef.value.validate((valid) => {
    if (valid) {
      userApi.addUser(userForm.value).then(() => {
        // console.log(res)
        getUserList();
        dialogFormVisible.value = false;
      });
    } else {
      ElMessage({
        message: "用户信息格式不正确",
        type: "error",
        duration: 1000
      });
    }
  });
};

// # 将要编辑的用户信息显示在表单中
const showUser = (row) => {
  editUserFlag.value = true;
  userId.value = row.id;
  userForm.value.username = row.username;
  userForm.value.password = row.password;
  userForm.value.email = row.email;
  userForm.value.mobile = row.mobile;
  dialogFormVisible.value = true;
};

// # 编辑用户
const updateUser = () => {
  // console.log(editUserFlag.value, "edit");
  userApi.updateUser(userForm.value, userId.value).then(() => {
    getUserList();
    dialogFormVisible.value = false;
  });
};

// # 删除用户
const delUser = (row) => {
  ElMessageBox.confirm("你确定要删除当前用户吗", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    userApi.delUser(row.id).then(() => {
      getUserList();
    });
  });
};
</script>
<template>
  <div class="user">
    <div class="input">
      <el-input
        v-model="inputValue"
        style="max-width: 600px; margin-right: 20px"
        placeholder="请输入内容"
        class="input-with-select">
        <template #append>
          <el-button icon="Search" @click="search()" />
        </template>
      </el-input>
      <el-button
        type="primary"
        @click="
          dialogFormVisible = true;
          init();
        "
        >添加用户</el-button
      >
    </div>

    <el-table :data="userList" border style="width: 100%" class="table" stripe>
      <el-table-column label="#" width="50">
        <template #default="{ $index }">
          {{ (page.pagenum - 1) * page.pagesize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="160" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="role_name" label="角色" width="150" />
      <el-table-column label="状态" width="130">
        <template #default="{ row }">
          <el-switch v-model="row.mg_state" size="small" @change="updateState(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="Edit"
            circle
            size="small"
            @click="showUser(row)" />
          <el-button
            type="danger"
            icon="Delete"
            circle
            size="small"
            @click="delUser(row)" />
          <el-button type="warning" icon="Setting" circle size="small" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      v-model:page-size="page.pagesize"
      layout="prev, pager, next"
      v-model:total="total"
      v-model:current-page="page.pagenum" />

    <el-dialog
      v-model="dialogFormVisible"
      :title="editUserFlag ? '编辑信息' : '添加用户'"
      width="500"
      @closed="editUserFlag = false">
      <el-form :model="userForm" ref="userFormRef" :rules="rules">
        <el-form-item label="账户" prop="username">
          <el-input
            v-model="userForm.username"
            autocomplete="off"
            :disabled="editUserFlag" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
            :disabled="editUserFlag" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="userForm.mobile" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editUserFlag ? updateUser() : addUser()">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.user {
  position: relative;
  background-color: #ffffff;
  width: 100%;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  .table {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .input {
    width: 300px;
    display: flex;
  }
}
</style>
