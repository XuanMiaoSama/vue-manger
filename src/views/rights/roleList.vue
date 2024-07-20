<script setup>
import { onMounted, ref } from "vue";
import roleApi from "../../api/role";
import { validateRoleName, validateRoleDesc } from "../../utils/validator";

const roleList = ref([]);
const roleInfo = ref({
  roleName: "",
  roleDesc: ""
});
const roleFormRef = ref(null);
const dialogFormVisible = ref(false);

// # 获取角色列表
const getRoleList = () => {
  roleApi.roleList().then((res) => {
    roleList.value = res.data.data;
    // console.log(roleList.value)
  });
};
onMounted(() => {
  getRoleList();
});

const rules = ref({
  roleName: [{ validator: validateRoleName, trigger: "blur" }],
  roleDesc: [{ validator: validateRoleDesc, trigger: "blur" }]
});

const addRole = () => {
  roleFormRef.value.validate((valid) => {
    if (valid) {
      roleApi.addRole(roleInfo.value).then((res) => {
        console.log(res, "addRole");
        getRoleList();
      });
    } else {
      ElMessage({
        message: "角色信息格式不正确",
        type: "error",
        duration: 1000
      });
    }
  });
};

const delRole = (row) => {
  ElMessageBox.confirm("你确定要删除当前角色吗", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    roleApi.delRole(row.id).then(() => {
      // console.log(res, "delRole");
      getRoleList();
    });
  });
};
</script>
<template>
  <div class="role">
    <el-button
      type="primary"
      style="margin-bottom: 10px"
      @click="dialogFormVisible = true"
      >添加角色</el-button
    >
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">State: {{ props.row.state }}</p>
            <p m="t-0 b-2">City: {{ props.row.city }}</p>
            <p m="t-0 b-2">Address: {{ props.row.address }}</p>
            <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
            <h3>Family</h3>
            <el-table :data="props.row.family">
              <el-table-column label="Name" prop="name" />
              <el-table-column label="State" prop="state" />
              <el-table-column label="City" prop="city" />
              <el-table-column label="Address" prop="address" />
              <el-table-column label="Zip" prop="zip" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="#" width="50">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName" />
      <el-table-column label="角色描述" prop="roleDesc" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" icon="Edit" size="small">编辑</el-button>
          <el-button type="danger" icon="Delete" size="small" @click="delRole(row)"
            >删除</el-button
          >
          <el-button type="warning" icon="Setting" size="small">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加角色" width="500">
    <el-form :model="roleInfo" ref="roleFormRef" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleInfo.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="roleInfo.roleDesc" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addRole()"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.role {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
}
</style>
