<script setup>
import { onMounted, ref } from "vue";
import roleApi from "../../api/role";
import rightApi from "../../api/right";
import { validateRoleName, validateRoleDesc } from "../../utils/validator";

const roleList = ref([]);
const roleInfo = ref({
  roleName: "",
  roleDesc: ""
});
const roleFormRef = ref(null);
const dialogFormVisible = ref(false);
const drawer = ref(false);
const rightList = ref([]);
const tree = ref();
const roleId = ref(0);
const editFlag = ref(false);
const keys = ref([]);

const init = () => {
  roleInfo.value.roleName = "";
  roleInfo.value.roleDesc = "";
};

//# 获取角色列表
const getRoleList = () => {
  roleApi.roleList().then((res) => {
    roleList.value = res.data.data;
    console.log(roleList.value, "角色列表");
  });
};
onMounted(() => {
  getRoleList();
});

const rules = ref({
  roleName: [{ validator: validateRoleName, trigger: "blur" }],
  roleDesc: [{ validator: validateRoleDesc, trigger: "blur" }]
});
//# 添加角色
const addRole = () => {
  roleFormRef.value.validate((valid) => {
    if (valid) {
      roleApi.addRole(roleInfo.value).then((res) => {
        // console.log(res, "addRole");
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
//# 删除角色
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

//# 获取权限列表
const getRight = () => {
  rightApi.rightList("tree").then((res) => {
    console.log(res, "getRight");
    rightList.value = res.data.data;
    // console.log(rightList.value);
  });
};
getRight();
//# 添加角色权限
const addRoleRight = () => {
  // console.log(tree.value.getCheckedKeys(), "全选");
  // console.log(tree.value.getHalfCheckedKeys(), "半选");
  console.log(roleId.value);
  let rids = [
    ...tree.value.getCheckedKeys(),
    ...tree.value.getHalfCheckedKeys()
  ].toString();
  // console.log(rids, "权限");
  roleApi.addRoleRight(roleId.value, rids).then((res) => {
    getRoleList();
    drawer.value = false;
  });
};

//# 删除角色权限
const delRoleRight = (id, rid) => {
  console.log(id, rid);
  roleApi.delRoleRight(id, rid).then((res) => {
    getRoleList();
  });
};

//# 编辑角色
const editRole = (row) => {
  dialogFormVisible.value = true;
  editFlag.value = true;
  roleInfo.value.roleName = row.roleName;
  roleInfo.value.roleDesc = row.roleDesc;
  roleId.value = row.id;
};

//# 更新角色信息
const updateRole = () => {
  roleApi.updateRole(roleId.value, roleInfo.value).then((res) => {
    getRoleList();
    dialogFormVisible.value = false;
  });
};

//# 设置角色权限
const setRole = (row) => {
  drawer.value = true;
  roleId.value = row.id;
  let arr = childrenDeep(row.children);
  keys.value = arr;
  // console.log(keys.value, "选中权限数组");
};

//# 递归获取权限id
const childrenDeep = (children) => {
  if (!children) {
    return [];
  }
  let arr = [];
  children.forEach((item) => {
    if (!item.children) {
      arr.push(item.id);
    } else {
      arr = [...arr, ...childrenDeep(item.children)];
    }
  });
  return arr;
};
</script>
<template>
  <div class="role">
    <el-button
      type="primary"
      style="margin-bottom: 10px"
      @click="
        dialogFormVisible = true;
        init();
      "
      >添加角色</el-button
    >
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="role_box">
            <div
              v-for="(level1, index) in row.children"
              :key="level1.id"
              class="level1"
              :class="index === 0 ? 'borderTop' : ''">
              <div class="left">
                <el-tag closable @close="delRoleRight(row.id, level1.id)">{{
                  level1.authName
                }}</el-tag>
              </div>
              <div class="right">
                <div
                  class="level2"
                  v-for="(level2, index) in level1.children"
                  :key="level2.id"
                  :class="index === 0 ? 'noBorder' : ''">
                  <div class="left">
                    <el-tag
                      type="success"
                      closable
                      @close="delRoleRight(row.id, level2.id)"
                      >{{ level2.authName }}</el-tag
                    >
                  </div>
                  <div class="right">
                    <div
                      class="level3"
                      v-for="(level3, index) in level2.children"
                      :key="index">
                      <el-tag
                        type="warning"
                        closable
                        @close="delRoleRight(row.id, level3.id)"
                        >{{ level3.authName }}</el-tag
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          <el-button type="primary" icon="Edit" size="small" @click="editRole(row)"
            >编辑</el-button
          >
          <el-button type="danger" icon="Delete" size="small" @click="delRole(row)">
            删除
          </el-button>
          <el-button type="warning" icon="Setting" size="small" @click="setRole(row)">
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-drawer v-model="drawer" title="分配权限">
    <el-tree
      ref="tree"
      :key="roleId"
      :default-checked-keys="keys"
      :default-expanded-keys="keys"
      :props="{ label: 'authName' }"
      :data="rightList"
      show-checkbox
      node-key="id" />
    <el-button @click="addRoleRight()">提交</el-button>
  </el-drawer>

  <el-dialog
    v-model="dialogFormVisible"
    :title="editFlag ? '编辑角色' : '添加角色'"
    width="500"
    @close="editFlag = false">
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
        <el-button type="primary" @click="editFlag ? updateRole() : addRole()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.role {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  .role_box {
    padding: 10px;
    padding-left: 50px;
    padding-right: 50px;
    > .level1 {
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      > .left {
        margin-right: 150px;
      }
      > .right {
        > .level2 {
          border-top: 1px solid #ccc;
          display: flex;
          align-items: center;
          > .left {
            margin-right: 150px;
          }
          > .right {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .level3 {
              margin: 10px;
            }
          }
        }
        .noBorder {
          border-top: 0px;
        }
      }
    }
  }
}

.borderTop {
  border-top: 1px solid #ccc;
}
</style>
