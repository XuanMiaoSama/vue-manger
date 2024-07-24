<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import userApi from "../../api/user.js";
import { useStore } from "vuex";
import {
  validateUser,
  validatePass,
  validateEmail,
  validateTel,
} from "../../utils/validator.js";
import JsonToExcel from "../../utils/saveExcel.js";
import roleApi from "../../api/role.js";

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
  mobile: "",
});
const editUserFlag = ref(false);
const userId = ref(0);
const userRoleDialog = ref(false);
const roleList = ref([]);
const userInfo = ref({
  userName: "",
  roleName: "",
  roleId: "",
});

// # 验证表单
const rules = ref({
  username: [{ validator: validateUser, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  mobile: [{ validator: validateTel, trigger: "blur" }],
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
  query: "",
});

// # 监听page的变化
watch(
  [page],
  () => {
    getUserList();
  },
  {
    deep: true,
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
        duration: 1000,
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
    type: "warning",
  }).then(() => {
    userApi.delUser(row.id).then(() => {
      getUserList();
    });
  });
};

//# 导出表格
const SaveExcel = () => {
  let data = [
    {
      sheetData: userList.value.map((item) => {
        item.state = item.mg_state ? "启用" : "禁用";
        return item;
      }), //JSON数据
      sheetName: "个人信息表", //excle表默认标签
      sheetFilter: ["id", "username", "email", "mobile", "role_name", "state"], //过滤字段
      sheetHeader: ["ID", "用户名", "邮箱", "手机", "角色", "状态"], //标题头
    },
  ];
  JsonToExcel("用户信息表", data);
};

//# 获取角色列表
const getRoleList = (row) => {
  userId.value = row.id;
  userInfo.value.userName = row.username;
  userInfo.value.roleName = row.role_name;
  userInfo.value.roleId = "";
  roleApi.roleList().then((res) => {
    roleList.value = res.data.data;
  });
  userRoleDialog.value = true;
};

//# 添加角色
const addUserRole = () => {
  userApi.addUserRole(userId.value, userInfo.value.roleId).then((res) => {
    console.log(res);
    getUserList();
  });
  userRoleDialog.value = false;
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
      <el-button type="success" @click="SaveExcel()">导出表格</el-button>
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
          <el-button
            type="warning"
            icon="Setting"
            circle
            size="small"
            @click="getRoleList(row)" />
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

    <el-dialog v-model="userRoleDialog" title="Tips" width="500" :key="userId">
      <el-form :model="userInfo">
        <el-form-item label="当前用户">
          <el-input v-model="userInfo.userName" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="当前角色">
          <el-input v-model="userInfo.roleName" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="分配角色">
          <el-select v-model="userInfo.roleId" placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="userRoleDialog = false">取消</el-button>
          <el-button type="primary" @click="addUserRole()"> 确认 </el-button>
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
    width: 500px;
    display: flex;
  }
}
</style>
